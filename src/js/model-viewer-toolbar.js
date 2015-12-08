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

viewerToolbar.showInfo = false;
viewerToolbar.showHelp = false;
// True, if a user is in the 'set an annotation position marker' mode (which is 
// started by pressing the 'Annotate' button once)
viewerToolbar.annotate = false;

viewerToolbar.toggleAnnotationMode = function(toOff) {
  var btnAnnotate = $('#btnAnnotate');
          
  if (toOff) {
    btnAnnotate.removeClass('active');
    viewerToolbar.annotate = false;
    $('.x3dom-canvas').css('cursor','auto');
  }
  else {
    btnAnnotate.addClass('active');
    viewerToolbar.annotate = true;
    $('.x3dom-canvas').css('cursor','crosshair');
  }
};

/**
 * Button handler for the 'Annotate' button. Will switch viewer control to 
 * annotation mode. The button indicates the current mode to the user with 
 * bootstraps 'active' class.
 */
viewerToolbar.onAnnotateClick = function() {
  viewerToolbar.toggleAnnotationMode(viewerToolbar.annotate);
};

/**
 * Click handler. Fired when the user clicks inside the x3dom viewer. The handler
 * will be attached to the Inline element.
 * @param {type} event Information about where the user clicked in the 3D scene
 * @returns {undefined}
 */
viewerToolbar.onModelClick = function(event) {
  // The handler will set an annotation position marker if and only if the user 
  // activated the annotation mode by clicking the 'Annotate' button
  if (viewerToolbar.annotate) {
    var pos = new x3dom.fields.SFVec3f(event.worldX, event.worldY, event.worldZ);
    var norm = new x3dom.fields.SFVec3f(event.normalX, event.normalY, event.normalZ);
    
    modelViewer.createAnnotation(pos, norm);

    viewerToolbar.toggleAnnotationMode(true); 
  }
};

/**
 * Handler for when the scene is loaded. Will move the camera to show the full 
 * model. Requires x3d-extensions.js
 * @returns {undefined}
 */
viewerToolbar.onModelLoaded = function() {
  // Normalize scene camera to view all content.
  x3dExtensions.normalizeCamera($('#viewer_object')[0].runtime);
};

/**
 * Add click handler when DOM loaded. Note: Due to the implementation of x3dom, 
 * adding a click event handler to an Inline element does not work in a 
 * DOMContentLoaded event handler.
 * @returns {undefined}
 */
document.onload = function() {
	$('#btnAnnotate').on('click', viewerToolbar.onAnnotateClick);
	$('#btnHighlight').bootstrapSwitch('state', false, true).on('switchChange.bootstrapSwitch', function() {
			modelHighlighter.toggleHighlighting();
	} )  
	$('#btnInfo').bootstrapSwitch('state', false, true).on('switchChange.bootstrapSwitch', function () {
	   viewerToolbar.showInfo = !viewerToolbar.showInfo;
	   // optionally synchronize	
		$('#metadata_overlay').css('display', viewerToolbar.showInfo ? 'block' : 'none')
		$('#viewer_object')[0].runtime.statistics( viewerToolbar.showInfo )	
	} )   
	$('#btnHelp').bootstrapSwitch('state', false, true).on('switchChange.bootstrapSwitch', function () {
		viewerToolbar.showHelp = !viewerToolbar.showHelp
		$('#mainNav').css('display', viewerToolbar.showHelp ? 'block' : 'none')
	} )   
	$('#btnSynchronize').bootstrapSwitch('state', true, true).on('switchChange.bootstrapSwitch', function () {
		modelViewerSync.toggleSynchronized()
	} )   
	
  // Note: Due to the implementation of x3dom, adding the following click event 
  // handler to an Inline element does not work in
  //  document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('x3dInline').addEventListener('click', viewerToolbar.onModelClick);
  
  modelViewer.addEventListener('load', viewerToolbar.onModelLoaded);
};


/**
 * Button "Show All" functionality
 */
function showAll() {
  document.getElementById('viewer_object').runtime.showAll();
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


