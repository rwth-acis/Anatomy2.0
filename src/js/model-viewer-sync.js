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
 * @file Viewer.js
 * File for X3D viewer functionality
 */

var modelViewerSync = {}

//synchronize with other devices? (can be switched in toolbar.js)
modelViewerSync.isSynchronized    = true;

modelViewerSync.initialize = function () {
	Y({
	  db: {
	    name: 'memory'
	  },
	  connector: {
	    name: 'websockets-client',
	    room: 'Anatomy2.0',
	    types: ['Array', 'Text'],
	  },
     sourceDir: '/src/external'
	}).then(function (yconfig) {

	modelViewerSync.yconfig = yconfig
	modelViewerSync.y = yconfig.root
	
	// for debugging
	window.y = modelViewerSync.y
	
	modelViewerSync.y.set('locrot', Y.Map).then( function(locrot) {
		locrot.set('loc_x', 0)
		locrot.set('loc_y', .)
		locrot.set('loc_z', 0)
		locrot.set('rot_x', 0)
		locrot.set('rot_y', 0)
		locrot.set('rot_z', 0)
		modelViewerSync.y.get('locrot').then( function(lr) { console.log(lr.get('loc_x')) } )
	})
		
	modelViewerSync.x3dRoot = $('#viewer_object')[0]
	modelViewerSync.x3dViewport = $('#viewport')[0]
	
	// Normalize scene camera to view all content.
	// normalizeCamera(x3dRoot.runtime);
	
	// Add listeners for publishing local changes.
	modelViewerSync.x3dViewport.addEventListener('viewpointChanged', viewpointChanged)
	// Add listener for applying remote changes
	modelViewerSync.y.observePath('locrot', yObserve)

	console.log("Juhu!")

	})
}

///interval between two synchronization msgs in ms
var sendInterval = 700;
var lastTimestamp;
var lastData;
var x3dRoot;

// Saves whether info should be displayed when synchronizing after unsynchronizing
// from other widgets, also used in toolbar.js
var displayInfo;

var remoteLecturer  = false;
var lecturerMode    = false;


/**
 * Event handler for getting a new iwc message with a new view matrix and
 * updating the local viewer with remote data.
 * @param extras parameters from the iwc message with position and rotation
 */
modelViewerSync.yObserve = function () {
  // Don't synchronize if the viewpoint is from another model
/*  if(extras.selectedModel != window.location.search){
    window.location.assign(extras.selectedModel);
    return;
  }*/

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
  console.log('Published message!');
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
    return;
  }

  if(remoteLecturer) {
    return;
  }

  //enable sending the position in a loop
  if(typeof updateInterval != 'number'){ //but only when its not already enabled
    updateInterval = setInterval(onLocalUpdate, sendInterval);
  }

  //disable sending the positions a bit after the last update
  if(typeof sendTimeout != 'undefined'){
    clearTimeout(sendTimeout);
  }
  sendTimeout = setTimeout(function(){
    //disable sending
    clearTimeout(updateInterval);
    updateInterval = null;
    console.log("Not sending anymore");
  } , sendInterval + 50);
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
    console.log("finished updating");
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

/*
 * An overview widget selected a model, we load it
 * @param msgContent received message content from iwc
 */
function receiveModelSelectedByOverview(msgContent){
    console.log("model-viewer-widget: loading site: ", msgContent.href + "&widget=true");
    window.location.assign(msgContent.href + "&widget=true");
}

/**
 * Re-synchronize with last location sent from other widgets
 * Used in toolbar.js.
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
 * Makes sure lecturer mode is released before leaving room.
 */
window.onbeforeunload = function(){
  // Release lecturer mode when leaving.
  if(lecturerMode) {
    toggleLecturerMode();
    sleep(2000);
  }
}
