/**
 * Initialization of wrapper in Role to pass necessary objects to the wrapped site and enable inter device-communication
 */

// IWC initialize section.
var iwcClient;
var id = Math.random().toString(36).substr(2, 9);
var widget = 'http://zxmma58.bplaced.net/henm/src/views/model_viewer%20-%20Copy.xml?id=' + id;

function init () {
  iwcClient = new iwc.Client();
  iwcClient.connect(iwcCallback);
}
gadgets.util.registerOnLoadHandler(init);

/**
 *  Receive intents form other divces/widgets through iwc
 */
function iwcCallback(intent) {
    //ignore the msgs sent from here
    if(intent.sender === widget) { return; }

    var extras = intent.extras;

    if(typeof extras.topic === 'undefined'){
	console.log("received unknown message from iwc");
	return;
    }

    //figure out what to to with the message:
    switch(extras.topic){
	case "ViewpointUpdate": receivedViewpointChanged(extras); break;
	default: console.log("Wrapper: received unknown message from iwc", intent); break;	
    }
}

/**
 *  Send intent to other widgets/devices through iwc
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
 */
function receiveSubsiteMessage(event)
{
    //TODO: check that message really comes from our server
    // if (event.origin !== "http://example.org:8080")
    // 	return;
    
    //Debug output for message
    //console.info("Wrapper: We got a message: ", event.data);

    //choose reaction
    var msgTopic = event.data.split(" ")[0];
    var msgContent = event.data.slice(msgTopic.length);
    switch(msgTopic){
	case "SubsiteLoaded": onSubsiteLoaded(); break;
	case "ViewpointUpdate": publishViewpointChanged(JSON.parse(msgContent)); break;
	default: /*console.log("Wrapper: received unknown message from iframe", event.data);*/ break;
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

/**
 * Publish a Viewpoint message from the wrapped subsite by creating the message and sending it to other devices
 */
function publishViewpointChanged(msg){
    var intent = getDefaultIntent();

    //add topic to msg
    msg.topic = "ViewpointUpdate";
    //insert pos and ori
    intent.extras = msg;
    
    publishMessage(intent);
}

/**
 * Pass received Viewpoint to iframe
 */
function receivedViewpointChanged(extras){
    contentWindow.postMessage("ViewpointUpdate " + JSON.stringify(extras), "*");
}
