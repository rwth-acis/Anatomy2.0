var processingMessage = false;
var canSend           = true;

function initializeModelViewer() {
  showAllQuick(document.getElementById('viewer_object').runtime); 
  document.getElementById('viewport').addEventListener('viewpointChanged', viewpointChanged);
}

function receiveViewpointMsg(extras){
    //disable listening for changes in the viewport
    processingMessage = true;
    
    var cam = printPositionAndOrientation('Received', extras.position, extras.orientation);

    //apply new viewpoint
    document.getElementById('viewport').setAttribute('position', cam.pos);
    document.getElementById('viewport').setAttribute('orientation', cam.rot);

    //clear any previous timeout
    if(typeof reenableViewpointListeningTimeout != 'undefined'){
  clearTimeout(reenableViewpointListeningTimeout);
    }
    //enable listening for changes in the viewport again some milliseconds after the last received msg
    reenableViewpointListeningTimeout = setTimeout(function(){processingMessage = false;} , 1000);
}

// Viewport section.
function sendPositionAndOrientation(pos, rot) {
  //only send if there is a role environment the viewer is embedded in
  if(!isEmbeddedInRole){
    return;
  }

  // Send through IWC!
  var viewpointMsg = {'position': pos, 'orientation': rot}

  //send to wrapper
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
  canSend     = false;
  if(typeof sendTimeout != 'undefined'){
    clearTimeout(sendTimeout);
  }
  sendTimeout = setTimeout(function(){ 
    canSend = true; 
    document.getElementById('debugText').innerHTML = "Can send again!";
    console.log("Can send again!");
  } , 100);

  printPositionAndOrientation('Updated', evt.position, evt.orientation);
  sendPositionAndOrientation(evt.position, evt.orientation);

  var intent = {
    'component' :'',                            // recipient, empty for broadcast
    'data'      :'http://data.org/some/data',   // data as URI
    'dataType'  :'text/xml',                    // data mime type
    'action'    :'ACTION_UPDATE',               // action to be performed by receivers
    'flags'     :['PUBLISH_GLOBAL'],            // control flags
    'extras'    :{'position': evt.position, 'orientation': evt.orientation}, // optional auxiliary data
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
  if (axis === undefined)
    axis = "negZ";

  var scene = runtime.canvas.doc._viewarea._scene;
  scene.updateVolume();

  var min = x3dom.fields.SFVec3f.copy(scene._lastMin);
  var max = x3dom.fields.SFVec3f.copy(scene._lastMax);

  var x = "x", y = "y", z = "z";
  var sign = 1;
  var to, from = new x3dom.fields.SFVec3f(0, 0, -1);

  switch (axis) {
      case "posX":
      sign = -1;
      case "negX":
      z = "x"; x = "y"; y = "z";
      to = new x3dom.fields.SFVec3f(sign, 0, 0);
      break;
      case "posY":
      sign = -1;
      case "negY":
      z = "y"; x = "z"; y = "x";
      to = new x3dom.fields.SFVec3f(0, sign, 0);
      break;
      case "posZ":
      sign = -1;
      case "negZ":
      default:
      to = new x3dom.fields.SFVec3f(0, 0, -sign);
      break;
  }

  var viewpoint = scene.getViewpoint();
  var fov = viewpoint.getFieldOfView();

  var dia = max.subtract(min);

  var diaz2 = dia[z] / 2.0, tanfov2 = Math.tan(fov / 2.0);

  var dist1 = (dia[y] / 2.0) / tanfov2 + diaz2;
  var dist2 = (dia[x] / 2.0) / tanfov2 + diaz2;

  dia = min.add(dia.multiply(0.5));

  dia[z] += sign * (dist1 > dist2 ? dist1 : dist2) * 1.01;

  var quat = x3dom.fields.Quaternion.rotateFromTo(from, to);

  var viewmat = quat.toMatrix();
  viewmat = viewmat.mult(x3dom.fields.SFMatrix4f.translation(dia.negate()));

  runtime.canvas.doc._viewarea._scene.getViewpoint().setView(viewmat);
};
