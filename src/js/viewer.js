var processingMessage = false;
var canSend           = false;
//synchronize with other devices? (can be switched in menuToolbar.js)
var isSynchronized    = true;

var lastTimestamp;

var lastData;

var x3dRoot;

function initializeModelViewer() {
  x3dRoot     = document.getElementById('viewer_object');
  x3dViewport = document.getElementById('viewport');

  // Normalize scene camera to view all content.
  normalizeCamera(x3dRoot.runtime);

  // Add listeners for publishing local changes.
  x3dRoot.addEventListener('mousedown', onMouseDown);
  x3dRoot.addEventListener('mouseup', onMouseUp);
  document.addEventListener('mousewheel', onMouseWheel);

  // !!!HACK!!! to prevent propagating initial position when new user connected.
  x3dRoot.addEventListener('mousedown', function() {
    canSend = true;
    x3dRoot.removeEventListener('mousedown', arguments.callee);
    log('Enabled publishing!');
  });
}
function onRemoteUpdate(extras) {
  // Don't synchronize if the viewpoint is from another model
  if(extras.selectedModel != window.location.search){
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
    setView(x3dRoot.runtime, extras);
    lastTimestamp = newTimestamp;
  }

  // Re-enable async local and remote updates.
  processingMessage = false;
}
subscribeIWC("ViewpointUpdate", onRemoteUpdate);

function onLocalUpdate() {
  if(!isEmbeddedInRole || !isSynchronized || processingMessage || !canSend) {
    return;
  }

  // Setup the data to be sent to others.
  var data = getView(x3dRoot.runtime);
  data["timestamp"] = new Date();
  lastTimestamp = data["timestamp"];

  //also specifiy what model was moved (included in uri)
  data.selectedModel = window.location.search;

  publishIWC("ViewpointUpdate", data);
  log('Published message!');
}
function onMouseDown(event) {
  updateInterval = setInterval(onLocalUpdate, 700);
}
function onMouseUp(event) {
  if(typeof updateInterval != 'undefined') {
    clearTimeout(updateInterval);
  }
  // Do one last update.
  onLocalUpdate();
}
function onMouseWheel(event) {
  onLocalUpdate();
}

function log(message) {
  document.getElementById('debugText').innerHTML =
  (new Date()).toLocaleTimeString() + ' - ' + message;
}

/**
 * An overview widget selected a model, we load it
 *
 * Ali: Is this used by other JS files? If so, mark it in
 * the JSDoc!!!
 */
function receiveModelSelectedByOverview(msgContent){
  window.location.assign(msgContent);
}

/**
 * Re-synchronize with last location sent from other widgetsü
 *
 * Ali: Is this used by other JS files? If so, mark it in
 * the JSDoc!!!
 */
function synchronizePositionAndOrientation() {
  if(lastData != null) {
    setView(x3dRoot.runtime, lastData);
  }
}
