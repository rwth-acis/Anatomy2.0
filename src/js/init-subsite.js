/**
 * @file init-subsite.js
 * Initialization of a subside inside a wrapper in Role
 */



/**
 * How to react on incoming messages (from the wrapper)
 * @param event event from the messageEventListener
 */
function receiveMessage(event)
{
    ///TODO: check that message really comes from role
    // if (event.origin !== "http://example.org:8080")
    //  return;

    //Debug output for message
    // console.info("Subsite: We got a message: ", event.data);

    //ignore message if its empty
    if(event.data === undefined){
	return;
    }

    //choose reaction
    var msgTopic = event.data.split(" ")[0];
    var msgContent = event.data.slice(msgTopic.length);
    switch(msgTopic){
        case "EmbeddedInRole":
        isEmbeddedInRole = true;

        var data = {topic: "UserConnected", id: "null"};
        publishIWC("UserConnected", data);
        break;
        default:
    if(subscribeCallbacks.has(msgTopic)){
        //call callback function
        (subscribeCallbacks.get(msgTopic))(JSON.parse(msgContent));
    }
    else{
        console.log("Subsite: received unknown message", event.data);
    }
    break;
    }
}

window.addEventListener("message", receiveMessage, false);

/**
 * Subscribe to a topic with a given callback function to get notified if a message of the topic was sent to you
 * @param topic the topic you want to subscribe to
 * @param callback The callback function that should accept a parameter with an object that corresponds to the extra field in the iwc message
 */
function subscribeIWC(topic, callback){
    //inform wrapper, that we want to get messages about the topic
    roleWrapper.postMessage("SubscribeTo " + topic, "*");
    //store callback function
    subscribeCallbacks.set(topic, callback);
}

/**
 * Publish a message via IWC to other widgets
 * @param topic: the topic of the message
 * @param content: content of the message as object (e.g. {x:0, y:2})
 */
function publishIWC(topic, content){
    if(!isEmbeddedInRole){
    //we are not in role, therefore we cant use iwc
    console.log("init-subsite: can't send iwc message if not embedded in role");
    return;
    }
    //send message to wrapper to send it via iwc
    roleWrapper.postMessage(topic + " " + JSON.stringify(content), "*");
}



///initial map topic->callback funciton
subscribeCallbacks = new Map();

///is this site embedded in a role sandbox?
isEmbeddedInRole = false;

///variable for accessing the wrapper:
roleWrapper = window.parent;

//Inform wrapper, that we are loaded and ready to receive the data we need
roleWrapper.postMessage("SubsiteLoaded", "*");
