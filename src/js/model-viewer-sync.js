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

// interval between two synchronization msgs in ms
modelViewerSync.sendInterval = 200
modelViewerSync.receiveInterval = 777

modelViewerSync.animDuration = modelViewerSync.receiveInterval-50

// stores state whether current animation from local or remote change
/* it works as follows:
	a hook is created on 'x3dom.runtime.canvas.doc._viewarea._scene.getViewpoint() → setView()'
	this function is called most importantly (but not exclusively, check Viewarea.js for more detail) by 
	- the animations (see x3dom.Viewarea.prototype.animateTo)
	- the drag-operations (see x3dom.Viewarea.prototype.onDrag)
	
	When a remote change is set via the mixer (see x3d-extensions.js), the mixingId is set to some foreign id
	If a local animation is played (e.g. doubleclick, pressing 'A', ...), the mixingId is set to local id
	
	When local change is caused by remote-induced animation, the change is not echoed
	When local change is caused by local reasons, the change is propagated, but echoed remote changes are neglected
	An echo can be created by local or remote
	
	Every local change is checked whether it comes from a foreign-induced animation
*/
modelViewerSync.localId = Math.random()
modelViewerSync.foreignId = 2 // must be != localId
modelViewerSync.blockSend = false

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
	    room: 'Anatomy2.05',
	    types: ['Array', 'Text'],
	  },
     sourceDir: '/src/external'
	}).then(function (yconfig) {

	modelViewerSync.yconfig = yconfig
	modelViewerSync.y = yconfig.root
	
	// for debugging
	window.y = modelViewerSync.y
	
	var y = modelViewerSync.y

	y.set('view_matrix', x3dom.fields.SFMatrix4f.identity())

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
											
	// setting hooks (in terms of decorators) for maintaining information about cause of viewpointChange 
	// (see comments on declaration)
	var mixer = modelViewerSync.x3dRoot.runtime.canvas.doc._viewarea._mixer
	
	// tracking variable
	mixer.mixingId = modelViewerSync.foreignId

	mixer._beginMat.fromMixer = true
	mixer._endMat.fromMixer = true
	mixer.oldMix = mixer.mix
	mixer.mix = function (timestamp) {
		var mat = mixer.oldMix(timestamp)
		mat.fromMixer = true
		return mat
	}
	
	var viewpoint = modelViewerSync.x3dRoot.runtime.canvas.doc._viewarea._scene.getViewpoint()
	viewpoint.oldSetView = viewpoint.setView
	viewpoint.setView = function (mat) {
		if (mat.fromMixer) {
			// mixing in progress
			if (mat.mixingId == modelViewerSync.localId)
				modelViewerSync.blockSend = false
			else
				modelViewerSync.blockSend = true
		} else {
			// no mixing, dragging/panning/similar supposed
			modelViewerSync.blockSend = false
			
			// if dragging/,,, appears during animation
			mixer.mixingId = modelViewerSync.localId
		}
		console.log(modelViewerSync.blockSend)
			
		return viewpoint.oldSetView(mat)
	}
	
	})
}

modelViewer.addEventListener('load', modelViewerSync.initialize);


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

try{
	if(globalFlag) {
		receivedView = y.get('view_matrix')
		// only set new view if not created from yourself
		if (receivedView.peerId != modelViewerSync.localId) {
			x3dExtensions.setView( modelViewerSync.x3dRoot.runtime, receivedView, modelViewerSync.animDuration, receivedView.peerId )
		}
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
	if (modelViewerSync.blockSend) { return }
	// || !isEmbeddedInRole || !isSynchronized || !canSend || remoteLecturer

	var currentView = x3dExtensions.getView(modelViewerSync.x3dRoot.runtime)
	currentView.peerId = modelViewerSync.localId
	modelViewerSync.y.set('view_matrix', currentView)
	console.log('localChange')
	
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


