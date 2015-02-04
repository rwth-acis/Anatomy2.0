/**
 * Sends an AJAX request to the server to get the models which match the search
 * string
 * Used in menu.php
 * @param  {string} str Search string entered by the user
 */
// Save the selected model's id if one exists, -1 otherwise (ids start with image-over)
var selectedModel = -1;

function showModels(str) {
  // Find out which page we are visiting to display the models correctly
  var type = (window.location.pathname.indexOf("editcourse.php") != -1) ? "modelselection" : "model";

  // Update selected model id
  var element = document.getElementsByClassName("highlight-model")[0];
  selectedModel = element ? element.id : selectedModel;

  ajax.post("../php/getmodels.php", {q: str, type: type}, function(response) {
    document.getElementById("result-container").innerHTML = response;
    if(type === "modelselection") { addSelectListener(); }

    // If we are inside ROLE, change the list items to open in separate widget
    // getQueryString doesn't work here somehow, chop off "&"
    if(window.location.search.substring(1) === "widget=true") {
        initOverviewWidget();
        // Apply highlighting
        element = document.getElementById(selectedModel);
        if(element) { element.className += 'highlight-model' };
    } else {
        // Highlight previously selected models
        for(var item in selectedModels) {
            element = $("#result-container #image-over"+item)[0];
            if(element) {element.className += 'highlight-model';};
        }
    }
  });

}