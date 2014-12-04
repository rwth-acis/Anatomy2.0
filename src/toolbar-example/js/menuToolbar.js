// This file references the "optionExamine"  DOM element. Therefore it should
// be inserted in the HTML file after the declaration of "optionExamine"

function reset() {
  document.getElementById('x3d').runtime.resetView();
}
function showAll() {
  document.getElementById('x3d').runtime.showAll();
}
function upright() {
  document.getElementById('x3d').runtime.uprightView();
}
function x3dChangeView() {
  var select = document.getElementById('viewModeSelect');
  document.getElementById('navType').setAttribute("type", select.options[select.selectedIndex].value);
}
document.getElementById('optionExamine').setAttribute("selected", "selected");