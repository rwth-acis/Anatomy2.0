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
 * @file modelAnnotater.connector.js
 * Handles communication with Sevianno service to store and retrieve modelAnnotater.connector
 */

modelAnnotater.connector = {}

// Sevianno stores a tool id with each annotation. Set the tool id here
modelAnnotater.connector.TOOL_ID = "Anatomy";
// The name of the collection which stores modelAnnotater.connector in the ArangoDB of Sevianno
modelAnnotater.connector.ANNOTATIONS_COLLECTION = "TextTypeAnnotations";
// The URL to the Sevianno service
modelAnnotater.connector.BASE_SERVICE_URL = 'http://eiche.informatik.rwth-aachen.de:7075/';
// The URL for request regarding Sevianno modelAnnotater.connector
modelAnnotater.connector.ANNOTATION_SERVICE_URL = modelAnnotater.connector.BASE_SERVICE_URL + 'modelAnnotater.connector/modelAnnotater.connector/';
// The URL for requests regarding Sevianno objects
modelAnnotater.connector.OBJECT_SERVICE_URL = modelAnnotater.connector.BASE_SERVICE_URL + 'modelAnnotater.connector/objects/';

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
modelAnnotater.connector.sendRequest = function(method, url, json_payload, retries, func) {
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
modelAnnotater.connector.createAnnotation = function(objectId, pos, norm, localId, username, func) {
  if (objectId !== undefined) {
    var data = new Object();
    data.collection = modelAnnotater.connector.ANNOTATIONS_COLLECTION;
    data.pos = pos;
    data.norm = norm;
    data.objectId = objectId;
    data.timestamp = Date.now();
    data.toolId = modelAnnotater.connector.TOOL_ID;
    data.localId = localId;
    data.username = username;
    var json_payload = JSON.stringify(data);

    modelAnnotater.connector.sendRequest("POST", modelAnnotater.connector.ANNOTATION_SERVICE_URL, json_payload, 0, func);
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
modelAnnotater.connector.updateAnnotation = function(annotationId, title, content, username, func) {
  var data = new Object();
  data.title = title;
  data.text = content;
  data.timestamp = Date.now();
  data.username = username;
  // The id of the annotation where changes should be stored
  var annotationId = annotationId;
  var json_payload = JSON.stringify(data);

  modelAnnotater.connector.sendRequest("PUT", modelAnnotater.connector.OBJECT_SERVICE_URL + annotationId, json_payload, 2, func);
};

/**
 * Reads all Sevianno modelAnnotater.connector for given Sevianno object ID
 * @param {String} objectId The ID of the Sevianno object, whose modelAnnotater.connector are to be read
 * @param {function(object)} func Callback function which provides the modelAnnotater.connector 
 * read from Sevianno service as first parameter
 * @returns {undefined}
 */
modelAnnotater.connector.readAnnotations = function(objectId, func) { 
  modelAnnotater.connector.sendRequest("GET", modelAnnotater.connector.OBJECT_SERVICE_URL + objectId + '/modelAnnotater.connector', null, 0, function(answer) {
    
    var annos = JSON.parse(answer);
    
    func(annos);
  });
};

/**
 * Deletes an annotation for Sevianno service.
 * 
 * @param {String} objectId Annotations object id
 * @param {function} func Callback (called when deletion completed)
 * @returns {undefined}
 */
modelAnnotater.connector.deleteAnnotation = function(objectId, func) { 
  
    modelAnnotater.connector.sendRequest("DELETE", modelAnnotater.connector.OBJECT_SERVICE_URL + objectId, null, 0, function(answer) {
    
    func(answer);
  });
};