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

/**
 * Shows a cone to mark the position of an annotation
 * @param {x3dom.fields.SFVec3f} pos The position of the annotation as x3dom vector
 * @param {x3dom.fields.SFVec3f} norm The normal vector of the annotation as 
 * x3dom vector. This will define the direction in which this annotaion marker points
 * @returns {undefined}
 */
modelViewer.showAnnotationMarker = function(pos, norm) {  
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
  t.appendChild(s);
  var b = document.createElement('Cone');
  s.appendChild(b);
  var a = document.createElement('Appearance');
  var m = document.createElement('Material');
  m.setAttribute("diffuseColor", "1 0 0");
  m.setAttribute("transparency", "0.5");
  a.appendChild(m);
  s.appendChild(a);

  var ot = document.getElementById('scene');
  ot.appendChild(t);
  // End code taken from http://examples.x3dom.org/v-must/ 
}

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
      modelViewer.showAnnotationMarker(pos, norm);
    });
  })
});