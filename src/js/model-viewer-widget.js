/**
 *  Additional js functions if the model_viewer is loaded as seperate widget
 */


/**
 * change normal page to separate widget page
 */
function initWidget(){
    //nothing to do?
    console.log("model-viewer-widget: initialized widget");
}
//execute init when page is loaded
document.addEventListener('DOMContentLoaded', initWidget, false);

/*
 * An overview widget selected a model, we load it
 */
function receiveModelSelectedByOverview(msgContent){
    window.location.assign(msgContent);
}
