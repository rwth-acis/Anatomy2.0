function receiveViewpointMsg(extras){
    //disable listening for changes in the viewport
    processingMessage = true;
    
    var cam = printPositionAndOrientation('Received', extras.position, extras.orientation);

    //apply new viewpoint
    document.getElementById('viewport').setAttribute('position', cam.pos);
    document.getElementById('viewport').setAttribute('orientation', cam.rot);


    //enable listening for changes in the viewport again
    processingMessage = false;
}

document.onload = function() 
{
  document.getElementById('viewport').addEventListener('viewpointChanged', viewpointChanged);
  processingMessage = false;
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
    
  printPositionAndOrientation('Updated', evt.position, evt.orientation);
  sendPositionAndOrientation(evt.position, evt.orientation);

  var intent = {
    'component' :'',                            // recipient, empty for broadcast
    'data'      :'http://data.org/some/data',   // data as URI
    'dataType'  :'text/xml',                    // data mime type
    'action'    :'ACTION_UPDATE',               // action to be performed by receivers
    'flags'     :['PUBLISH_GLOBAL'],            // control flags
    'extras'    :{'position': pos, 'orientation': rot}, // optional auxiliary data
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
