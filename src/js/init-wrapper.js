/**
 * @file init-wrapper.js
 * Initialization of wrapper in Role to pass necessary objects to the wrapped site and enable inter device-communication
 */

// IWC initialize section.
var iwcClient;
var contentWindow;
///unique id of the widget
var id = Math.random().toString(36).substr(2, 9);
///name of the role space
var space = window.location.origin + window.parent.location.pathname
///unique name of the widget
var widget = space + '?id=' + id;

console.info("space: ", space);

/**
 * Initialization of the wrapper when loaded
 */
function init () {
    iwcClient = new iwc.Client();
    iwcClient.connect(iwcCallback);
}

/**
 *  Receive intents form other divces/widgets through iwc
 * @param intent The received intent (iwc msg)
 */
function iwcCallback(intent) {
    //ignore the msgs sent from here
    if(intent.sender === widget) { return; }

    //ignore msgs sent from other role spaces
    if(intent.sender.indexOf(space) < 0){
	return;
    }
    
    var extras = intent.extras;

    if(typeof extras.topic === 'undefined'){
	console.log("received unknown message from iwc");
	return;
    }

    if($.inArray(extras.topic, subscribedTopics)) {
        //send message to subsite
        contentWindow.postMessage(extras.topic + " " + JSON.stringify(extras), "*");    
    }
}

/**
 *  Send intent to other widgets/devices through iwc
 * @param intent The intent of the message to publish
 */
function publishMessage(intent) 
{
    if(iwc.util.validateIntent(intent)) {
        iwcClient.publish(intent);
        //console.info("Wrapper: published intent: ", intent);
    } else {
        alert('Intent not valid! ');
    }
}

/**
 *  Create default intent to be modified and send later to other devices/widgets
 */
function getDefaultIntent(){ 
    var intent = {
        'component' :'',                            // recipient, empty for broadcast
        'data'      :'http://data.org/some/data',   // data as URI
        'dataType'  :'text/xml',                    // data mime type
        'action'    :'ACTION_UPDATE',               // action to be performed by receivers
        'flags'     :['PUBLISH_GLOBAL'],            // control flags
        'extras'    :{}, // optional auxiliary data
        'sender'    :widget
    }
    return intent;
}

/**
 * How to react on incoming messages (from the subsite)
 * The data field of the messages should have the format "topic JSON-stringifyed-object" or "topic"
 * @param event event from the messageEventListener
 */
function receiveSubsiteMessage(event)
{
    //TODO: check that message really comes from our server
    // if (event.origin !== "http://example.org:8080")
    //  return;
    
    //Debug output for message
    //console.info("Wrapper: We got a message: ", event.data);

    //choose reaction
    var msgTopic = event.data.split(" ")[0];
    var msgContent = event.data.slice(msgTopic.length);
    switch(msgTopic){
        case "SubsiteLoaded": onSubsiteLoaded(); break;
	case "SubscribeTo": subscribeTo(msgContent); break;
	default: {
	    //filter messages that are not from us (they start with '{')
	    if(msgTopic.indexOf("{") == 0){
		return;
	    }
	    //send message via iwc to other widgets
	    var intent = getDefaultIntent();
            msg = JSON.parse(msgContent);
            //add topic to msg
            msg.topic = msgTopic;
            //insert pos and ori
            intent.extras = msg;
            publishMessage(intent);
            break;
        }
    }
}
window.addEventListener("message", receiveSubsiteMessage, false);


/**
 * Finish initialization after subsite is loaded
 */
function onSubsiteLoaded(){
    //variable for accessing the subsite:
    contentWindow = document.getElementById("content-frame").contentWindow;

    //inform subsite that it is embedded into a role environment
    contentWindow.postMessage("EmbeddedInRole ", "*");
}

subscribedTopics = [];

/**
 * Add a topic the subsite wants to get
 * @param topic the topic string to subscribe to
 */
function subscribeTo(topic){
    subscribedTopics.push(topic);
    console.log("init-wrapper: subscribed to topic " + topic);
}//moved to the end, so that testing this file does not require the site to be in role
gadgets.util.registerOnLoadHandler(init);
