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
 *  TODO
 */

var annotations = {};

annotations.TOOL_ID = "Anatomy";
annotations.ANNOTATIONS_COLLECTION = "TextTypeAnnotations";

annotations.BASE_SERVICE_URL = 'http://eiche.informatik.rwth-aachen.de:7075/';
annotations.ANNOTATION_SERVICE_URL = annotations.BASE_SERVICE_URL + 'annotations/annotations/';
annotations.OBJECT_SERVICE_URL = annotations.BASE_SERVICE_URL + 'annotations/objects/';

/**
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
  console.log(method + " " + url + " " + json_payload);
  xmlhttp.send(json_payload);
};

/**
 * Creates a new Sevianno annotation for current Sevianno object ID (seviannoId)
 * @returns {undefined}
 */
annotations.createAnnotation = function(objectId, pos, norm) {
  if (objectId !== undefined) {
    var data = new Object();
    data.collection = annotations.ANNOTATIONS_COLLECTION;
    data.pos = pos;
    data.norm = norm;
    data.objectId = objectId;
    data.timestamp = Date.now();
    data.toolId = annotations.TOOL_ID;
    var json_payload = JSON.stringify(data);

    annotations.sendRequest("POST", annotations.ANNOTATION_SERVICE_URL, json_payload, 0, function(answer) {
    });
  }
};

/**
 * Reads all Sevianno annotations for given Sevianno object ID
 * @param {String} objectId The ID of the Sevianno object, whose annotations are to be read
 * @returns {undefined}
 */
annotations.readAnnotations = function(objectId, func) { 
  annotations.sendRequest("GET", annotations.OBJECT_SERVICE_URL + objectId + '/annotations', null, 0, function(answer) {
    
    var annos = JSON.parse(answer);
    
    func(annos);
    
    console.log("RETURN " + answer);
  });
};