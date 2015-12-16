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

modelViewerSync.localId = Math.random()
modelViewerSync.foreignId = 2 // must be != localId

modelViewerSync.initialize = function () {
    
    modelViewerSync.x3dRoot = $('#viewer_object')[0]
    
    viewerToolbar.isSynchronized.subscribe( function(newValue) {
        // apply remote state when returning to sync
        if (viewerToolbar.isSynchronized()) {
            modelViewerSync.remoteViewChanged();
        }        
    })
    
    //// sync
    
	// The Y-object creation takes a fair amount of time, blocking the UI
	Y({
	  db: {
	    name: 'memory'
	  },
	  connector: {
	    name: 'websockets-client',
	    room: 'Anatomy2.06',
	    types: ['Array', 'Text'],
	  },
     sourceDir: location.pathname + '/../../external'
	}).then(function (yconfig) {

	modelViewerSync.yconfig = yconfig
	modelViewerSync.y = yconfig.root
	
	// for debugging
	window.y = modelViewerSync.y
	
	var y = modelViewerSync.y

	// inits are not needed
	// y.init('view_mode', 'Examine')
	// y.init('selected_model', window.location.search)
	// y.set('show_info', false)

    
    //// viewport sync

    // limiting the amount of messages sent by Y-js
    // numbers in ms
    modelViewerSync.sendInterval = 200
    modelViewerSync.receiveInterval = 200

    modelViewerSync.animDuration = 350
    modelViewerSync.chairmanId = modelViewerSync.localId
    /* 	
        How to decide on whether to apply received remote state and whether to send local state:

        When local change is caused by remote-induced animation, the change is not echoed
        When local change is caused by local reasons, the change is propagated, but echoed remote changes are neglected
        (An echo can be created by local or remote)

        There are events which cause chairmanship of local or remote id
        see https://github.com/x3dom/x3dom/blob/master/src/Viewarea.js

                                                                                      propagate?
        viewpointChanged
                   |------- moving (onDrag, onMoveView)                                   ✓
                   |------- animating
                               |------- mixing (showAll, onDoubleClick,… → animateTo)
                               |           |------- local mixing                          ✓
                               |           |------- custom remote mixing                  ✗
                               |------- navigating, (navigateTo == true)                 (✓) 

        (✓) = ignored for simplicity's sake

        animations are calling viewarea._scene.getViewpoint().setView()
        movements are changing viewarea._transMat and viewarea._rotMat

        To stay informed about the chairmanship, every modifying function is hooked
    */
	// viewport: local → remote
	$('#viewport')[0].addEventListener(
			'viewpointChanged'
			, modelViewerSync.intervalBarrier(modelViewerSync.localViewChanged, modelViewerSync.sendInterval)
	)
	
	modelViewerSync.viewarea = modelViewerSync.x3dRoot.runtime.canvas.doc._viewarea
	var viewarea = modelViewerSync.viewarea

	var setViewareaHook = function (functionName, peerId) {
		var oldFunc = viewarea[functionName]
		viewarea[functionName] = function () {
			modelViewerSync.chairmanId = peerId
			return oldFunc.apply(viewarea, arguments)
		}
	}

	// hooks for observing chairmanship
	setViewareaHook('animateTo', modelViewerSync.localId)
	setViewareaHook('onDrag', modelViewerSync.localId)
	setViewareaHook('onMoveView', modelViewerSync.localId)

    
    // viewport: remote → local
	modelViewerSync.y.observePath(
			['view_matrix']
			, modelViewerSync.intervalBarrier(modelViewerSync.remoteViewChanged, modelViewerSync.receiveInterval)
	)
    
    
    
    
    //// other options sync
    
    // lecturer-mode: local → remote
    var func = function (newValue) {
        var yObj = {
            peerId : modelViewerSync.localId,
            modeEnabled : viewerToolbar.lecturerModeViewModel.modeEnabled()
        }
        y.set('lecturer_mode', yObj)
    }
    var subscription = viewerToolbar.lecturerModeViewModel.modeEnabled.subscribe( func )
    // lecturer-mode: remote → local
	modelViewerSync.y.observePath(['lecturer_mode'], function (events) {
        var yObj = y.get('lecturer_mode')
        if (yObj) {
            // avoid echo
            // "subscription.isDisposed = true/false" is easier, but "isDisposed" is obfuscated (called "R" when I tested)
            subscription.dispose()

            // change value
            viewerToolbar.lecturerModeViewModel.modeEnabled( yObj.modeEnabled )
            
            // reassign subscription
            subscription = viewerToolbar.lecturerModeViewModel.modeEnabled.subscribe( func )
        }
	})

        
/*	modelViewerSync.y.observePath(['view_mode'], function (events) {
		setViewMode(y.get('view_mode'))
	})
*/
/*	modelViewerSync.y.observePath(['selected_model'], function (events) {
		window.location.assign(y.get('selected_model'));
	})
*/
                                                              
/*  data["model"] = window.location.search;
  data.modelId = getParameterByName('id');

  data.viewMode = getViewMode();
*/
	})
}

//if(tools.isInRole())
	modelViewer.addEventListener('load', modelViewerSync.initialize);

/**
 * Event handler for getting a new iwc message with a new view matrix and
 * updating the local viewer with remote data.
 * @param extras parameters from the iwc message with position and rotation
 */
modelViewerSync.remoteViewChanged = function (events) {
	if (!viewerToolbar.isSynchronized()) { return }
	
	receivedView = y.get('view_matrix')

	if (receivedView == null) { return }

	// only set new view if not created from yourself
	if (receivedView.peerId == modelViewerSync.localId) { return }

	x3dExtensions.setView( modelViewerSync.x3dRoot.runtime, receivedView, modelViewerSync.animDuration )
	modelViewerSync.chairmanId = receivedView.peerId
}

/**
 * Propagates local changes via viewport events to all remote clients
 * when synchronization is enabled.
 * @param evt viewpoint changed event
 */
modelViewerSync.localViewChanged = function (evt) {
	if (!viewerToolbar.isSynchronized()) { return }
    if (viewerToolbar.lecturerModeViewModel.modeEnabled() && !viewerToolbar.lecturerModeViewModel.isLecturer()) { return }
	
	// block if event was triggered by mixing-animation caused from remote state
	if (modelViewerSync.chairmanId != modelViewerSync.localId) { return }

	var currentView = x3dExtensions.getView(modelViewerSync.x3dRoot.runtime)
	currentView.peerId = modelViewerSync.localId
	modelViewerSync.y.set('view_matrix', currentView)
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


/*
    utility function, similar to Knockout.js' rate-limiter (http://knockoutjs.com/documentation/rateLimit-observable.html)
    Here is an exaple sequence diagram:
    
    e←event                          e  e      e         e     e   e                              e
    [                ]←interval      [                ][                 ][                ]      [               ]
    ✓←passfunction()                 ✓  ✗      ✗-----✓  ✗     ✗  ✗-----✓                        ✓
*/
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