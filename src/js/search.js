/**
 * Sends an AJAX request to the server to get the models which match the search
 * string
 * Used in menu.php
 * @param  {string} str Search string entered by the user
 */
function showModels(str) {
  // Find out which page we are visiting to display the models correctly
  var type = (window.location.pathname.indexOf("editcourse.php") != -1) ? "modelselection" : "models";

  ajax.post("../php/getmodels.php", {q: str, type: type}, function(response) {
    document.getElementById("result-container").innerHTML = response;
    if(type === "modelselection") { addSelectListener(); }

    // If we are inside ROLE, change the list items to open in separate widget
    // getQueryString doesn't work here somehow
    if(window.location.search.substring(1) === "widget=true") {initOverviewWidget();}
  });

}