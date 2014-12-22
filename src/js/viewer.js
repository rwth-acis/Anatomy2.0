var processingMessage = false;
var canSend           = true;
var lastPos           = "";
var lastRot           = "";

function initializeModelViewer() {
  showAllQuick(document.getElementById('viewer_object').runtime); 
  document.getElementById('viewport').addEventListener('viewpointChanged', viewpointChanged);
  document.getElementById('viewer_object').addEventListener('mouseup', viewerMouseUp, false);
}

function receiveViewpointMsg(extras){
    //disable listening for changes in the viewport
    processingMessage = true;
    
    //var cam = printPositionAndOrientation('Received', extras.position, extras.orientation);

    //apply new viewpoint
    //document.getElementById('viewport').setAttribute('position', cam.pos);
    //document.getElementById('viewport').setAttribute('orientation', cam.rot);
    setView(extras.posMat, extras.rotMat);

    //clear any previous timeout
    if(typeof reenableViewpointListeningTimeout != 'undefined'){
  clearTimeout(reenableViewpointListeningTimeout);
    }
    //enable listening for changes in the viewport again some milliseconds after the last received msg
    reenableViewpointListeningTimeout = setTimeout(function(){processingMessage = false;} , 1000);
}

// Viewport section.
function sendPositionAndOrientation() {
  //only send if there is a role environment the viewer is embedded in
  if(!isEmbeddedInRole){
    return;
  }

  // Send through IWC!
  //var viewpointMsg = {'position': pos, 'orientation': rot}

  //send to wrapper
  //roleWrapper.postMessage("ViewpointUpdate " + JSON.stringify(viewpointMsg), "*");

  var view = getView();
  var viewpointMsg = {'posMat': view.posMat, 'rotMat': view.rotMat}
  roleWrapper.postMessage("ViewpointUpdate " + JSON.stringify(viewpointMsg), "*");
}

// Update position and rotation of the camera
function viewpointChanged(evt) {    

  // Prevent widgets from sending updates again and again
  // If we set the position because we received a message we do not want to send it back
  if(!evt || processingMessage) {
    return;
  }
    
  // You can only send data once every 0.1 seconds.
  if(!canSend) {
    document.getElementById('debugText').innerHTML = "Bypassing send!";
    console.log("Bypassing send!");
    return;
  }
  canSend = false;
  if(typeof sendTimeout != 'undefined'){
    clearTimeout(sendTimeout);
  }
  sendTimeout = setTimeout(function(){ 
    canSend = true; 
    document.getElementById('debugText').innerHTML = "Can send again!";
    console.log("Can send again!");
  } , 250);

  //printPositionAndOrientation('Updated', evt.position, evt.orientation);
  sendPositionAndOrientation();

  var view = getView();
  var intent = {
    'component' :'',                            // recipient, empty for broadcast
    'data'      :'http://data.org/some/data',   // data as URI
    'dataType'  :'text/xml',                    // data mime type
    'action'    :'ACTION_UPDATE',               // action to be performed by receivers
    'flags'     :['PUBLISH_GLOBAL'],            // control flags
    'extras'    :{'posMat': view.posMat,        // optional auxiliary data
                  'rotMat': view.rotMat}, 
  }

  console.info("subsite: intent: ", intent);
}

// Converts the position and orientation into a string and updates the view to display it.
function printPositionAndOrientation(str, pos, rot) {
  var camPos = pos.x.toFixed(4) + ' ' + pos.y.toFixed(4) + ' ' + pos.z.toFixed(4);
  var camRot = rot[0].x.toFixed(4) + ' ' + rot[0].y.toFixed(4) + ' ' 
                + rot[0].z.toFixed(4) + ' ' + rot[1].toFixed(4);
  document.getElementById('debugText').innerHTML = str + ' viewpoint position = ' +
                                                    camPos + ' orientation = ' + camRot;

  return {'pos': camPos, 'rot': camRot};
}

function showAllQuick(runtime, axis) {
  // If axis is not given, assume negative Z.
  if (axis === undefined)
    axis = "negZ";

  // Get the X3D scene element from runtime.
  var scene = runtime.canvas.doc._viewarea._scene;
  // Update it to latest boundary information.
  scene.updateVolume();
  // Record minimum and maximum positions (X,Y,Z) of the scene.
  var min = x3dom.fields.SFVec3f.copy(scene._lastMin);
  var max = x3dom.fields.SFVec3f.copy(scene._lastMax);
  // Get the scene main camera.
  var viewpoint = scene.getViewpoint();

  // Target forward axis for camera.
  var forwardAxis = new x3dom.fields.SFVec3f(0, 0, -1);

  // The coordinate system for camera.
  var x = "x", y = "y", z = "z";
  var sign = 1;

  // Setup the axis of rotation and coordinate system according to axis parameter.
  switch (axis) {

      case "posX":
      sign = -1;
      case "negX":

      x = "y"; 
      y = "z";
      z = "x"; 
      forwardAxis = new x3dom.fields.SFVec3f(sign, 0, 0);
      break;



      case "posY":
      sign = -1;
      case "negY":

      x = "z"; 
      y = "x";
      z = "y"; 
      forwardAxis = new x3dom.fields.SFVec3f(0, sign, 0);
      break;



      case "posZ":
      sign = -1;
      case "negZ":
      default:

      forwardAxis = new x3dom.fields.SFVec3f(0, 0, -sign);
      break;
  }

  // Get the field of view of camera.
  var fov = viewpoint.getFieldOfView();
  // Calculate boundary extents of scene.
  var extents = max.subtract(min);
  // Calculate the x and y spans of the camera.
  var denom = Math.tan(fov / 2.0);
  var offset = extents[z] / 2.0;
  var ySpan = (extents[y] / 2.0) / denom + offset;
  var xSpan = (extents[x] / 2.0) / denom + offset;
  // Offset the extents to the center.
  extents = min.add(extents.multiply(0.5));
  // Calculate and add the necessary Z to span all of scene.
  extents[z] += sign * (ySpan > xSpan ? ySpan : xSpan) * 1.01;

  // Setup translation matrix from extents.
  var translationMatrix = x3dom.fields.SFMatrix4f.translation(extents.negate());
  // Setup rotation matrix from axis of rotation.
  var rotationMatrix = x3dom.fields.Quaternion.rotateFromTo(new x3dom.fields.SFVec3f(0, 0, -1), forwardAxis).toMatrix();
  // Calculate final view matrix.
  var viewMatrix = rotationMatrix.mult(translationMatrix);

  // Set scene camera's matrix to the result.
  runtime.canvas.doc._viewarea._scene.getViewpoint().setView(viewMatrix);
}

function getView() {
  var runtime = document.getElementById('viewer_object').runtime;
  var posMat = runtime.canvas.doc._viewarea._transMat;
  var rotMat = runtime.canvas.doc._viewarea._rotMat;
  return {'posMat': posMat, 'rotMat': rotMat};
}
function setView(posMat, rotMat) {
  var runtime = document.getElementById('viewer_object').runtime;
  runtime.canvas.doc._viewarea._transMat.setValues(posMat);
  runtime.canvas.doc._viewarea._rotMat.setValues(rotMat);
  runtime.canvas.doc._viewarea._needNavigationMatrixUpdate  = true;
  runtime.canvas.doc.needRender = true;
}

function viewerMouseUp(event) {
  //printPositionAndOrientation('Sent final', getViewMatrix());
  sendPositionAndOrientation();

  var view = getView();
  var intent = {
    'component' :'',                            // recipient, empty for broadcast
    'data'      :'http://data.org/some/data',   // data as URI
    'dataType'  :'text/xml',                    // data mime type
    'action'    :'ACTION_UPDATE',               // action to be performed by receivers
    'flags'     :['PUBLISH_GLOBAL'],            // control flags
    'extras'    :{'posMat': view.posMat,        // optional auxiliary data
                  'rotMat': view.rotMat}, 
  }

  console.info("subsite: intent: ", intent);
}