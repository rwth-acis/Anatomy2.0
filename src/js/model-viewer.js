/**
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file model-viewer.js
 * Shows annotations in model_viewer.php
 * 
 * Requires: annotations.js
 */

var modelViewer = {};

// The id of the model object as stored in Sevianno service (can be retrieved from our database)
modelViewer.seviannoObjectId = '';

// The Sevianno object id of the annotation whose content box is currently visible (the last annotation that has been clicked)
modelViewer.selectedAnnotationId = undefined;

// A list of all annotations which are related to the current model
modelViewer.annotations = {};

modelViewer.lastLocalId = 0;

modelViewer.SELECTION_COLOR = "1 1 0";
modelViewer.DEFAULT_COLOR = "1 0 0";
modelViewer.NO_TITLE_PLACEHOLDER = 'No Title';
modelViewer.NO_CONTENT_PLACEHOLDER = 'No content';

// A list of all annotation markers (the cone shapes) is stored. Note, that not the
// cone shape is stored directly in the list, but a transform node. The cone shape
// is the direct child of the transform node.
modelViewer.annotationMarkers = {};

/**
 * Shows a cone to mark the position of an annotation
 * @param {x3dom.fields.SFVec3f} pos The position of the annotation as x3dom vector
 * @param {x3dom.fields.SFVec3f} norm The normal vector of the annotation as 
 * x3dom vector. This will define the direction in which this annotaion marker points
 * @param {int} id The Sevianno object id of the shown annotation. Will be stored 
 * with the geometry shape to be able to reference the annotation when clicking the shape
 * @returns {undefined}
 */
modelViewer.showAnnotationMarker = function(pos, norm, id) {  
  // Code taken from http://examples.x3dom.org/v-must/ (Download the zip file and check main.js)
  // Will show a cone marking the position where a user clicked on the model
  // show 3d marker at pick position

  // rotate such that cone points to click point
  var qDir = x3dom.fields.Quaternion.rotateFromTo(new x3dom.fields.SFVec3f(0, -1, 0), norm);
  var rot = qDir.toAxisAngle();
  pos = pos.addScaled(norm, 9.5);  // since length is 10...

  var t = document.createElement('Transform');
  t.setAttribute("scale", "3 10 3" );
  t.setAttribute('rotation', rot[0].x+' '+rot[0].y+' '+rot[0].z+' '+rot[1]);
  t.setAttribute('translation', pos.x+' '+pos.y+' '+pos.z);

  var s = document.createElement('Shape');
  s.setAttribute('class', 'shape');
  // Store the id of an annotation with the cone shape. The id of the annotation 
  // can thus be accessed when clicking the shape.
  s.dataset.id = id;
  t.appendChild(s);
  var b = document.createElement('Cone');
  s.appendChild(b);
  var a = document.createElement('Appearance');
  var m = document.createElement('Material');
  m.setAttribute("diffuseColor", modelViewer.DEFAULT_COLOR);
  m.setAttribute("transparency", "0.5");
  a.appendChild(m);
  s.appendChild(a);

  var ot = document.getElementById('annotation-markers');
  ot.appendChild(t);
  // End code taken from http://examples.x3dom.org/v-must/ 
  
  // Store the annotation marker globally in modelViewer (The full transform node is stored)
  modelViewer.annotationMarkers[id] = t;
};

/**
 * Show the annotation content box for a user click. It will be moved to the 
 * border of the viewer element.
 * @param {Array} pos2d 2D point where the user clicked (relative to page)
 * @returns {undefined}
 */
modelViewer.showAnnotationContentBox = function(pos2d) {
  
  var anno2D = $('#annotation-content');
  anno2D.removeClass('hidden');
  pos2d = modelViewer.calcAnnotationPosition(pos2d);
  anno2D.css('left', pos2d[0] + 'px');
  anno2D.css('top', pos2d[1] + 'px');  
  
  modelViewer.showAnnotationContent();
};

modelViewer.clearHighlighting = function() {
  if (modelViewer.selectedAnnotationId !== undefined) {
    var shape = modelViewer.annotationMarkers[modelViewer.selectedAnnotationId].children[0];
    var material = shape.children[1].children[0];
    material.setAttribute("diffuseColor", modelViewer.DEFAULT_COLOR);
  }
};

modelViewer.selectShape = function(shape) {
  
  // Remove hightlighting from previously selected annotation
  modelViewer.clearHighlighting();
  
  modelViewer.selectedAnnotationId = shape.dataset.id;
  
  // Highlight the selected annotion marker with a different color
  var material = shape.children[1].children[0];
  material.setAttribute("diffuseColor", modelViewer.SELECTION_COLOR);
};

modelViewer.showAnnotationContentBoxForWorldPos = function(worldPos) {
  
  var runtime = document.getElementById("viewer_object").runtime;
  
  // x3dom can calculate the 2D position on the screen based on a 3D point
  var pos2d = runtime.calcPagePos(worldPos[0], worldPos[1], worldPos[2]);
  
  modelViewer.showAnnotationContentBox(pos2d);
};

/**
 * Shows the textual content of the currently selected annotation in the annotation 
 * context box. Note, that the content is taken from modelViewer.annotations object.
 * You might need to update the object first by calling modelViewer.storeAnnotationLocally(annotation)
 * 
 * @returns {undefined}
 */
modelViewer.showAnnotationContent = function() {
  
  var annotation = modelViewer.annotations[modelViewer.selectedAnnotationId];
  
  // If there is no annotation stored with the given id (or the id is undefined), 
  // then the user has created a new annotation and the request to Sevianno is still in progress
  if (annotation === undefined) {
    switchAnnotationContentMode('loading');
  }
  else {
    // Updating the content in the "readonly" div
    if (annotation.title === undefined || annotation.title == '') {
      $('#header-annotation-content').html(modelViewer.NO_TITLE_PLACEHOLDER);
    } else {
      $('#header-annotation-content').html(annotation.title);
    }
    if (annotation.text === undefined || annotation.text == '') {
      $('#p-annotation-content').html(modelViewer.NO_CONTENT_PLACEHOLDER);
    }
    else {
      $('#p-annotation-content').html(annotation.text);
    }
    // Updating the content in the "edit" div
    $('#input-annotation-title').val(annotation.title);
    $('#textarea-annotation-content').val(annotation.text);
  }
};

/**
 * Handler for clicking annotation marker
 * @param {type} event
 * @returns {undefined}
 */
modelViewer.handleAnnotationMarkerClick = function(event) {
  
  // 3D point where the user clicked
  var worldPos = event.hitPnt;
  
  // Get the id of the clicked annotation
  var shape = event.hitObject;
  
  modelViewer.selectShape(shape);
  modelViewer.showAnnotationContentBoxForWorldPos(worldPos);
};

/**
 * Calculates a position for the annotation content window. Calculation is based 
 * on the clicked position. The annotation is moved up to DELTA pixel to the border 
 * of the viewer screen (it will always stay inside the viewer screen)
 * @param {Object} pos2d The 2D position where the user clicked (relative to webpage)
 * @returns {Object} The 2D position where to place the annotation (relative to webpage)
 */
modelViewer.calcAnnotationPosition = function(pos2d) {
  // The amount of pixels the annotation content is moved to the border (at most)
  var DELTA = 50;
  
  // Width of the viewer
  var width = $('#viewer_object').width();
  // Left border of the viewer
  var offsetLeft = $('#viewer_object').offset().left;
  // Width of the annotation content widow
  var divWidth = $('#annotation-content').outerWidth();
  
  // Move the position by DELTE to the nearest border (left / right)
  if (pos2d[0] < width / 2) {
    pos2d[0] -= divWidth + DELTA;
  }
  else {
    pos2d[0] += DELTA;
  }
  // If new position outside border, move exactly to border
  if (pos2d[0] < offsetLeft) {
    pos2d[0] = offsetLeft;
  }
  else if (pos2d[0] + divWidth > offsetLeft + width) {
    pos2d[0] = offsetLeft + width - divWidth;
  }
  
  // Heigth of the viewer
  var height = $('#viewer_object').height();
  // Top border of the viewer
  var offsetTop = $('#viewer_object').offset().top;
  // Height of the annotation content widow
  var divHeight = $('#annotation-content').outerHeight();
  
  // Move the position by DELTE to the nearest border (top / bottom)
  if (pos2d[1] < height / 2) {
    pos2d[1] -= divHeight + DELTA;
  }
  else {
    pos2d[1] += DELTA;
  }
  // If new position outside border, move exactly to border
  if (pos2d[1] < offsetTop) {
    pos2d[1] = offsetTop;
  }
  else if (pos2d[1] + divHeight > offsetTop + height) {
    pos2d[1] = offsetTop + height - divHeight;
  }
  
  return pos2d;
};

/**
 * Switches between the "readonly" div of the annotation content box and its "edit" div.
 * For the users point of view, this makes the content editable or non-editable 
 * and shows the corresponding buttons.
 * 
 * @param {type} mode
 * @returns {undefined}
 */
modelViewer.switchAnnotationContentMode = function(mode) {
  if (mode === 'edit') {
    $('#div-annotation-content-loading').addClass('hidden');
    $('#div-annotation-content-read').addClass('hidden');
    $('#div-annotation-content-edit').removeClass('hidden');
  }
  else if (mode === 'read') {
    $('#div-annotation-content-loading').addClass('hidden');
    $('#div-annotation-content-read').removeClass('hidden');
    $('#div-annotation-content-edit').addClass('hidden');
  }
  else if (mode === 'loading') {
    $('#div-annotation-content-loading').removeClass('hidden');
    $('#div-annotation-content-read').addClass('hidden');
    $('#div-annotation-content-edit').addClass('hidden');    
  }
};

modelViewer.createAnnotation = function(pos, norm) {
  // Generate a local ID to be able to reference the object until a Sevianno ID 
  // has been received
  var localId = modelViewer.getNextLocalId();
  // Show the new annotation to the user
  modelViewer.showAnnotationMarker(pos, norm, localId);
  // Store the annotation persistently with Sevianno
  annotations.createAnnotation(modelViewer.seviannoObjectId, pos, norm, localId, function(answer) {
    var annotation = JSON.parse(answer);
    var localId = annotation.annotationData.localId;
    // If "Loading" div of content box is shown, move to the edit div. The edit div
    // is chosen, because the user just created an annotation (when this function is called)
    // and therefore there is no content to read, but the user most likely wants to edit
    if (!$('#div-annotation-content-loading').hasClass('hidden')) {
      modelViewer.switchAnnotationContentMode('edit');      
    }
    // The currently selected annotation id is the local id of the created annotation,
    // update the selected annotation id to the Sevianno annotation id
    if (localId === modelViewer.selectedAnnotationId) {
      modelViewer.selectedAnnotationId = annotation.id;
    }
    // Each shape (annotation marker) stores its annotation id with it. We have 
    // to update this id from local id to the Sevianno id. Also update the references 
    // in annotation markers list and annotation list
    var transform = modelViewer.annotationMarkers[localId];
    if (transform !== undefined) {
      transform.children[0].dataset.id = annotation.id;
      modelViewer.annotationMarkers[annotation.id] = transform;
      modelViewer.annotationMarkers[localId] = undefined;
      
      modelViewer.storeAnnotationLocally(annotation);
      modelViewer.annotations[localId] = undefined;
    }
  });
};

/**
 * Stores an annotation in the modelViewer.annotations object. It can be accessed
 * as an attribute via its annotation id. E.g. as modelViewer.annotations['12365']
 * @param {Object} annotation The annotation to be stored (one should typically 
 * store them in the format received from Sevianno)
 * @returns {undefined}
 */
modelViewer.storeAnnotationLocally = function(annotation) {
  modelViewer.annotations[annotation.id] = annotation;
};

modelViewer.hideAnnotationContent = function() {
  // Hide the whole content box
  $('#annotation-content').addClass('hidden');
  
  // Clear all input / output fields
  // Updating the content in the "readonly" div
  $('#header-annotation-content').html(modelViewer.NO_TITLE_PLACEHOLDER);
  $('#p-annotation-content').html(modelViewer.NO_CONTENT_PLACEHOLDER);
  // Updating the content in the "edit" div
  $('#input-annotation-title').val('');
  $('#textarea-annotation-content').val('');
};

modelViewer.getNextLocalId = function() {
  modelViewer.lastLocalId += 1;
  return 'MODEL_VIEWER' + modelViewer.lastLocalId;
};

document.addEventListener('DOMContentLoaded', function() {
  // Reading the Sevianno object id of the current model from our database (our php 
  // server will store it in a hidden input field called model-sevianno-id)
  modelViewer.seviannoObjectId = $('#model-sevianno-id').val();
  
  // Then reading all annotations from Sevianno which belong to this object id and display them
  annotations.readAnnotations(modelViewer.seviannoObjectId, function(annos) {
    $.each(annos.annotations, function(i,n) {
      var annotation = n.annotation;
      var dbPos = annotation.annotationData.pos;
      var dbNorm = annotation.annotationData.norm;
      // Converting the position and normal vector received to x3dom vectors
      var pos = new x3dom.fields.SFVec3f(dbPos.x, dbPos.y, dbPos.z);
      var norm = new x3dom.fields.SFVec3f(dbNorm.x, dbNorm.y, dbNorm.z);
      modelViewer.showAnnotationMarker(pos, norm, annotation.id);
      
      modelViewer.storeAnnotationLocally(annotation);
    });
  });
  
  // Register handler for close button in annotation content window
  $('#btn-annotation-content-close').on('click', function() {
    modelViewer.hideAnnotationContent();
    // There is no more annotation selected, so update selectedAnnotationId
    modelViewer.selectedAnnotationId = undefined;
  });
  
  // Handler for the edit button in div-annotation-content-read. Switches to div-annotation-content-edit
  $('#btn-annotation-edit').on('click', function() {
    modelViewer.switchAnnotationContentMode('edit');
  });
  
  // Handler for the edit button in div-annotation-content-edit. Switches to 
  // div-annotation-content-read without saving user input.
  $('#btn-annotation-cancel').on('click', function() {
    modelViewer.switchAnnotationContentMode('read');
  });
  
  // Handler for the edit button in div-annotation-content-edit. Switches to 
  // div-annotation-content-read while saving all user input at the Sevianno service
  $('#btn-annotation-save').on('click', function() {
    // Read user input
    var title = $('#input-annotation-title').val();
    var content = $('#textarea-annotation-content').val();
    // Indicate that the data is being processed by showing a loading indicator
    $('#ajax-loader-edit').removeClass('hidden');
    // Save the annotations with Sevianno
    annotations.updateAnnotation(modelViewer.selectedAnnotationId, title, content, function(data) {
      // Update the local annotation stored in modelViewer
      var annotation = JSON.parse(data);
      modelViewer.storeAnnotationLocally(annotation);
      // Hide the loading indicator
      $('#ajax-loader-edit').addClass('hidden');  
      // Switch to div-annotation-content-read and update its content
      modelViewer.switchAnnotationContentMode('read');
      modelViewer.showAnnotationContent(); 
    });
  });
  
  // Handler for clicking the delete button in div-annotation-content-read
  $('#btn-annotation-delete').on('click', function(event) {
    // Get the id of the currently selected annotation (which should be deleted)
    var annotationId = modelViewer.annotations[modelViewer.selectedAnnotationId].id;
    
    // Indicate that deletion is in progress (by showing a loading indicator)
    $('#ajax-loader-read').removeClass('hidden');
    // Remove the annotation from Sevianno service storage
    annotations.deleteAnnotation(annotationId, function() {
      
      // When successful, remove annotation marker (cone shape) from viewer
      // The cone shape is included in a transformation node
      var annotationMarkers = document.getElementById('annotation-markers');
      var transformNode = modelViewer.annotationMarkers[annotationId];
      annotationMarkers.removeChild(transformNode);
      // Hide annotation content box
      modelViewer.hideAnnotationContent();
      // Hide the loading indicator
      $('#ajax-loader-read').addClass('hidden');  
    });
  });
});