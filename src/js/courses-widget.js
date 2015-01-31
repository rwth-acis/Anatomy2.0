/**
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
    if(href.indexOf("course.php") > -1){
        //change href
        aElememts[i].href = aElememts[i].href + "&widget=true";
    }
  }
  
  console.log("overview-widget: initialized widget");
}
//execute init when page is loaded
document.addEventListener('DOMContentLoaded', initCourseOverviewWidget, false);
