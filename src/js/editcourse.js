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
 * @file editcourse.js
 * Showing models to add to course in a overlay window
 */

var editCourse = {}
editCourse.selectedModels = {}
editCourse.courseId = new URI().query(true).id   // the edited course's id

/**
 * Closes the pop-up
 */
editCourse.endBlackout = function() {
  var list = document.getElementsByClassName("img-responsive");
  for(var i=0;i<list.length;i++) {
    list[i].removeEventListener("click", editCourse.toggleSelectModel);
  }
  editCourse.selectedModels = {};
  
  $("#blackout").css('display', 'none');
  $("#modelbox").css('display', 'none');

  // Reset width and put box in the center of the window 
  $("#modelbox").css('width', 0);
  $("#modelbox").css('left', "50%");

  // Reset content of search field
  $("#search").val("");
}

/**
 * Starts the pop-up
 */
editCourse.startBlackout = function() {
  $("#blackout").css('display', "block");
  editCourse.getModels();
}

/**
 * Sends an AJAX request to the server to get the models of the course
 */
editCourse.getModels = function(callback) {
  // Send request with data to run the script on the server 
  $.post("../php/getcoursemodels.php", {"course": editCourse.courseId}, 
    function getModelsCallback(response) {
        var modelbox = $("#modelbox");
        modelbox.css('display', "block");
        editCourse.expand(modelbox[0]);

        // Display all models associated with the course
        $("#result-container").html( response )

        // Add event listener to each model
        editCourse.addSelectListener();
  });
}

/**
 * Sends an AJAX request to the server to save the models which were selected
 */
editCourse.addModels = function() {
  $.post("../php/addmodels.php", {"course": editCourse.courseId, "models": JSON.stringify(editCourse.selectedModels)},
    function(response) {
        // Display all models associated with the course
        $("#model_table").html( response )
        // Add event listener to each model
        editCourse.addDeleteListener();
        editCourse.endBlackout();
      }
  );
}

/**
 * Sends an AJAX request to the server to delete the model which was clicked
 * from the course
 */
editCourse.deleteModel = function(event) {
  $.post("../php/deletemodel.php", {"course": editCourse.courseId, "model": event.target.id},
    function(response) {
        // Display all models associated with the course
        $("#model_table").html( response )
        // Add event listener to each model
        editCourse.addDeleteListener();
      }
  );
}

$(document).ready(function(){
  
  tools.addCourseNameInputListener();
  tools.addCreateCourseRoomListener();
  
  // Sets the remove icons to trigger the deletion on click
  editCourse.addDeleteListener();
});

/**
 * Adds the event listener deleteModel to each displayed model
 */
editCourse.addDeleteListener = function() {
  var list = document.getElementsByClassName("delete");
  for(var i=0;i<list.length;i++) {
    list[i].addEventListener("click", editCourse.deleteModel);
  }
}

/**
 * Adds the event listener toggleSelectModel to each displayed model
 */
editCourse.addSelectListener = function () {
  var list = document.getElementsByClassName("text-content");
  for(var i=0;i<list.length;i++) {
      list[i].addEventListener("click", editCourse.toggleSelectModel);
  }
}
/**
 * Animates the pop-up: starts in the center with full height and expands
 * horizontally to 80% screen width
 * @param  {DOM object} element The element to expand
 */
editCourse.expand = function (element) {
  var pxPerStep = 50;
  var width = element.offsetWidth;
  var left = element.offsetLeft;
  var windowWidth = window.innerWidth;
  element = $(element)
  
  // Trigger every 10 ms
  var loopTimer = setInterval(function() {
    // We want a width of 80% of the screen
    if(width+pxPerStep < 0.8*windowWidth){
        // Expand pop-up to the right and move it to the left at the same time
        width += pxPerStep;
        left -= pxPerStep/2
        element.css('width', width)
        element.css('left', left);
    } else {
        // We reached (almost) the desired width, now add the difference
        var diff = 0.8*windowWidth-width;
        element.css('width', width+diff);
        element.css('left', left-diff/2)
        clearInterval(loopTimer);
    }
  },10);
}

/**
 * Selects the clicked element or removes it from the list
 * @param  {event} event The click event
 */
editCourse.toggleSelectModel = function (event) {
  var element = event.target.parentElement.previousElementSibling;
  // The link has an id of the form image-over<db_id>. This will extract the database id.
  var id = element.id.substr(10);

  // Look if the clicked element is already selected
  if(editCourse.selectedModels[id]) {
    delete editCourse.selectedModels[id];

    // Remove highlight
    var index = (' ' + element.className + ' ').indexOf('highlight-model ');
    element.className = element.className.substr(0,index-1);
  } else { 
    editCourse.selectedModels[id] = id; 

    // Highlight model
    element.className += 'highlight-model'; 
  }
}
