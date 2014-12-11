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
document.getElementById('optionExamine').setAttribute("selected", "selected");