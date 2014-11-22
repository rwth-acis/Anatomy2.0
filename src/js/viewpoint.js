var pos;
var rot;

// IWC initialize section.
var iwcClient;

function init (callback) {
    var iwcCallback = callback ? callback : function(){};       // if no function is defined, define empty function
    iwcClient = new iwc.Client();
    iwcClient.connect(iwcCallback);
}

// Viewport section.
function sendPositionAndOrientation() 
{
    // Send through IWC!
    var intent = {
        "component" :"",                            // recipient, empty for broadcast
        "data"      :"http://data.org/some/data",   // data as URI
        "dataType"  :"text/xml",                    // data mime type
        "action"    :"ACTION_UPDATE",               // action to be performed by receivers
        "flags"     :["PUBLISH_GLOBAL"],            // control flags
        "extras"    :{"position": pos, "orientation": rot} // optional auxiliary data
    }
    if(iwc.util.validateIntent(intent)) {
        iwcClient.publish(intent);

        var camPos = pos.x.toFixed(4) + ' ' +
                pos.y.toFixed(4) + ' ' +
                pos.z.toFixed(4);
        var camRot = rot[0].x.toFixed(4) + ' ' +
                rot[0].y.toFixed(4) + ' ' +
                rot[0].z.toFixed(4) + ' ' +
                rot[1].toFixed(4);
        document.getElementById("debugText").innerHTML = "Sent viewpoint position = " +
                camPos + " orientation = " + camRot;
    }
    else {
        alert("Intent not valid! ");
    }
}

function viewpointChanged(evt)
{
    if (evt) {
        pos = evt.position;
        rot = evt.orientation;

        var camPos = pos.x.toFixed(4) + ' ' +
                pos.y.toFixed(4) + ' ' +
                pos.z.toFixed(4);
        var camRot = rot[0].x.toFixed(4) + ' ' +
                rot[0].y.toFixed(4) + ' ' +
                rot[0].z.toFixed(4) + ' ' +
                rot[1].toFixed(4);
        document.getElementById("debugText").innerHTML = "Updated viewpoint position = " +
                camPos + " orientation = " + camRot;

        sendPositionAndOrientation();
    }
}
