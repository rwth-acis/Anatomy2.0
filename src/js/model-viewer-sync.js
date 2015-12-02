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
var globalFlag = false

//synchronize with other devices? (can be switched in toolbar.js)
modelViewerSync.isSynchronized    = true;

///interval between two synchronization msgs in ms
modelViewerSync.sendInterval = 1000
modelViewerSync.receiveInterval = 1000

// Saves whether info should be displayed when synchronizing after unsynchronizing
// from other widgets, also used in toolbar.js
var displayInfo;

modelViewerSync.remoteLecturer  = false;
modelViewerSync.lecturerMode    = false;

modelViewerSync.initialize = function () {
// The Y-object creation takes a fair amount of time, blocking the UI
	Y({
	  db: {
	    name: 'memory'
	  },
	  connector: {
//	  	 debug: true,
	    name: 'websockets-client',
	    room: 'Anatomy2.03',
	    types: ['Array', 'Text'],
	  },
     sourceDir: '/src/external'
	}).then(function (yconfig) {

	modelViewerSync.yconfig = yconfig
	modelViewerSync.y = yconfig.root
	
	// for debugging
	window.y = modelViewerSync.y
	
	var y = modelViewerSync.y

	y.set('loc_x', 0)
	y.set('loc_y', 0)
	y.set('loc_z', 0)
	y.set('rot_x', 0)
	y.set('rot_y', 0)
	y.set('rot_z', 0)

	modelViewerSync.y.observe( modelViewerSync.intervalBarrier(
			modelViewerSync.remoteViewChanged
			, modelViewerSync.receiveInterval
			) )

	modelViewerSync.x3dRoot = $('#viewer_object')[0]
	modelViewerSync.x3dViewport = $('#viewport')[0]
		
	// Add listeners for publishing local changes.
	modelViewerSync.x3dViewport.addEventListener('viewpointChanged'
											, modelViewerSync.intervalBarrier(
													modelViewerSync.localViewChanged
													, modelViewerSync.sendInterval
											) )

	console.log("Juhu!")

	})
}

//modelViewer.addEventListener('load', modelViewerSync.initialize);

modelViewerSync.intervalBarrier = function (passFunction, interval) {
	var state = {}
	state.interval = interval || 1000
	state.lastPassed = 0
	state.passFunction = passFunction
	
	return function () {
		if (state.timeout != null)
			return
			
		var now = new Date() .getTime()
		var timeToWait = (state.lastPassed + state.interval) - now
		
		state.timeout = setTimeout( 
			function (state) { return function () { 
				state.timeout = null
				state.lastPassed = new Date() .getTime()
				state.passFunction()
			} } (state)
			, timeToWait
		)
	}
}

/**
 * Event handler for getting a new iwc message with a new view matrix and
 * updating the local viewer with remote data.
 * @param extras parameters from the iwc message with position and rotation
 */
modelViewerSync.remoteViewChanged = function (events) {
	
	console.log('y observerd')

	var param = {}
	
	param.position = {}
	param.position.x = modelViewerSync.y.get('loc_x') || 0
	param.position.y = modelViewerSync.y.get('loc_y') || 0
	param.position.z = modelViewerSync.y.get('loc_z') || 0
	param.rotation = {}
	param.rotation.x = modelViewerSync.y.get('rot_x') || 0
	param.rotation.y = modelViewerSync.y.get('rot_y') || 0
	param.rotation.z = modelViewerSync.y.get('rot_z') || 0

//	console.log(modelViewerSync.y.contents)

// param = {'position':{'x':1,'y':2,'z':3}, 'rotation':{'x':1,'y':2,'z':3}}
try{
	if(globalFlag) {
		x3dExtensions.setView( modelViewerSync.x3dRoot.runtime, param, 0, function(){} );
	}
}catch (e) { console.log(e) }
//    setViewMode(extras.viewMode);
	
  // Don't synchronize if the viewpoint is from another model
/*  if(extras.selectedModel != window.location.search){
    window.location.assign(extras.selectedModel);
    return;
  }*/
}

/**
 * Propagates local changes via viewport events to all remote clients
 * when synchronization is enabled.
 * @param evt viewpoint changed event
 */
modelViewerSync.localViewChanged = function (evt) {
console.log('localViewChanged received')
	// if(!isEmbeddedInRole || !isSynchronized || !canSend || remoteLecturer) { return }

  var data = x3dExtensions.getView(modelViewerSync.x3dRoot.runtime);

	modelViewerSync.y.set('loc_x', data.position.x)
	modelViewerSync.y.set('loc_y', data.position.y)
	modelViewerSync.y.set('loc_z', data.position.z)
	modelViewerSync.y.set('rot_x', data.rotation.x)
	modelViewerSync.y.set('rot_y', data.rotation.y)
	modelViewerSync.y.set('rot_z', data.rotation.z)
		 
//	 console.log('y set, now: '+modelViewerSync.y.contents)
	 
/*  data["model"] = window.location.search;
  data.modelId = getParameterByName('id');

  data.viewMode = getViewMode();
*/
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
/*  if(modelViewerSync.lecturerMode) {
    toggleLecturerMode();
    sleep(2000);
  }*/
}


