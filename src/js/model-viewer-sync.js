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

/* 	
	How to decide on whether to apply received remote state and whether to send local state:

	When local change is caused by remote-induced animation, the change is not echoed
	When local change is caused by local reasons, the change is propagated, but echoed remote changes are neglected
	(An echo can be created by local or remote)
	
	Every local change is checked whether it shall be propagated:
	                                                                                              propagate?
	viewpointChanged
	           |------- moving (onDrag, onMoveView), isMoving()                                        ✓
	           |------- animating (tick), isAnimating()
	                       |------- mixing (resetView, showAll, fit, onDoubleClick → animateTo)
	                       |           |------- local mixing                                           ✓
	                       |           |------- remote mixing                                          ✗
	                       |------- navigating, navigateTo() - hook                                    ✓
	                       
	animations are calling viewarea._scene.getViewpoint().setView()
	movements are changing viewarea._transMat and viewarea._rotMat
	
	checking animation and navigation is easier than checking mixing
	→ if !isMoving && isAnimating && !isNavigating && mixingId != localId {
			stopPropagation
		}

	isAnimating is not exactly accurate because after being set to false one further time the viewpointChange is called
	see:
		https://github.com/x3dom/x3dom/blob/0f859d10a4a830c8fc78cfad6c5f545fb5e1816a/src/X3DDocument.js#L349
		https://github.com/x3dom/x3dom/blob/91dee119bdc1d37f30bc0abdc58050f43183a21e/src/Viewarea.js#L212
				
	Obtaining mixingId with hook on viewarea._mixer.setBeginMatrix
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
	setTimeout( function() { 
	modelViewerSync.x3dViewport.addEventListener('viewpointChanged'
											, modelViewerSync.intervalBarrier(
													modelViewerSync.localViewChanged
													, modelViewerSync.sendInterval
											) )
										}, 1000)
											
	// setting hooks (in terms of decorators) for maintaining information about cause of viewpointChange 
	// (see comments on declaration)
	modelViewerSync.viewarea = modelViewerSync.x3dRoot.runtime.canvas.doc._viewarea
	var viewarea = modelViewerSync.viewarea
	var mixer = viewarea._mixer
	
	// tracking variable
	viewarea.mixingId = modelViewerSync.foreignId

	mixer.oldSetBeginMatrix = mixer.setBeginMatrix
	mixer.setBeginMatrix = function (mat, peerId) {
		viewarea.mixingId = (peerId == null) ? modelViewerSync.localId : peerId
		mixer.oldSetBeginMatrix(mat)
	}

	viewarea.bNavigating = false;
	viewarea.isNavigating = function() { return viewarea.bNavigating }
	viewarea.oldNavigateTo = viewarea.navigateTo
	viewarea.navigateTo = function (timestamp) {
		viewarea.bNavigating = viewarea.oldNavigateTo(timestamp)
		return viewarea.bNavigating
	}
	
	viewarea.oldOnDrag = viewarea.onDrag
	viewarea.onDrag = function (x, y, buttonState) {
		viewarea.mixingId = modelViewerSync.localId
		return viewarea.oldOnDrag(x, y, buttonState)
	}	

	// https://github.com/x3dom/x3dom/blob/91dee119bdc1d37f30bc0abdc58050f43183a21e/src/Viewarea.js#L162	
	viewarea.oldTick = viewarea.tick
	viewarea.tick = function (timeStamp) {
		viewarea.bAnimating = viewarea.oldTick(timeStamp)
		return viewarea.bAnimating
	}
	
	// override
	// https://github.com/x3dom/x3dom/blob/91dee119bdc1d37f30bc0abdc58050f43183a21e/src/Viewarea.js#L228
	viewarea.isAnimating = function () {
		return viewarea.bAnimating
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
		if (timeToWait < 0) { timeToWait = 0 }
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
	

try{
		receivedView = y.get('view_matrix')
	
		// only set new view if not created from yourself
		if (receivedView.peerId == modelViewerSync.localId) { 
			console.log('→ -')
			return
		}
		console.log('→ +')
		x3dExtensions.setView( modelViewerSync.x3dRoot.runtime, receivedView, modelViewerSync.animDuration, receivedView.peerId )
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
	// block if event was triggered by mixing-animation caused from remote state
	var va = modelViewerSync.viewarea
	if (!va.isMoving() && va.isAnimating() && !va.isNavigating() && va.mixingId != modelViewerSync.localId) { 
		console.log("- →")
		return 
	}
	// || !isEmbeddedInRole || !isSynchronized || !canSend || remoteLecturer

	console.log(va.isAnimating(), '+ →')
	var currentView = x3dExtensions.getView(modelViewerSync.x3dRoot.runtime)
	currentView.peerId = modelViewerSync.localId
	modelViewerSync.y.set('view_matrix', currentView)
	
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


