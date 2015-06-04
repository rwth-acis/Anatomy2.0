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
 *  @file course.js
 *  
 */

document.addEventListener("DOMContentLoaded", function() {
  
  document.getElementById("btn-delete").addEventListener("click", function() {
    
    var id = getURLParameter("id");  
    ajax.post("../php/delete_course.php", {"course_id": id}, function(data){
      window.location = "course_list.php?id="+data;
    });
    
  }, false);
});
