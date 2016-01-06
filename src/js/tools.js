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
 * @file tools.js
 * File for some java script helper functions that are generally useful
 */

var tools = {};

// URL to ROLE sandbox spaces
tools.ROLE_SANDBOX_SPACES = "http://role-sandbox.eu/spaces/";

// Adds a click listener to create-room-btn
tools.addCreateCourseRoomListener = function() {
  
  document.getElementById("create-room-btn").addEventListener("click", function() {
  
    var courseRoom = document.getElementById("targetRole").value;
    
    // Open the URL given in the "targetRole" input field in a new tab
    window.open(tools.ROLE_SANDBOX_SPACES + courseRoom, '_blank');
    
  });
};


tools.addCourseNameInputListener = function() {
  
  // When user leaves course name input field, automatically create a suggestion
  // for the course room name / course room URL
  document.getElementById("targetName").addEventListener("blur", function(event) {
    
    var courseRoomInput = document.getElementById("targetRole");
    
    var courseRoom = courseRoomInput.value;
    
    // Update ROLE Space URL in course room input only if it is empty
    if (courseRoom === undefined || courseRoom === "") {
   
      var courseRoom = tools.getCourseRoomName(document.getElementById("targetName").value);
      
      // Update the course room input field
      courseRoomInput.value = courseRoom;
    }
  });
};

/**
 * Used in toolbar.js
 * @return true, if the page is a widget in ROLE. false, otherwise
 */
tools.isInRole = function () {
  return URI().query(true).widget === "true";
}
