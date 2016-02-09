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
tools.urlForSpace = function (spaceName) {
    return tools.ROLE_SANDBOX_SPACES + spaceName
}

// Adds a click listener to create-room-btn
tools.addCreateCourseRoomListener = function() {
  
  $("#create-room-btn").on("click", function() {
  
    var courseRoom = $("#targetRole").val();
    
    // Open the URL given in the "targetRole" input field in a new tab
    window.open(tools.ROLE_SANDBOX_SPACES + courseRoom, '_blank');
    
  });
};


tools.addCourseNameInputListener = function() {
  
  // When user leaves course name input field, automatically create a suggestion
  // for the course room name / course room URL
  $("#targetName").on("blur", function(event) {
    var courseRoom = $("#targetRole").val();
    
    // Update ROLE Space URL in course room input only if it is empty
    if (courseRoom === undefined || courseRoom === "") {
   
      var courseRoom = $("#targetName").val().toLowerCase().replace(/[^a-z0-9]+/g, "")
      
      // Update the course room input field
      $("#targetRole").val( courseRoom )
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
