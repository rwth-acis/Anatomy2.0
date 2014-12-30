/**
 *  Additional js functions if the overview is loaded as seperate widget
 */


/**
 * change normal overview page to separate widget page
 */
function initOverviewWidget(){
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
	}
    }
    console.log("overview-widget: initialized widget");
}
//execute init when page is loaded
document.addEventListener('DOMContentLoaded', initOverviewWidget, false);


/**
 * event handler for clicking on a link
 * sends iwc message to select the model in some other widget
 */
function clickOnLink(evt){
    //get original href
    var href = evt.target.linkedModel;
    if(href === undefined){
	//user clocked on element in <a> instead of a text in <a>
	href = evt.target.parentNode.linkedModel;
    }
    // console.info("ModelSelectByOverview " + href);
    //send selected model to other widgets
    var msgContent = {'href': href};
    publishIWC("ModelSelectByOverview", msgContent);
}
