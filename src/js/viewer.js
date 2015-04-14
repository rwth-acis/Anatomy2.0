/**
 * @file Viewer.js
 * File for X3D viewer functionality
 */

var processingMessage = false;
var canSend           = false;
//synchronize with other devices? (can be switched in menuToolbar.js)
var isSynchronized    = true;

///interval between two synchronization msgs in ms
var sendInterval = 700;

var lastTimestamp;

var lastData;

var x3dRoot;

// Saves whether info should be displayed when synchronizing after unsynchronizing
// from other widgets, also used in menuToolbar.js
var displayInfo;

var remoteLecturer  = false;
var lecturerMode    = false;

/**
 * Retrieves URL parameters.
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * Function for reloading synchronously with other widgets.
 */
function onReloadRequest() {
  window.location.reload(false);
}
subscribeIWC("Reload", onReloadRequest);
/**
 * Function for initial state sync from other clients.
 */
function onUserConnected(extras) {
  if (lecturerMode) {
    var data = new Object();
    data['enabled'] = true;
    publishIWC("LecturerModeUpdate", data);
  }
  onLocalUpdate();
}
subscribeIWC("UserConnected", onUserConnected);

/**
 * Sets up the X3D viewport and subscribes to
 * mouse callbacks for propagating changes.
 */
function initializeModelViewer() {
  x3dRoot     = document.getElementById('viewer_object');
  x3dViewport = document.getElementById('viewport');

  // Normalize scene camera to view all content.
  normalizeCamera(x3dRoot.runtime);

  // Add listeners for publishing local changes.
  x3dViewport.addEventListener('viewpointChanged', viewpointChanged);

  // !!!HACK!!! to prevent propagating initial position when new user connected.
  x3dRoot.addEventListener('mousedown', function() {
    canSend = true;
    x3dRoot.removeEventListener('mousedown', arguments.callee);
    log('Enabled publishing!');
  });
  x3dRoot.addEventListener('touchstart', function() {
    canSend = true;
    x3dRoot.removeEventListener('touchstart', arguments.callee);
    log('Enabled publishing!');
  });

  window.addEventListener( "keypress", onKeyDown, false );
}
function onKeyDown(e) {
  if(e.keyCode == 107) { // K 
    var debugTextStyle = document.getElementById('debugText').style;
    if(debugTextStyle.display == 'none') {
      debugTextStyle.display = 'inline';
    }
    else {
      debugTextStyle.display = 'none';
    }
  }

}

function onUserConnected(message) {
  var data            = getView(x3dRoot.runtime);
  data["timestamp"]   = new Date();
  lastTimestamp       = data["timestamp"];
  data.selectedModel  = window.location.search;
  publishIWC("ViewpointUpdate", data);
}
subscribeIWC("UserConnected", onUserConnected);

/**
 * Event handler for getting a new iwc message with a new view matrix and
 * updating the local viewer with remote data.
 * @param extras parameters from the iwc message with position and rotation
 */
function onRemoteUpdate(extras) {
  // Don't synchronize if the viewpoint is from another model
  if(extras.selectedModel != window.location.search){
    window.location.assign(extras.selectedModel);
    return;
  }

  var newTimestamp = new Date(extras.timestamp);

  // Synchronization is stopped
  if(!isSynchronized) {
    // Save the timestamp, position and rotation data.
    if(lastTimestamp == null || newTimestamp > lastTimestamp) {
      lastData = extras;
    }
    return;
  }

  // Prevent async local and remote updates.
  processingMessage = true;

  // Update only if received timestamp is greater than last timestamp.
  if(lastTimestamp == null || newTimestamp > lastTimestamp) {
    //disable sending position updates until we receive no more update
    canSend = false;

    setView(x3dRoot.runtime, extras, finishedSettingView);
    setViewMode(extras.viewMode);
    lastTimestamp = newTimestamp;
  }

  // Re-enable async local and remote updates.
  processingMessage = false;
}
subscribeIWC("ViewpointUpdate", onRemoteUpdate);

/**
 * Propagates local changes via mouse to all remote clients
 * when synchronization is enabled.
 */
function onLocalUpdate() {
  if(!isEmbeddedInRole || !isSynchronized || processingMessage || !canSend) {
    return;
  }

  if(remoteLecturer) {
    return;
  }

  // Setup the data to be sent to others.
  var data = getView(x3dRoot.runtime);
  data["model"] = window.location.search;
  data["timestamp"] = new Date();
  lastTimestamp = data["timestamp"];

  //also specifiy what model was moved (included in uri)
  data.selectedModel = window.location.search;
  data.modelId = getParameterByName('id');

  data.viewMode = getViewMode();

  publishIWC("ViewpointUpdate", data);
  log('Published message!');
}

/**
 * Propagates local changes via viewport events to all remote clients
 * when synchronization is enabled.
 * @param evt viewpoint changed event
 */
function viewpointChanged(evt) {

  // Prevent widgets from sending updates while applying a received viewpoint msg
  // If we set the position because we received a message we do not want to send it back
  if(!evt || processingMessage || !canSend) {
    log("Bypassing send!");
    return;
  }

  if(remoteLecturer) {
    return;
  }

  //enable sending the position in a loop
  if(typeof updateInterval != 'number'){ //but only when its not already enabled
    updateInterval = setInterval(onLocalUpdate, sendInterval);
    log("sending");
  }

  //disable sending the positions a bit after the last update
  if(typeof sendTimeout != 'undefined'){
    clearTimeout(sendTimeout);
  }
  sendTimeout = setTimeout(function(){
    //disable sending
    clearTimeout(updateInterval);
    updateInterval = null;
    log("Not sending anymore");
  } , sendInterval + 50);
}

function log(message) {
  document.getElementById('debugText').innerHTML =
  (new Date()).toLocaleTimeString() + ' - ' + message;
}

/**
 * An overview widget selected a model, we load it
 */
function receiveModelSelectedByOverview(msgContent){
  window.location.assign(msgContent);
}

/**
 * Re-synchronize with last location sent from other widgets
 * Used in menuToolbar.js.
 */
function synchronizePositionAndOrientation() {
  if(lastData != null) {
    processingMessage = true;
    setView(x3dRoot.runtime, lastData, function() {});
    setViewMode(lastData.viewMode);
    processingMessage = false;
  }
}

/**
 * Save current location when stopping the synchronization in case nothing changes in the other widgets
 * Used in menuToolbar.js.
 */
function savePositionAndOrientation() {
  posAndOrient = getView(x3dRoot.runtime);
}

/**
 * Callback function for the setView function,
 * so we get notified when the interpolation is finished.
 */
function finishedSettingView(){
  //reenable sending position updates
  if(typeof enableSendingTimeout != 'undefined'){
    clearTimeout(enableSendingTimeout);
  }
  enableSendingTimeout = setTimeout(function(){
    //disable sending
    canSend = true;
    log("finished updating");
  } , 50);
}

/**
 * Listens to remote lecturers that might enable or disable
 * the lecture mode.
 */
function onRemoteLecturerMode(extras) {
  remoteLecturer = extras.enabled;

  if(remoteLecturer)
    document.getElementById('navType').setAttribute("type", "None");
  else
    document.getElementById('navType').setAttribute("type", "Examine");

  var btn = document.getElementById('btnLecturerMode');
  if(btn != null) {
    if(remoteLecturer) {
      btn.innerHTML ="Other Lecturer Has Control!";
      btn.disabled = true;
    }
    else {
      btn.innerHTML ="Enable Lecturer Mode";
      btn.disabled = false;
    }
  }
}
subscribeIWC("LecturerModeUpdate", onRemoteLecturerMode);
/**
 * Enables / disables the lecturer mode.
 */
function toggleLecturerMode() {
  lecturerMode = !lecturerMode;

  var data = new Object();
  data['enabled'] = lecturerMode;
  publishIWC("LecturerModeUpdate", data);

  var btn = document.getElementById('btnLecturerMode');
  if (lecturerMode) {
    btn.innerHTML ="Disable Lecturer Mode";
  }
  else {
    btn.innerHTML ="Enable Lecturer Mode";
  }
}
/**
 * Makes sure lecturer mode is released before leaving room.
 */
window.onbeforeunload = function(){
  // Release lecturer mode when leaving.
  if(lecturerMode) {
    toggleLecturerMode();
    sleep(2000);
  }
}
