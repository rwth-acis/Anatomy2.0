/* 
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * 
 *  @file addCourse.js
 *  
 */

// Fill in the subject id in views/addcourse.php by reading the id from the URL
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("subject_input").value = getURLParameter("id");
  
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


