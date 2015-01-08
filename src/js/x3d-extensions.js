/**
* Modifies the current camera of the scene in such a way that
* all elements are visible to the user.
*
* @param {X3D.runtime} Instance of X3D runtime which becomes available
*    after a scene is fully loaded.
*/
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

function getView(runtime) {
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

function setView(runtime, data) {
  targetPos = data['position'];
  targetRot = data['rotation'];

  // Interpolate from the last to recently received.
  curTrans = getView(runtime);
  curPos = curTrans['position'];
  curRot = curTrans['rotation'];

  currentTime = 0.0;
  if(typeof interpInterval != 'undefined') {
    clearInterval(interpInterval);
  }
  interpInterval = setInterval(function() {
    var posVal = lerpVector(curPos, targetPos, currentTime);
    var rotVal = lerpQuaternion(curRot, targetRot, currentTime);

    var posMat = new x3dom.fields.SFMatrix4f();
    var rotMat = new x3dom.fields.SFMatrix4f();

    posMat.setTranslate(posVal);
    rotMat.setRotate(rotVal);

    runtime.canvas.doc._viewarea._transMat.setValues(posMat);
    runtime.canvas.doc._viewarea._rotMat.setValues(rotMat);
    runtime.canvas.doc._viewarea._needNavigationMatrixUpdate = true;
    runtime.canvas.doc.needRender = true;

    currentTime += 0.01;

    if(currentTime >= 1) {
      clearInterval(interpInterval);
    }
  }, 10);

  //var posMat = new x3dom.fields.SFMatrix4f();
  //var rotMat = new x3dom.fields.SFMatrix4f();

  //posMat.setTranslate(targetPos);
  //rotMat.setRotate(targetRot);

  //runtime.canvas.doc._viewarea._transMat.setValues(posMat);
  //runtime.canvas.doc._viewarea._rotMat.setValues(rotMat);
  //runtime.canvas.doc._viewarea._needNavigationMatrixUpdate = true;
  //runtime.canvas.doc.needRender = true;
}

function lerp(source, target, time) {
  return source * (1.0-time) + target * time;
}
function lerpVector(source, target, time) {
  return new x3dom.fields.SFVec3f(
    lerp(source.x, target.x, time),
    lerp(source.y, target.y, time),
    lerp(source.z, target.z, time));
  }
  function lerpQuaternion(source, target, time) {
    return new x3dom.fields.Quaternion(
      lerp(source.x, target.x, time),
      lerp(source.y, target.y, time),
      lerp(source.z, target.z, time),
      lerp(source.w, target.w, time));
    }
