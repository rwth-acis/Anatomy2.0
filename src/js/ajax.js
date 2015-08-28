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
 * @file ajax.js
 * This code simplifies ajax requests to a server.
 * The code is taken from http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
 */

var ajax = {};

/**
 * Used in ajax.send to create the XMLHttpRequest object 
 */
ajax.x = function() {
  if (typeof XMLHttpRequest !== 'undefined') {
      return new XMLHttpRequest();  
  }
  var versions = [
      "MSXML2.XmlHttp.5.0",   
      "MSXML2.XmlHttp.4.0",  
      "MSXML2.XmlHttp.3.0",   
      "MSXML2.XmlHttp.2.0",  
      "Microsoft.XmlHttp"
  ];

  var xhr;
  for(var i = 0; i < versions.length; i++) {  
      try {  
          xhr = new ActiveXObject(versions[i]);  
          break;  
      } catch (e) {
      }  
  }
  return xhr;
};

/**
 * Helper function for ajax.get and ajax.post. Do not use directly!
 */
ajax.send = function(url, callback, method, data) {
  var x = ajax.x();
  x.open(method, url, true);
  x.onreadystatechange = function() {
    if (x.readyState == 4) {
      callback(x.responseText)
    }
  };
  if (method == 'POST') {
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  x.send(data)
};

/**
 * Sends an ajax GET request to server.
 * @param url path to php file which contains server logic
 * @param data data that has to be transmitted to server as key-value pairs (e.g.: {key1:'val1', key2:valFromVariable}
 * @param callback the callback function that is called after receiving server answer
 */
ajax.get = function(url, data, callback) {
  var query = [];
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  ajax.send(url + '?' + query.join('&'), callback, 'GET', null)
};

/**
 * Sends an ajax POST request to server.
 * @param url path to php file which contains server logic
 * @param data data that has to be transmitted to server as key-value pairs (e.g.: {key1:'val1', key2:valFromVariable}
 * @param callback the callback function that is called after receiving server answer
 */
ajax.post = function(url, data, callback) {
  var query = [];
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  ajax.send(url, callback, 'POST', query.join('&'))
};