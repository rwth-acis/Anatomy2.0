/**
 * @file overview-widget.js
 *  Additional js functions if the overview is loaded as seperate widget
 */


/**
 * change normal overview page to separate widget page
 */
function initOverviewWidget(){
  /*var container = document.getElementById('table-container');
  for (var i = 0; i < container.childNodes.length; ++i) {
    var div = container.childNodes[i];
    div.addEventListener("click", clickOnLink);
  }*/
  var aElememts = document.getElementsByTagName('a');
  for(var i = 0; i < aElememts.length; ++i) {
    //get old hrefs (that would change the widget)
    var href = aElememts[i].href;
    //check if link goes to model_viewer:
    if(href.indexOf("model_viewer") > -1){
        //disable href
        aElememts[i].href = "javascript:void(0)";
        //send iwc message instead
        aElememts[i].linkedModel= href;
        aElememts[i].addEventListener("click", clickOnLink);
      console.log("ID: "+aElememts[i].id);
    }
  }
  console.log("overview-widget: initialized widget");
}
//execute init when page is loaded
document.addEventListener('DOMContentLoaded', initOverviewWidget, false);


/**
 * event handler for clicking on a link
 * sends iwc message to select the model in some other widget
 * @param evt the click event
 */
function clickOnLink(evt){
  // Remove the highlighting from currently selected model (by removing it from all divs)
  var divs = document.getElementsByName('table-entry');
  console.log(divs);
  for (var i = 0; i < divs.length; ++i) {
    divs[i].className = divs[i].className.replace( /(?:^|\s)div-highlight(?!\S)/ , '' )
  }
  //get original href
  var href = evt.target.linkedModel;
  var id = evt.target.id;
  if(href === undefined){
    //user clicked on element in <a> instead of a text in <a>
    href = evt.target.parentNode.linkedModel;
    id = evt.target.parentNode.id;
  }
  var a = document.getElementById(id);
  console.log("ParentElement: "+a.parentElement);
  console.log("ID: "+id);
  a.parentElement.className = a.parentElement.className + " div-highlight";
  // console.info("ModelSelectByOverview " + href);
  //send selected model to other widgets
  var msgContent = {'href': href};
  publishIWC("ModelSelectByOverview", msgContent);
}
