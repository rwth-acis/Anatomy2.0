/**
 * @file menuToolbar.js
 * Provides event handler for click events of all toolbar buttons
 * Also initializes toolbar elements if needed
 */

/**
 * Initialize the combo box for navigation modes in toolbar
 * Subscribes for "ShowInfo" event
 */
function initToolbar() {
  document.getElementById('optionExamine').setAttribute("selected", "selected");
  
  // Subscribe for "ShowInfo" messages in ROLE 
  if (isInRole) {
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

/**
 * Initializes the copy to clipboard functionality
 */
function initCopy() {
  // ZeroClipboard needs to know where it can find the ".swf" file (flash movie)
  ZeroClipboard.config( { swfPath: 'http://eiche.informatik.rwth-aachen.de/henm1415g2/src/swf/ZeroClipboard.swf' } );
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
document.addEventListener("DOMContentLoaded", initCopy, false);

/**
 * Stops or starts synchronization with the other viewer widget(s) respectively
 * Enables/disables synchronization of the widget with others
 */
function x3dSynchronize() {
  var btn = document.getElementById('btnSynchronize');
  if (isSynchronized) {
    btn.innerHTML ="Synchronize";
    savePositionAndOrientation();
  }
  else {
    btn.innerHTML ="Unsynchronize";
    synchronizePositionAndOrientation();
  }
  isSynchronized = !isSynchronized;
}

/**
 * Gets the URL parameter value for a given name
 *@param name Name of a URL parameter
 */
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

/**
 * @return true, if the page is a widget in ROLE. false, otherwise
 */
function isInRole() {
  return getURLParameter("widget") === "true";
}

/**
 * Attached to "btnInfo" (Show info / Hide info)
 * Informs other viewer to show or hide info and also does so locally
 */
function btnShowInfo() {
  var show = document.getElementById('btnInfo').innerHTML === "Show info";
  if (isInRole()) {
    var msgContent = {'show': show};
    publishIWC("ShowInfo", msgContent);
    console.log("menuToolbar.js: publishIWC 'ShowInfo'");
  }
  showInfo(show);
}

/**
 * Receiver function for "ShowInfo" event in ROLE IWC
 * @param msg Message containing 'show' property, which tells whether to show (true) or hide (false) info boxes
 */
function receiveShowInfo(msg) {
  showInfo(msg.show);
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
