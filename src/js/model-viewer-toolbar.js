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
 * @file toolbar.js
 * Provides event handler for click events of all toolbar buttons
 * Also initializes toolbar elements if needed
 * 
 * Requires: model-viewer.js
 *   annotations.js
 */

var viewerToolbar = {};

viewerToolbar.showInfo = false
viewerToolbar.showHelp = false
// True, if a user is in the 'set an annotation position marker' mode (which is 
// started by pressing the 'Annotate' button once)
viewerToolbar.annotate = false
viewerToolbar.isSynchronized = ko.observable(false)
viewerToolbar.lecturerModeViewModel = {
        isLecturer : ko.observable(false),
        canEnter : ko.observable(false),
        modeEnabled : ko.observable(false)
    }
viewerToolbar.modelId = ko.observable(URI().query(true).id)

/**
 * Add click handler when DOM loaded. Note: Due to the implementation of x3dom, 
 * adding a click event handler to an Inline element does not work in a 
 * DOMContentLoaded event handler.
 * @returns {undefined}
 */
$(document).ready(function () {

    // One way data-bindings:
    
    $('#btnAnnotate').on('click', function () {
        viewerToolbar.toggleAnnotationMode()
    })
    $('#btnHighlight').bootstrapSwitch('state', false, true).on('switchChange.bootstrapSwitch', function () {
        modelHighlighter.toggleHighlighting();
    })
    $('#btnInfo').bootstrapSwitch('state', false, true).on('switchChange.bootstrapSwitch', function () {
        viewerToolbar.showInfo = !viewerToolbar.showInfo;
        // optionally synchronize	
        $('#metadata_overlay').css('display', viewerToolbar.showInfo ? 'block' : 'none')
        $('#viewer_object')[0].runtime.statistics(viewerToolbar.showInfo)
    })
    $('#btnHelp').bootstrapSwitch('state', false, true).on('switchChange.bootstrapSwitch', function () {
        viewerToolbar.showHelp = !viewerToolbar.showHelp
        $('#mainNav').css('display', viewerToolbar.showHelp ? 'block' : 'none')
    })
    $('#btnSynchronize').bootstrapSwitch('state', viewerToolbar.isSynchronized(), true).on('switchChange.bootstrapSwitch', function () {
        viewerToolbar.isSynchronized( ! viewerToolbar.isSynchronized() )
    })
    $('#btnResetview').on('click', function () {
        document.getElementById('viewer_object').runtime.showAll()
    })
    viewerToolbar.modelId.subscribe( function(newValue) {
        
    })
    
    // Two way data-bindings :

    // lecturer-mode
    ko.bindingHandlers.lecturerMode = {
        init: function(element, valueAccessor) {
                $(element)
                    .bootstrapSwitch('state', false, true)
                    .bootstrapSwitch('readonly', !valueAccessor().canEnter())
                    .on('switchChange.bootstrapSwitch', function () {
                        valueAccessor().modeEnabled( ! valueAccessor().modeEnabled() )
                    })     
        },
        update: function(element, valueAccessor) {
            // make state writable:
            $(element).bootstrapSwitch('readonly', false)
    
            $(element).bootstrapSwitch('state', valueAccessor().modeEnabled(), true)
            $(element).bootstrapSwitch('readonly', ! valueAccessor().canEnter())
        }
    }
    $('#btnLecturer').attr('data-bind', "lecturerMode: $root")
    ko.applyBindings(viewerToolbar.lecturerModeViewModel, $('#btnLecturer')[0])
    
    // model-selection
    viewerToolbar.modelId.subscribe( function(newValue) {
        modelViewer.setNewModel(newValue)
        if (tools.isInRole()) {
            // update gallery-widget
            window.parent.postMessage({command: 'selectModel', modelId: newValue}, '*')
        }
    })
    if (tools.isInRole()) {
        // gallery-widget selected new model
        window.addEventListener('message', function (msg) {
            if (msg.data.command == 'selectModel') {
                viewerToolbar.modelId(msg.data.modelId)
            }
        }, false)
    }
    
    console.log('mytag adding listener')
    modelViewer.addEventListener('load', function () {
        
        // init annotations, should go to other file
        document.getElementById('x3dInline').addEventListener('click', function (event) {
            if (viewerToolbar.annotate) {
                var pos = new x3dom.fields.SFVec3f(event.worldX, event.worldY, event.worldZ);
                var norm = new x3dom.fields.SFVec3f(event.normalX, event.normalY, event.normalZ);

                modelViewer.createAnnotation(pos, norm);

                viewerToolbar.toggleAnnotationMode(true);
            }
        });

        // Set view to see whole model before rendering it the first time
        x3dExtensions.normalizeCamera($('#viewer_object')[0].runtime);
    })
})

viewerToolbar.toggleAnnotationMode = function (newVal) {
    viewerToolbar = (newVal != null) ? newVal : !viewerToolbar.annotate
    if (viewerToolbar.annotate) {
        $('#btnAnnotate').addClass('active');
        $('.x3dom-canvas').css('cursor', 'crosshair');
    } else {
        $('#btnAnnotate').removeClass('active');
        $('.x3dom-canvas').css('cursor', 'auto');
    }
}

/**
 * Updates navigation mode in X3Dom to match the one selected in combo box in toolbar
 */
function x3dChangeView() {
    var select = document.getElementById('viewModeSelect');
    document.getElementById('navType').setAttribute("type", select.options[select.selectedIndex].value);
}

function getViewMode() {
    var select = document.getElementById('viewModeSelect');
    return select.options[select.selectedIndex].value;
}

function setViewMode(mode) {
    document.getElementById('navType').setAttribute(mode);
}