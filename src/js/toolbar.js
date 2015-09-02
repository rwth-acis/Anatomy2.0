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
 */

var viewerToolbar = {};

viewerToolbar.showInfo = false;
// True, if a user is in the 'set an annotation position marker' mode (which is 
// started by pressing the 'Annotate' button once)
viewerToolbar.annotate = false;

/**
 * Button handler for the 'Annotate' button. Will switch viewer control to 
 * annotation mode. The button indicates the current mode to the user with 
 * bootstraps 'active' class.
 */
viewerToolbar.onAnnotateClick = function() {
  var btnAnnotate = $('#btnAnnotate');
          
  if (btnAnnotate.hasClass('active')) {
    btnAnnotate.removeClass('active');
    viewerToolbar.annotate = false;
  }
  else {
    btnAnnotate.addClass('active');
    viewerToolbar.annotate = true;
  }
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
    // Code taken from http://examples.x3dom.org/v-must/ (Download the zip file and check main.js)
    // Will show a cone marking the position where a user clicked on the model
    // show 3d marker at pick position
    var pos = new x3dom.fields.SFVec3f(event.worldX, event.worldY, event.worldZ);
    var norm = new x3dom.fields.SFVec3f(event.normalX, event.normalY, event.normalZ);
    
    // rotate such that cone points to click point
    var qDir = x3dom.fields.Quaternion.rotateFromTo(new x3dom.fields.SFVec3f(0, -1, 0), norm);
    var rot = qDir.toAxisAngle();
    var pos = pos.addScaled(norm, 9.5);  // since length is 10...
    
    var t = document.createElement('Transform');
    t.setAttribute("scale", "3 10 3" );
    t.setAttribute('rotation', rot[0].x+' '+rot[0].y+' '+rot[0].z+' '+rot[1]);
    t.setAttribute('translation', pos.x+' '+pos.y+' '+pos.z);
    
    var s = document.createElement('Shape');
    t.appendChild(s);
    var b = document.createElement('Cone');
    s.appendChild(b);
    var a = document.createElement('Appearance');
    var m = document.createElement('Material');
    m.setAttribute("diffuseColor", "1 0 0");
    m.setAttribute("transparency", "0.5");
    a.appendChild(m);
    s.appendChild(a);

    var ot = document.getElementById('scene');
    ot.appendChild(t);
    // End code taken from http://examples.x3dom.org/v-must/ 
  }
};

/**
 * Handler for when the scene is loaded. Will move the camera to show the full 
 * model. Requires x3d-extensions.js
 * @returns {undefined}
 */
viewerToolbar.onModelLoaded = function() {
  x3dRoot     = document.getElementById('viewer_object');
  // Normalize scene camera to view all content.
  normalizeCamera(x3dRoot.runtime);
};

/**
 * Add click handler when DOM loaded. Note: Due to the implementation of x3dom, 
 * adding a click event handler to an Inline element does not work in a 
 * DOMContentLoaded event handler.
 * @returns {undefined}
 */
document.onload = function() {
  document.getElementById('btnAnnotate').addEventListener('click', viewerToolbar.onAnnotateClick);
  // Note: Due to the implementation of x3dom, adding the following click event 
  // handler to an Inline element does not work in
  //  document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('x3dInline').addEventListener('click', viewerToolbar.onModelClick);
};

/**
 * Initialize the combo box for navigation modes in toolbar
 * Subscribes for "ShowInfo" event
 */
function initToolbar() {
  //document.getElementById('optionExamine').setAttribute("selected", "selected");
  
  // Subscribe for "ShowInfo" messages in ROLE 
  if (isInRole()) {
    subscribeIWC("ShowInfo", receiveShowInfo);
  }
}
/// Call initialize for navigation mode when DOM loaded
document.addEventListener('DOMContentLoaded', initToolbar, false);

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

/**
 * Initializes the copy to clipboard functionality
 */
// TODO: Decide whether to remove. Functionality brings little benefit and does not work properly.
/*function initCopy() {
  // ZeroClipboard needs to know where it can find the ".swf" file (flash movie)
  ZeroClipboard.config( { swfPath: '../swf/ZeroClipboard.swf' } );
  // Create client instance and attach copy event to it
  var client = new ZeroClipboard();
  client.on( "copy", function (event) {
    var clipboard = event.clipboardData;
    var url = window.location.href;
    url = url.replace("&widget=true", "&widget=false");
    url = url.replace("?widget=true", "?widget=false");
    clipboard.setData( "text/plain", url);
  });
  // Glue button to client. The copy event is fired when button is clicked
  client.clip( document.getElementById("btnCopy") );
}
document.addEventListener("DOMContentLoaded", initCopy, false);*/

/**
 * Stops or starts synchronization with the other viewer widget(s) respectively
 * Enables/disables synchronization of the widget with others
 */
function x3dSynchronize() {
  var btn = document.getElementById('btnSynchronize');
  if (isSynchronized) {
    btn.innerHTML ="Synchronize";
    // TODO: Check whether "savePositionAndOrientation() call has to be removed
    savePositionAndOrientation();
    saveInfoState();
  }
  else {
    btn.innerHTML ="Unsynchronize";
    synchronizePositionAndOrientation();
    synchronizeInfoState();
  }
  isSynchronized = !isSynchronized;
}

/**
 * Attached to "btnInfo" (Show info / Hide info)
 * Informs other viewer to show or hide info - if synchronized - and also does 
 * so locally
 */
function btnShowInfo() {
  // Button always toggles state
  viewerToolbar.showInfo = !viewerToolbar.showInfo;
  // Synchronize showing info if in ROLE and Synchronization is turned on
  if (isInRole() && isSynchronized) {
    var msgContent = {'show': viewerToolbar.showInfo};
    publishIWC("ShowInfo", msgContent);
    console.log("toolbar.js: publishIWC 'ShowInfo'");
  }
  // Actually show the info overlays
  showInfo(viewerToolbar.showInfo);
}

/**
 * Receiver function for "ShowInfo" event in ROLE IWC
 * @param msg Message containing 'show' property, which tells whether to show (true) or hide (false) info boxes
 */
function receiveShowInfo(msg) {
  // Shows/hides info only if the viewer widget is synchronized with others and 
  // saves the state otherwise
  if(isSynchronized) {
    showInfo(msg.show);
  } else {
    displayInfo = msg.show;
  }
}

/**
 * Will turn the statistics view on and off based on parameter
 * Will turn the metadata_overlay on and off accordingly
 * @param show True, if data is to be shown. False, otherwise
 */
function showInfo(show) {
  var x3dom = document.getElementById('viewer_object');
  var btn = document.getElementById('btnInfo');
  var metadata_overlay = document.getElementById('metadata_overlay');
  if (show) {
    x3dom.runtime.statistics(true);
    btn.innerHTML = "Hide info";
    metadata_overlay.style.display = "block";
  }
  else {
    x3dom.runtime.statistics(false);
    btn.innerHTML = "Show info";
    metadata_overlay.style.display = "none";
  }
}

/**
 * Saves the state of the statistics view, i.e. proves whether the 
 * metadata_overlay is switched on or off
 */
function saveInfoState() {
  var metadata_overlay = document.getElementById('metadata_overlay');
  displayInfo = (metadata_overlay.style.display === "block");
}

/**
 * Re-synchronize with last state of statistics view sent from other widgets
 */
function synchronizeInfoState() {
  showInfo(displayInfo);
  displayInfo = undefined;
}

/**
 * 
 * @returns {undefined}
 */
function showHelp() {
  var btn = document.getElementById('btnHelp');
  var mainNav = document.getElementById('mainNav');
  if (btn.innerHTML === "Show help") {
    mainNav.style.display = "block";
    btn.innerHTML = "Hide help";
  }
  else {
    mainNav.style.display = "none";
    btn.innerHTML = "Show help";
  }
}
