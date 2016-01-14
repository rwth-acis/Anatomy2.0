

var modelViewer = {}

// Array storing event listener for the onload function of the x3dInline element 
// in model_viewer.php
modelViewer.onLoadHandler = [];

/**
 * Registers an event listener for the x3dInline element in model_viewer.php.
 * The x3dom inline element seems not to support the 'addEventListener()' function
 * by itself, so this is a workaround to be able to attach multiple event listener
 * 
 * @param {String} type Currently only 'load' supported
 * @param {function} callback Will be called when event fires
 * @returns {undefined}
 */
modelViewer.addEventListener = function(type, callback) {
  // Store the event listener in modelViewer.onLoadHandler
  if (type === 'load') {
    modelViewer.onLoadHandler.push(callback);
  }
  else {
    console.log('modelViewer.addEventHandler(): Unsupported type '+ type);
  }
};

/**
 * Callback function for onLoad event of x3dInline element in model_viewer.php
 * 
 * @param {Event} event
 * @returns {undefined}
 */
modelViewer.onModelLoaded = function(event) {
    try {
        modelViewer.onLoadHandler.forEach(function(callback) {
            callback(event);
        })
    } catch(e) {
        console.log('Error in onModelLoaded: ', e)
    }
}

modelViewer.firstModel = true
modelViewer.setNewModel = function (modelId) {
    if(modelId == null) { return }
    $.get(URI().filename('x3d_element.php').query({id:modelId}).href(), null, function (data) {
            if(!modelViewer.firstModel) {
                // free x3dom-context (needed to prevent errormessage)
                // code copied from unload-event: https://github.com/x3dom/x3dom/blob/7d104d9717d12e1670b1ef40f5b83beeb590df83/src/Main.js#L318
                for (var i=0; i<x3dom.canvases.length; i++) {x3dom.canvases[i].doc.shutdown(x3dom.canvases[i].gl)}
                x3dom.canvases = []
            } else {
                modelViewer.firstModel = false
            }
            $('#x3d-container').html(data)
            x3dom.reload()
        })
}
