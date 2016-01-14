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
 * Requires: showcase-annotations.js
 *   annotations.js
 */

showcase.toolbar = {};

showcase.toolbar.showInfo = false
showcase.toolbar.showHelp = false
// True, if a user is in the 'set an annotation position marker' mode (which is 
// started by pressing the 'Annotate' button once)
showcase.toolbar.annotate = false
showcase.toolbar.isSynchronized = ko.observable(false)
showcase.toolbar.lecturerModeViewModel = {
        isLecturer : ko.observable(false),
        canEnter : ko.observable(false),
        modeEnabled : ko.observable(false)
    }
showcase.toolbar.modelId = ko.observable(URI().query(true).id)

/**
 * Add click handler when DOM loaded. Note: Due to the implementation of x3dom, 
 * adding a click event handler to an Inline element does not work in a 
 * DOMContentLoaded event handler.
 * @returns {undefined}
 */
$(document).ready(function () {

    // One way data-bindings:
    
    $('#btnAnnotate').on('click', function () {
        showcase.toolbar.toggleAnnotationMode()
    })
    $('#btnHighlight').bootstrapSwitch('state', false, true).on('switchChange.bootstrapSwitch', function () {
        showcase.highlighter.toggleHighlighting();
    })
    $('#btnInfo').bootstrapSwitch('state', false, true).on('switchChange.bootstrapSwitch', function () {
        showcase.toolbar.showInfo = !showcase.toolbar.showInfo;
        // optionally synchronize	
        $('#metadata_overlay').css('display', showcase.toolbar.showInfo ? 'block' : 'none')
        $('#viewer_object')[0].runtime.statistics(showcase.toolbar.showInfo)
    })
    $('#btnHelp').bootstrapSwitch('state', false, true).on('switchChange.bootstrapSwitch', function () {
        showcase.toolbar.showHelp = !showcase.toolbar.showHelp
        $('#mainNav').css('display', showcase.toolbar.showHelp ? 'block' : 'none')
    })
    $('#btnSynchronize').bootstrapSwitch('state', showcase.toolbar.isSynchronized(), true).on('switchChange.bootstrapSwitch', function () {
        showcase.toolbar.isSynchronized( ! showcase.toolbar.isSynchronized() )
    })
    $('#btnResetview').on('click', function () {
        $('#viewer_object')[0].runtime.showAll()
    })
    showcase.toolbar.modelId.subscribe( function(newValue) {
        
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
    ko.applyBindings(showcase.toolbar.lecturerModeViewModel, $('#btnLecturer')[0])
    
    // model-selection
    showcase.toolbar.modelId.subscribe( function(newValue) {
        showcase.setNewModel(newValue)
        if (tools.isInRole()) {
            // update gallery-widget
            window.parent.postMessage({command: 'selectModel', modelId: newValue}, '*')
        }
    })
    if (tools.isInRole()) {
        // gallery-widget selected new model
        window.addEventListener('message', function (msg) {
            if (msg.data.command == 'selectModel') {
                showcase.toolbar.modelId(msg.data.modelId)
            }
        }, false)
    }
    
    showcase.addEventListener('load', function () {
        
        // init annotations, should go to other file
        $('#x3dInline').on('click', function (event) {
            if (showcase.toolbar.annotate) {
                var pos = new x3dom.fields.SFVec3f(event.worldX, event.worldY, event.worldZ);
                var norm = new x3dom.fields.SFVec3f(event.normalX, event.normalY, event.normalZ);

                showcase.annotater.createAnnotation(pos, norm);

                showcase.toolbar.toggleAnnotationMode(true);
            }
        });

        // Set view to see whole model before rendering it the first time
        x3dExtensions.normalizeCamera($('#viewer_object')[0].runtime);
    })
})

showcase.toolbar.toggleAnnotationMode = function (newVal) {
    showcase.toolbar.annotate = (newVal != null) ? newVal : !showcase.toolbar.annotate
    if (showcase.toolbar.annotate) {
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
showcase.toolbar.x3dChangeView = function () {
    $('#navType').val("type", $('#viewModeSelect option:selected').val())
}

showcase.toolbar.getViewMode = function () { return $('#viewModeSelect option:selected').val() }

showcase.toolbar.setViewMode = function(mode) {
    $('#viewModeSelect').val(mode)
    $('#navType').val(mode)
}