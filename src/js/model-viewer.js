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

modelViewer.selectedAnnotationId = undefined;

modelViewer.annotations = {};

/**
 * Shows a cone to mark the position of an annotation
 * @param {x3dom.fields.SFVec3f} pos The position of the annotation as x3dom vector
 * @param {x3dom.fields.SFVec3f} norm The normal vector of the annotation as 
 * x3dom vector. This will define the direction in which this annotaion marker points
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
  s.dataset.id = id;
  t.appendChild(s);
  var b = document.createElement('Cone');
  s.appendChild(b);
  var a = document.createElement('Appearance');
  var m = document.createElement('Material');
  m.setAttribute("diffuseColor", "1 0 0");
  m.setAttribute("transparency", "0.5");
  a.appendChild(m);
  s.appendChild(a);

  var ot = document.getElementById('annotation-markers');
  ot.appendChild(t);
  // End code taken from http://examples.x3dom.org/v-must/ 
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

modelViewer.showAnnotationContent = function() {
  
  var annotation = modelViewer.annotations[modelViewer.selectedAnnotationId];
  $('#header-annotation-content').html(annotation.title);
  $('#p-annotation-content').html(annotation.text);
  $('#input-annotation-title').val(annotation.title);
  $('#textarea-annotation-content').val(annotation.text);
};

/**
 * Handler for clicking annotation marker
 * @param {type} event
 * @returns {undefined}
 */
modelViewer.handleAnnotationMarkerClick = function(event) {
  
  // 3D point where the user clicked
  var worldPos = event.hitPnt;
  var runtime = document.getElementById("viewer_object").runtime;
  
  // Get the id of the clicked annotation
  var shape = event.hitObject;
  modelViewer.selectedAnnotationId = shape.dataset.id;
  
  // x3dom can calculate the 2D position on the screen based on a 3D point
  var pos2d = runtime.calcPagePos(worldPos[0], worldPos[1], worldPos[2]);
  
  modelViewer.showAnnotationContentBox(pos2d);
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

modelViewer.switchAnnotationContentMode = function(mode) {
  if (mode === 'edit') {
    $('#div-annotation-content-read').addClass('hidden');
    $('#div-annotation-content-edit').removeClass('hidden');
  }
  else {
    $('#div-annotation-content-read').removeClass('hidden');
    $('#div-annotation-content-edit').addClass('hidden');
  }
};

modelViewer.storeAnnotationLocally = function(annotation) {
  modelViewer.annotations[annotation.id] = annotation;
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
    $('#annotation-content').addClass('hidden');
    modelViewer.selectedAnnotationId = undefined;
  });
  
  $('#btn-annotation-edit').on('click', function() {
    modelViewer.switchAnnotationContentMode('edit');
  });
  
  $('#btn-annotation-cancel').on('click', function() {
    modelViewer.switchAnnotationContentMode('read');
  });
  
  $('#btn-annotation-save').on('click', function() {
    var title = $('#input-annotation-title').val();
    var content = $('#textarea-annotation-content').val();
    $('#ajax_loader').removeClass('hidden');
    annotations.updateAnnotation(modelViewer.selectedAnnotationId, title, content, function(data) {
      var annotation = JSON.parse(data);
      modelViewer.storeAnnotationLocally(annotation);
      $('#ajax_loader').addClass('hidden');  
      modelViewer.switchAnnotationContentMode('read');
      modelViewer.showAnnotationContent();
    });
  });
});