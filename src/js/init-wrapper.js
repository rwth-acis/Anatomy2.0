/**
 * Initialization of wrapper in Role to pass necessary objects to the wrapped site
 */


/**
 * How to react on incoming messages (from the subsite)
 */
function receiveMessage(event)
{
    //TODO: check that message really comes from our server
    // if (event.origin !== "http://example.org:8080")
    // 	return;
    
    //Debug output for message
    //console.info("Wrapper: We got a message: ", event.data);

    //choose reaction
    switch(event.data){
	case "Subsite Loaded": passObjectsToIframe(); break;
	default: console.info("Wrapper: received unknown message", event.data); break;
    }
}

window.addEventListener("message", receiveMessage, false);


/**
 * give window inside iframe access to gadgets
 * this is not possible the normal way, because the wrapper and the content run on different domains
 */
function passObjectsToIframe(){
    contentWindow = document.getElementById("content-frame").contentWindow;

    contentWindow.postMessage(gadgets, "*");
    console.info("passed test to otherwindow");
}
