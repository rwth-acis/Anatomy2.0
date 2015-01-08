/**
 * @file model-viewer-widget.js
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
 * @param msgContent received message content from iwc
 */
function receiveModelSelectedByOverview(msgContent){
    console.log("model-viewer-widget: loading site: ", msgContent.href + "&widget=true");
    window.location.assign(msgContent.href + "&widget=true");
}
//subscribe to ModelSelectByOverview messages
subscribeIWC("ModelSelectByOverview", receiveModelSelectedByOverview);
