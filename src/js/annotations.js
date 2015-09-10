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
 * @file annotations.js
 * Handles communication with Sevianno service to store and retrieve annotations
 */

var annotations = {};

// Sevianno stores a tool id with each annotation. Set the tool id here
annotations.TOOL_ID = "Anatomy";
// The name of the collection which stores annotations in the ArangoDB of Sevianno
annotations.ANNOTATIONS_COLLECTION = "TextTypeAnnotations";
// The URL to the Sevianno service
annotations.BASE_SERVICE_URL = 'http://eiche.informatik.rwth-aachen.de:7075/';
// The URL for request regarding Sevianno annotations
annotations.ANNOTATION_SERVICE_URL = annotations.BASE_SERVICE_URL + 'annotations/annotations/';
// The URL for requests regarding Sevianno objects
annotations.OBJECT_SERVICE_URL = annotations.BASE_SERVICE_URL + 'annotations/objects/';

/**
 * Helper function
 * Sends an ajax request to a RESTful service. JSON encoded payload can be sent.
 * @param {String} method GET, POST, PUT or DELETE
 * @param {String} url Target URL of request
 * @param {String} json_payload JSON encoded object
 * @param {int} retries The request will be sent again this often, if fails
 * @param {function} func Callback function upon success
 * @returns {undefined}
 */
annotations.sendRequest = function(method, url, json_payload, retries, func) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(method, url, true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState === 4) {
      if (xmlhttp.status !== 200) {
        if (retries > 0) {
          sendRequest(method, url, json_payload, retries-1, func);
        }
      }
      else {
        func(xmlhttp.responseText);
      }
    }
  };
  xmlhttp.send(json_payload);
};

/**
 * Creates a new Sevianno annotation for current Sevianno object ID (seviannoId)
 * @param {String} objectId The sevianno object id of the model to which this 
 * annotation should be stored (is retrieved from our database)
 * @param {x3dom.fields.SFVec3f} pos The position of the annotation as x3dom vector
 * @param {x3dom.fields.SFVec3f} norm The normal vector of the annotation as 
 * x3dom vector. This will define the direction in which this annotaion marker points
 * @param {String} localId Optional: local id of your annotation. Will be stored in Sevianno
 * @param {function} func Callback function for the asynchronous request to Sevianno service
 * @returns {undefined}
 */
annotations.createAnnotation = function(objectId, pos, norm, localId, func) {
  if (objectId !== undefined) {
    var data = new Object();
    data.collection = annotations.ANNOTATIONS_COLLECTION;
    data.pos = pos;
    data.norm = norm;
    data.objectId = objectId;
    data.timestamp = Date.now();
    data.toolId = annotations.TOOL_ID;
    data.localId = localId;
    var json_payload = JSON.stringify(data);

    annotations.sendRequest("POST", annotations.ANNOTATION_SERVICE_URL, json_payload, 0, func);
  }
};

/**
 * Update the title and content of an annotation.
 * 
 * @param {type} annotationId The Sevianno object id of the annotation
 * @param {type} title The title which will be given to the annotation
 * @param {type} content The content which will be given to the annotation
 * @param {type} func A callback function for handling when the request has been 
 * processed by Sevianno. The first parameter will have JSON payload data.
 * @returns {undefined}
 */
annotations.updateAnnotation = function(annotationId, title, content, func) {
  var data = new Object();
  data.title = title;
  data.text = content;
  data.timestamp = Date.now();
  // The id of the annotation where changes should be stored
  var annotationId = annotationId;
  var json_payload = JSON.stringify(data);

  annotations.sendRequest("PUT", annotations.OBJECT_SERVICE_URL + annotationId, json_payload, 2, func);
};

/**
 * Reads all Sevianno annotations for given Sevianno object ID
 * @param {String} objectId The ID of the Sevianno object, whose annotations are to be read
 * @param {function(object)} func Callback function which provides the annotations 
 * read from Sevianno service as first parameter
 * @returns {undefined}
 */
annotations.readAnnotations = function(objectId, func) { 
  annotations.sendRequest("GET", annotations.OBJECT_SERVICE_URL + objectId + '/annotations', null, 0, function(answer) {
    
    var annos = JSON.parse(answer);
    
    func(annos);
  });
};


annotations.deleteAnnotation = function(objectId, func) { 
  
    annotations.sendRequest("DELETE", annotations.OBJECT_SERVICE_URL + objectId, null, 0, function(answer) {
    
    func(answer);
  });
};