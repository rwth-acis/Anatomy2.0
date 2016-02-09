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

showcase.sync = {}

showcase.sync.localId = Math.random()
showcase.sync.foreignId = 2 // must be != localId

showcase.sync.init = function () {
    
    /*
        inits handled in arrays to group their code more intuitively
    */
    
    showcase.sync.onDocLoad = []
    showcase.sync.onYLoad = []
    showcase.sync.onModelLoad = []
    
    // Doc-load
    $(document).ready( function () {
        showcase.sync.onDocLoad.forEach(function(callback){callback()}) 
    })
    
    // Y-creation
    showcase.sync.onDocLoad.push(function () {
        // The Y-object creation takes a fair amount of time, blocking the UI
        Y({
          db: {
            name: 'memory'
          },
          connector: {
            name: 'websockets-client',
            room: 'Anatomy2.0-role-v1.1.0-'+URI().query(true).rolespace,
          },
         sourceDir: location.pathname + '/../../external',
         share: {
             showcase: 'Map'
         }
        }).then(function (y) {
            showcase.sync.y = y

            // for debugging
            window.y = y
            
            // catching errors because else Y-js would eat them
            try { showcase.sync.onYLoad.forEach(function(callback){callback()}) }
            catch(err) { console.log('Error in Y-load callbacks: ', err)}
        })
    })
    
    // x3d-object loaded
    showcase.addEventListener('load', function () {
        showcase.sync.x3dRoot = $('#viewer_object')[0]
        
        showcase.sync.onModelLoad.forEach(function(callback){callback()})
    })

    
    
    //////// resync all
    
    showcase.sync.onDocLoad.push(function () {
        showcase.toolbar.isSynchronized.subscribe( function(newValue) {
                // apply remote state when returning to sync
                if (showcase.toolbar.isSynchronized()) {
                    showcase.sync.remoteSelectedModelChange()
                    showcase.sync.remoteViewChanged()
                }        
            })
    })
    

    //////// delayed viewport-update
    
    showcase.sync.onModelLoad.push(function () {  
        if (showcase.sync.remoteViewChangeBeforeModelLoad) {
            showcase.sync.remoteViewChanged()
        }
    })
    
    
    //////// viewport sync
    
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
    
    // limiting the amount of messages sent by Y-js
    // numbers in ms
    showcase.sync.sendInterval = 200
    showcase.sync.receiveInterval = 200

    showcase.sync.animDuration = 350
    showcase.sync.chairmanId = showcase.sync.localId
    
    // viewport: remote → local
    showcase.sync.onYLoad.push(function () {
        showcase.sync.remoteViewChanged = function (events) {
            if (!showcase.toolbar.isSynchronized()) { return }

            // x3d model not loaded yet
            if (showcase.sync.x3dRoot == null) { 
                showcase.sync.remoteViewChangeBeforeModelLoad = true
                return
            }

            receivedView = showcase.sync.y.share.showcase.get('view_matrix')

            if (receivedView == null) { return }

            // only set new view if not created from yourself
            if (receivedView.peerId == showcase.sync.localId) { return }

            x3dExtensions.setView( showcase.sync.x3dRoot.runtime, receivedView, showcase.sync.animDuration )
            showcase.sync.chairmanId = receivedView.peerId
        }
        
        showcase.sync.y.share.showcase.observePath(
                ['view_matrix']
                , showcase.sync.intervalBarrier(showcase.sync.remoteViewChanged, showcase.sync.receiveInterval)
        )
    })
        
    // viewport: local → remote
    showcase.sync.onModelLoad.push(function () {
        showcase.sync.localViewChanged = function (evt) {
            if (!showcase.toolbar.isSynchronized()) { return }
            if (showcase.toolbar.lecturerModeViewModel.modeEnabled() && !showcase.toolbar.lecturerModeViewModel.isLecturer()) { return }

            // block if event was triggered by mixing-animation caused from remote state
            if (showcase.sync.chairmanId != showcase.sync.localId) { return }

            var currentView = x3dExtensions.getView(showcase.sync.x3dRoot.runtime)
            currentView.peerId = showcase.sync.localId
            showcase.sync.y.share.showcase.set('view_matrix', currentView)
        }
        
        $('#viewport').on(
                'viewpointChanged'
                , showcase.sync.intervalBarrier(showcase.sync.localViewChanged, showcase.sync.sendInterval)
        )

        showcase.sync.viewarea = showcase.sync.x3dRoot.runtime.canvas.doc._viewarea
        var viewarea = showcase.sync.viewarea

        var setViewareaHook = function (functionName, peerId) {
            var oldFunc = viewarea[functionName]
            viewarea[functionName] = function () {
                showcase.sync.chairmanId = peerId
                return oldFunc.apply(viewarea, arguments)
            }
        }

        // hooks for observing chairmanship
        setViewareaHook('animateTo', showcase.sync.localId)
        setViewareaHook('onDrag', showcase.sync.localId)
        setViewareaHook('onMoveView', showcase.sync.localId)
    })
    
    
    
    //////// lecturer-mode sync
    
    showcase.sync.onYLoad.push(function () {
        // lecturer-mode: local → remote
        var subscription = showcase.sync.switchableSubscription( 
            showcase.toolbar.lecturerModeViewModel.modeEnabled, 
            function (newValue) {
                var yObj = {
                    peerId : showcase.sync.localId,
                    modeEnabled : showcase.toolbar.lecturerModeViewModel.modeEnabled()
                }
                showcase.sync.y.share.showcase.set('lecturer_mode', yObj)
            } )

        // lecturer-mode: remote → local
        showcase.sync.y.share.showcase.observePath(['lecturer_mode'], function (events) {
            var yObj = showcase.sync.y.share.showcase.get('lecturer_mode')
            if (yObj) {
                // avoid echo
                subscription.turnOff()
                // change value
                showcase.toolbar.lecturerModeViewModel.modeEnabled( yObj.modeEnabled )
                subscription.turnOn()
            }
        })
    })
    
    
    
    //////// viewMode sync
    
    /*	showcase.sync.y.share.showcase.observePath(['view_mode'], function (events) {
            showcase.toolbar.setViewMode(y.get('view_mode'))
        })
    */
    //  data.viewMode = showcase.toolbar.getViewMode();
    
    
    
    //////// selected model sync
    
    showcase.sync.onYLoad.push(function () {
        // selected model: local → remote
        var subscription = showcase.sync.switchableSubscription( 
            showcase.toolbar.modelId, 
            function (newValue) {
                if (!showcase.toolbar.isSynchronized()) { return }
                if (showcase.toolbar.lecturerModeViewModel.modeEnabled() && !showcase.toolbar.lecturerModeViewModel.isLecturer()) { return }
                showcase.sync.y.share.showcase.set('selected_model', newValue) 
            })

        // selected model: remote → local
        showcase.sync.remoteSelectedModelChange = function (events) {
                if (!showcase.toolbar.isSynchronized()) { return }

                var remoteModel = showcase.sync.y.share.showcase.get('selected_model')
                // undefined value
                if (!remoteModel) { return }
                // model already selected
                if (showcase.toolbar.modelId() == remoteModel) { return }

                subscription.turnOff()
                showcase.toolbar.modelId(remoteModel)
                subscription.turnOn()
                /* changing fragment?
                var params = new URI().query(true)
                params.id = remoteModel
                url.query(params)
                window.location.assign(url.href())
                */
            }
        showcase.sync.y.share.showcase.observePath(['selected_model'], showcase.sync.remoteSelectedModelChange)
    })
}

if(true || tools.isInRole()) {
    showcase.sync.init()
}




/**
 * Makes sure lecturer mode is released before leaving room.
 *
window.onbeforeunload = function(){
   Release lecturer mode when leaving.
  if(showcase.sync.lecturerMode) {
    toggleLecturerMode();
    sleep(2000);
  }
}
*/



//////////////// utility functions



/*
    utility function, similar to Knockout.js' rate-limiter (http://knockoutjs.com/documentation/rateLimit-observable.html)
    Here is an exaple sequence diagram:
    
    e←event                          e  e      e         e     e   e                              e
    [                ]←interval      [                ][                 ][                ]      [               ]
    ✓←passfunction()                 ✓  ✗      ✗-----✓  ✗     ✗  ✗-----✓                        ✓
*/
showcase.sync.intervalBarrier = function (passFunction, interval) {
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

/*
    utility-function to prevent subscription from echoing
    case is given when subscription changes the ViewModel's value
*/
showcase.sync.switchableSubscription = function (observable, func) {
    return {
        observable: observable,
        subscription: observable.subscribe(func),
        turnOff: function () {
            // "subscription.isDisposed = true/false" is easier, but "isDisposed" is obfuscated (called "R" when I tested)
            this.subscription.dispose()
        },
        turnOn: function () {
            // reassign subscription
            this.subscription = this.observable.subscribe( func )
        }
    }
}