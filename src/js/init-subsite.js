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
    var msgTopic = event.data.split(" ")[0];
    var msgContent = event.data.slice(msgTopic.length);
    switch(msgTopic){
        case "ViewpointUpdate": receiveViewpointMsg(JSON.parse(msgContent)); break;
        case "EmbeddedInRole": isEmbeddedInRole = true; break;
        default: console.info("Subsite: received unknown message", event.data); break;
    }
}
window.addEventListener("message", receiveMessage, false);

//is this site embedded in a role sandbox?
isEmbeddedInRole = false;

//variable for accessing the wrapper:
roleWrapper = window.parent;

//Inform wrapper, that we are loaded and ready to receive the data we need
roleWrapper.postMessage("SubsiteLoaded", "*");
