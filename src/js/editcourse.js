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

var selectedModels = {};
var course = QueryString.id;            // the edited course's id

/**
 * Closes the pop-up
 */
function endBlackout() {
  var list = document.getElementsByClassName("img-responsive");
  for(var i=0;i<list.length;i++) {
    list[i].removeEventListener("click", toggleSelectModel);
  }
  selectedModels = {};
  
  document.getElementById("blackout").style.display = "none";
  document.getElementById("modelbox").style.display = "none";

  // Reset width and put box in the center of the window 
  document.getElementById("modelbox").style.width = 0;
  document.getElementById("modelbox").style.left = "50%";

  // Reset content of search field
  document.getElementById("search").value = "";
}

/**
 * Starts the pop-up
 */
function startBlackout() {
  document.getElementById("blackout").style.display = "block";
  getModels();
}

/**
 * Sends an AJAX request to the server to get the models of the course
 */
function getModels(callback) {
  // Send request with data to run the script on the server 
  ajax.post("../php/getcoursemodels.php", {"course": course}, 
    function getModelsCallback(response) {
        var modelbox = document.getElementById("modelbox");
        modelbox.style.display = "block";
        expand(modelbox);

        // Display all models associated with the course
        document.getElementById("result-container").innerHTML = response;

        // Add event listener to each model
        addSelectListener();
  });
}

/**
 * Sends an AJAX request to the server to save the models which were selected
 */
function addModels() {
  ajax.post("../php/addmodels.php", {"course": course, "models": JSON.stringify(selectedModels)},
    function(response) {
        // Display all models associated with the course
        document.getElementById("model_table").innerHTML = response;
        // Add event listener to each model
        addDeleteListener();
        endBlackout();
      }
  );
}

/**
 * Sends an AJAX request to the server to delete the model which was clicked
 * from the course
 */
function deleteModel(event) {
  ajax.post("../php/deletemodel.php", {"course": course, "model": event.target.id},
    function(response) {
        // Display all models associated with the course
        document.getElementById("model_table").innerHTML = response;
        // Add event listener to each model
        addDeleteListener();
      }
  );
}

// Sets the remove icons to trigger the deletion on click
document.addEventListener("DOMContentLoaded", function(){
  addDeleteListener();
  
  var courseNameInput = document.getElementById("targetName");
  
  // When user leaves course name input field, automatically create a suggestion
  // for the course room name / course room URL
  courseNameInput.addEventListener("blur", function(event) {
    
    var courseRoomInput = document.getElementById("targetRole");
    
    var courseRoom = courseRoomInput.value;
    
    // Update ROLE Space URL in course room input only if it is empty
    if (courseRoom === undefined || courseRoom === "") {
   
      var courseRoom = tools.getCourseRoomURL(courseNameInput.value);
      
      // Update the course room input field
      courseRoomInput.value = courseRoom;
    }
  });
});

/**
 * Adds the event listener deleteModel to each displayed model
 */
function addDeleteListener() {
  var list = document.getElementsByClassName("delete");
  for(var i=0;i<list.length;i++) {
    list[i].addEventListener("click", deleteModel);
  }
}

/**
 * Adds the event listener toggleSelectModel to each displayed model
 */
function addSelectListener() {
  var list = document.getElementsByClassName("text-content");
  for(var i=0;i<list.length;i++) {
      list[i].addEventListener("click", toggleSelectModel);
  }
}
/**
 * Animates the pop-up: starts in the center with full height and expands
 * horizontally to 80% screen width
 * @param  {DOM object} element The element to expand
 */
function expand(element) {
  var pxPerStep = 50;
  var width = element.offsetWidth;
  var left = element.offsetLeft;
  var windowWidth = window.innerWidth;
  
  // Trigger every 10 ms
  var loopTimer = setInterval(function() {
    // We want a width of 80% of the screen
    if(width+pxPerStep < 0.8*windowWidth){
        // Expand pop-up to the right and move it to the left at the same time
        width += pxPerStep;
        left -= pxPerStep/2
        element.style.width = width+"px";
        element.style.left = left+"px";
    } else {
        // We reached (almost) the desired width, now add the difference
        var diff = 0.8*windowWidth-width;
        element.style.width = width+diff+"px";
        element.style.left = left-diff/2+"px";
        clearInterval(loopTimer);
    }
  },10);
}

/**
 * Selects the clicked element or removes it from the list
 * @param  {event} event The click event
 */
function toggleSelectModel(event) {
  var element = event.target.parentElement.previousElementSibling;
  // The link has an id of the form image-over<db_id>. This will extract the database id.
  var id = element.id.substr(10);

  // Look if the clicked element is already selected
  if(selectedModels[id]) {
    delete selectedModels[id];

    // Remove highlight
    var index = (' ' + element.className + ' ').indexOf('highlight-model ');
    element.className = element.className.substr(0,index-1);
  } else { 
    selectedModels[id] = id; 

    // Highlight model
    element.className += 'highlight-model'; 
  }
}
