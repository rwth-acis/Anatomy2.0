/**
 * @file overview-widget.js
 *  Additional js functions if the overview is loaded as separate widget
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
  // Subscribes to model select event to be informed if some other overview selects 
  // and highlights a model. The same model should be highlighted here as well.
  subscribeIWC("ModelSelectByOverview", onRemoteHighlight);
  
  console.log("overview-widget: initialized widget");
}
//execute init when page is loaded
document.addEventListener('DOMContentLoaded', initOverviewWidget, false);

/**
 * Receiver function for IWC synchronization of model highlighting
 * @param msg Message which contains the id of the selected model
 */
function onRemoteHighlight(msg) {
  highlightModel(msg.id);
}

/**
 * event handler for clicking on a link
 * sends iwc message to select the model in some other widget
 * @param evt the click event
 */
function clickOnLink(evt){
  //get original href
  var id = evt.target.id;
  var href = evt.target.linkedModel;
  if(href === undefined){
    //user clicked on element in <a> instead of a text in <a>
    href = evt.target.parentNode.linkedModel;
    id = evt.target.parentNode.id;
  }
  // The link has an id of the form a_img<db_id>. This will extract the database id.
  id = id.substr(5);
  // Send link to and if of selected model to other widgets
  var msgContent = {'href': href, 'id': id};
  publishIWC("ModelSelectByOverview", msgContent);
  // Highlight the model in this overview widget
  highlightModel(id);
}

/**
 * Highlight a model in the overview page.
 * @param id The id (from the database) of the model to be highlighted. 
 */
function highlightModel(id) {
  // Remove the highlighting from currently selected model (by removing it from all divs)
  var divs = document.getElementsByName('table-entry');
  console.log(divs);
  for (var i = 0; i < divs.length; ++i) {
    divs[i].className = divs[i].className.replace( /(?:^|\s)div-highlight(?!\S)/ , '' )
  }
  // Get the div element on the overview page for the given model id
  var div = document.getElementById('table_entry' + id);
  // Highlight the div element by changing the css style
  div.className = div.className + ' div-highlight';  
}
