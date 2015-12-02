/**
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file x3d-extensions.js
 * X3D model and camera functions
 */

/**
* Modifies the current camera of the scene in such a way that
* all elements are visible to the user.
*
* @param X3D.runtime Instance of X3D runtime which becomes available
*    after a scene is fully loaded.
*/

var x3dExtensions = {}

x3dExtensions.interpInterval = undefined

function normalizeCamera(runtime) {
  // Get the scene element from X3D runtime.
  var scene = runtime.canvas.doc._viewarea._scene;

  // Get camera field of view.
  var fov = scene.getViewpoint().getFieldOfView();

  // Update the volume from latest vertex data.
  scene.updateVolume();

  // Record the minima and maxima of scene boundaries.
  var min = x3dom.fields.SFVec3f.copy(scene._lastMin);
  var max = x3dom.fields.SFVec3f.copy(scene._lastMax);

  // Calculate the necessary distance from field of view and boundaries.
  var dia     = max.subtract(min);
  var diaz2   = dia["z"] / 2.0;
  var tanfov2 = Math.tan(fov / 2.0);
  var dist1   = (dia["y"] / 2.0) / tanfov2 + diaz2;
  var dist2   = (dia["x"] / 2.0) / tanfov2 + diaz2;

  // Set the camera to span 66% of scene view of X and Y axes.
  dia = min.add(dia.multiply(0.5));
  // Adjust Z according to necessary distance.
  dia["z"] += (dist1 > dist2 ? dist1 : dist2) * 1.01;

  // Setup the translation matrix.
  var translationMatrix = x3dom.fields.SFMatrix4f.translation(dia.negate());

  // Setup the rotation matrix.
  var axis = new x3dom.fields.SFVec3f(0, 0, -1);
  var rotationMatrix = x3dom.fields.Quaternion.rotateFromTo(axis, axis).toMatrix();

  // Calculate and set view matrix.
  var viewMatrix = rotationMatrix.mult(translationMatrix);
  runtime.canvas.doc._viewarea._scene.getViewpoint().setView(viewMatrix);
}

/**
 * Returns the view matrix components from 
 * the IWC parameters 
 * @param X3DRuntime runtime information for retrieving
 *  the current local state of view matrix.
 * @return position translationMatrix
 * @return rotation rotationMatrix
 */
x3dExtensions.getView = function (runtime) {
  var targetPos;
  var targetRot;

  var posMat = runtime.canvas.doc._viewarea._transMat;
  var rotMat = runtime.canvas.doc._viewarea._rotMat;

  var translation = new x3dom.fields.SFVec3f(0,0,0);
  var rotation    = new x3dom.fields.Quaternion(0,0,1,0);
  var scale       = new x3dom.fields.SFVec3f(1,1,1);
  var scaleOrient = new x3dom.fields.Quaternion(0,0,1,0);

  posMat.getTransform(translation, rotation, scale, scaleOrient);
  targetPos = x3dom.fields.SFVec3f.copy(translation);

  rotMat.getTransform(translation, rotation, scale, scaleOrient);
  targetRot = x3dom.fields.Quaternion.copy(rotation);

  return {'position': targetPos, 'rotation': targetRot};
}

/*
 * Sets up the view matrix from the data provided
 * by a remote client.
 * @param X3DRuntime Runtime element to modify the local view matrix.
 * @param data Remote data
 * @param finishedCallback Callback triggered when modification
 * is complete
 */
x3dExtensions.setView = function (runtime, data, duration, finishedCallback) {
	
  var targetPos = data['position'];
  var targetRot = data['rotation'];

  // Interpolate from the last to recently received.
  var curTrans = x3dExtensions.getView(runtime);
  var curPos = curTrans['position'];
  var curRot = curTrans['rotation'];

  var currentTime = 0.0;
  // andere Interpolation noch im Gange
  if (x3dExtensions.interpInterval != 'undefined') {
    x3dExtensions.interpInterval = clearInterval(x3dExtensions.interpInterval);
  }
  x3dExtensions.interpInterval = setInterval(function() {
  	 var percentage;
  	 if (duration == 0) { percentage = 1.0 }
  	 else 				  { percentage = currentTime/duration }

    var posVal = lerpVector(curPos, targetPos, percentage);
    var rotVal = slerpQuaternion(curRot, targetRot, percentage);

    var posMat = new x3dom.fields.SFMatrix4f();
    var rotMat = new x3dom.fields.SFMatrix4f();

    posMat.setTranslate(posVal);
    rotMat.setRotate(rotVal);
    runtime.canvas.doc._viewarea._transMat.setValues(posMat);
    runtime.canvas.doc._viewarea._rotMat.setValues(rotMat);
/*
    runtime.canvas.doc._viewarea._needNavigationMatrixUpdate = true;
    runtime.canvas.doc.needRender = true;
*/
    currentTime += 0.02;

    if(currentTime >= duration) {
      x3dExtensions.interpInterval = clearInterval(x3dExtensions.interpInterval);
      finishedCallback();
    }
  }, 20);

  //var posMat = new x3dom.fields.SFMatrix4f();
  //var rotMat = new x3dom.fields.SFMatrix4f();

  //posMat.setTranslate(targetPos);
  //rotMat.setRotate(targetRot);

  //runtime.canvas.doc._viewarea._transMat.setValues(posMat);
  //runtime.canvas.doc._viewarea._rotMat.setValues(rotMat);
  //runtime.canvas.doc._viewarea._needNavigationMatrixUpdate = true;
  //runtime.canvas.doc.needRender = true;
}

/**
 * Linear interpolates between two scalars, with
 * time ranging between 0 and 1.
 * @param source initial value
 * @param target final value
 * @param time time interval within [0,1], 
 *  closer to zero means closer to source and
 *  vice versa.
 * @return interpolated value between
 *  initial and final value.
 */
function lerp(source, target, percentage) {
  return source * (1.0-percentage) + target * percentage;
}
/**
 * Linear interpolates a x3dom.fields.SFVec3f.

 * @param source initial vector
 * @param target final vector
 * @param time time interval within [0,1], 
 *  closer to zero means closer to source and
 *  vice versa.
 * @return interpolated vector between
 *  initial and final vector.
 */
function lerpVector(source, target, percentage) {
  return new x3dom.fields.SFVec3f(
    lerp(source.x, target.x, percentage),
    lerp(source.y, target.y, percentage),
    lerp(source.z, target.z, percentage));
}
/**
 * Linear interpolates a x3dom.fields.Quaternion.
 
 * @param source initial quaternion
 * @param target final quaternion
 * @param time time interval within [0,1], 
 *  closer to zero means closer to source and
 *  vice versa.
 * @return interpolated quaternion between
 *  initial and final quaternion.
 */
function lerpQuaternion(source, target, time) {
  return new x3dom.fields.Quaternion(
    lerp(source.x, target.x, time),
    lerp(source.y, target.y, time),
    lerp(source.z, target.z, time),
    lerp(source.w, target.w, time));
}
/**
 * Spherically interpolates a x3dom.fields.Quaternion.
 * See http://en.wikipedia.org/wiki/Slerp for details
 * on implementation.
 *
 * @param qa initial quaternion
 * @param qb final quaternion
 * @param t time interval within [0,1], 
 *  closer to zero means closer to source and
 *  vice versa.
 * @return spherically interpolated quaternion between
 *  initial and final quaternion.
 */
function slerpQuaternion(qa, qb, t) {
  var qm = new x3dom.fields.Quaternion();

  var cosHalfTheta = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;

  if (Math.abs(cosHalfTheta) >= 1.0){
    qm.w = qa.w;
    qm.x = qa.x;
    qm.y = qa.y;
    qm.z = qa.z;
    return qm;
  }

  var halfTheta    = Math.acos(cosHalfTheta);
  var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

  if (Math.abs(sinHalfTheta) < 0.001){
    qm.w = (qa.w * 0.5 + qb.w * 0.5);
    qm.x = (qa.x * 0.5 + qb.x * 0.5);
    qm.y = (qa.y * 0.5 + qb.y * 0.5);
    qm.z = (qa.z * 0.5 + qb.z * 0.5);
    return qm;
  }

  var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
  var ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

  qm.w = (qa.w * ratioA + qb.w * ratioB);
  qm.x = (qa.x * ratioA + qb.x * ratioB);
  qm.y = (qa.y * ratioA + qb.y * ratioB);
  qm.z = (qa.z * ratioA + qb.z * ratioB);
  return qm;
}
