// IWC initialize section.
var iwcClient;
var id = Math.random().toString(36).substr(2, 9);
var widget = 'http://zxmma58.bplaced.net/henm/src/views/model_viewer%20-%20Copy.xml?id=' + id;
var sender = '';

function init () {
  iwcClient = new iwc.Client();
  iwcClient.connect(iwcCallback);
}
gadgets.util.registerOnLoadHandler(init);


// Receiver functionality
function iwcCallback(intent) {
  if(intent.sender === widget) { return; }

  sender     = intent.sender;
  var extras = intent.extras;
  var cam    = printPositionAndOrientation('Received', extras.position, extras.orientation);
  
  document.getElementById('viewport').setAttribute('position', cam.pos);
  document.getElementById('viewport').setAttribute('orientation', cam.rot);

}


// Publisher functionality
document.onload = function() 
{
  document.getElementById('viewport').addEventListener('viewpointChanged', viewpointChanged);
}


// Viewport section.
function sendPositionAndOrientation(pos, rot) {
  // Send through IWC!
  var intent = {
    'component' :'',                            // recipient, empty for broadcast
    'data'      :'http://data.org/some/data',   // data as URI
    'dataType'  :'text/xml',                    // data mime type
    'action'    :'ACTION_UPDATE',               // action to be performed by receivers
    'flags'     :['PUBLISH_GLOBAL'],            // control flags
    'extras'    :{'position': pos, 'orientation': rot}, // optional auxiliary data
    'sender'    :widget
  }
  
  if(iwc.util.validateIntent(intent)) {
    printPositionAndOrientation('Sent', pos, rot);
    iwcClient.publish(intent);
  } else {
    alert('Intent not valid! ');
  }
}

// Update position and rotation of the camera
function viewpointChanged(evt) {
  
  // Prevent widgets from sending updates again and again
  // If sender is set this means that the update comes from another widget and not from manipulation
  if(evt && sender === '') {
    printPositionAndOrientation('Updated', evt.position, evt.orientation);
    sendPositionAndOrientation(evt.position, evt.orientation);
  }
  sender = '';
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