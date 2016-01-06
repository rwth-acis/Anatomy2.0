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
 * @file search.js
 * Requests models from database which match an input search string.
 */
 
// Save the selected model's id if one exists, -1 otherwise (ids start with image-over)
var selectedModel = -1;

/**
 * Sends an AJAX request to the server to get the models which match the search
 * string
 * Used in menu.php
 * @param  {string} str Search string entered by the user
 */
function showModels(str) {
  // Find out which page we are visiting to display the models correctly
  var type = (window.location.pathname.indexOf("editcourse.php") != -1) ? "modelselection" : "model";

  // Update selected model id
  var element = document.getElementsByClassName("highlight-model")[0];
  selectedModel = element ? element.id : selectedModel;

  $.post("../php/getmodels.php", {q: str, type: type}, function(response) {
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
        for(var item in editCourse.selectedModels) {
            element = $("#result-container #image-over"+item)[0];
            if(element) {element.className += 'highlight-model';};
        }
    }
  });

}