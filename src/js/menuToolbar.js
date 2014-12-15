// This file references the "optionExamine"  DOM element. Therefore it should
// be inserted in the HTML file after the declaration of "optionExamine"

function reset() {
  document.getElementById('viewer_object').runtime.resetView();
}
function showAll() {
  document.getElementById('viewer_object').runtime.showAll();
}
function upright() {
  document.getElementById('viewer_object').runtime.uprightView();
}
function x3dChangeView() {
  var select = document.getElementById('viewModeSelect');
  document.getElementById('navType').setAttribute("type", select.options[select.selectedIndex].value);
}
function x3dSynchronize() {
  var btn = document.getElementById('btnSynchronize');
  if (btn.innerHTML == "Synchronize") {
    btn.innerHTML ="Stop synchronize";
  }
  else {
    btn.innerHTML ="Synchronize";
  }
}
// Attached to "btnInfo" (Show info / Hide info)
// Will turn the statistics view on and off based on current status
// Will turn the metadata_overlay on and off accordingly
function showInfo() {
  var x3dom = document.getElementById('viewer_object');
  var btn = document.getElementById('btnInfo');
  var metadata_overlay = document.getElementById('metadata_overlay');
  //alert(document.getElementById('x3dom-state-viewer').style.display);
  if (btn.innerHTML == "Show info") {
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
document.getElementById('optionExamine').setAttribute("selected", "selected");