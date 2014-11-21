// IWC initialize section.
        var iwcClient;
        gadgets.util.registerOnLoadHandler(init);
        function init () {
            iwcClient = new iwc.Client();
            iwcClient.connect(iwcCallback);
        }
        function iwcCallback(intent) {
            var extras      = intent.extras;
            var extrasPos   = extras["position"];
            var extrasRot   = extras["orientation"];

            var camPos = extrasPos.x.toFixed(4) + ' ' +
                    extrasPos.y.toFixed(4) + ' ' +
                    extrasPos.z.toFixed(4);
            var camRot = extrasRot[0].x.toFixed(4) + ' ' +
                    extrasRot[0].y.toFixed(4) + ' ' +
                    extrasRot[0].z.toFixed(4) + ' ' +
                    extrasRot[1].toFixed(4);

            document.getElementById('viewport').setAttribute("position", camPos);
            document.getElementById('viewport').setAttribute("orientation", camRot);

            document.getElementById("debugText").innerHTML = "Received viewpoint position = " +
                    camPos + " orientation = " + camRot;
        }