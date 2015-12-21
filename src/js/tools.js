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

/**
 * Generates a ROLE space URL for a given course name
 * @param {String} courseName The name of the course
 * @returns {String} The ROLE space URL
 */
tools.getCourseRoomName = function(courseName) {
      
  // Keep only letters [a-z] of the course name and convert all upper case 
  // letters to lower case
  // Taken from http://stackoverflow.com/a/1983774
  var courseRoom = courseName.toLowerCase().replace(/[^a-z0-9]+/g, "");

  // Add the role space URL prefix to the course name
  return courseRoom;
};

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
 * Wrapper for getting the location url (necessary to test with given input data, see spyon in Jasmine)
 */
get_location = {
    /**
     * Get the url string
     * @return url as string
     */
    search: function(){
	return window.location.search;
    }
}

/**
 * Get the query string to access url parameters
 * @return object containing all query variables
 */
function getQueryString() {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = get_location.search().substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
}

/**
 * Gets the URL parameter value for a given name
 *@param name Name of a URL parameter
 */
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))
    || decodeURIComponent((new RegExp('#' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))
    || null;
}

/**
 * Used in toolbar.js
 * @return true, if the page is a widget in ROLE. false, otherwise
 */
tools.isInRole = function () {
  return getURLParameter("widget") === "true";
}
