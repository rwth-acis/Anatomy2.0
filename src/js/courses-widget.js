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
 * @file courses-widget.js
 *  Additional js functions if the course-overview is loaded as separate widget
 */


/**
 * change normal overview page to separate widget page
 */
function initCourseOverviewWidget(){
  // add url-parameter widget=true to all course page links
  var aElememts = document.getElementsByTagName('a');
  for(var i = 0; i < aElememts.length; ++i) {
    //get old hrefs (that would change the widget)
    var href = aElememts[i].href;
    //check if link goes to model_viewer:
    if(href.indexOf("course.php") > -1) {
      //check whether href already contains parameter and add new parameter accordingly
      if (href.indexOf("?") > -1) {
        aElememts[i].href = aElememts[i].href + "&widget=true";
      }
      else {
        aElememts[i].href = aElememts[i].href + "?widget=true";
      }
    }
  }
  
  console.log("overview-widget: initialized widget");
}
//execute init when page is loaded
document.addEventListener('DOMContentLoaded', initCourseOverviewWidget, false);
