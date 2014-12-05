/**
 * Initialization of a subside inside a wrapper in Role
 */



/**
 * How to react on incoming messages (from the wrapper)
 */
function receiveMessage(event)
{
    //TODO: check that message really comes from role
    // if (event.origin !== "http://example.org:8080")
    // 	return;
    //Debug output for message
    //console.info("Subsite: We got a message: ", event.data);

    //choose reaction
    switch(event.data){
	default: console.info("Subsite: received unknown message", event.data); break;
    }
}
window.addEventListener("message", receiveMessage, false);

//Inform wrapper, that we are loaded and ready to receive the data we need
window.parent.postMessage("Subsite Loaded", "*");
