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
 * @file welcome.js
 * Callback for OpenID Connect
 */

var user_confirmed;

/**
 * @param {String} result message returned from LL login server
 * @returns {undefined}
 */
function signinCallback(result) {
  if(result === "success"){
    // after successful sign in, check whether the user is known to our system
    triggerUserKnownCheck(oidc_userinfo.sub, oidc_userinfo.email);
  } else {
    // if sign in was not successful, log the cause of the error on the console
    console.log(result);
  }
}

function triggerUserKnownCheck(sub, email) {
  ajax.post("../php/checkUserKnown.php", {openIdConnectSub:sub, openIdConnectEmail:email}, function(data) {
    // DEBUG
    data = JSON.parse(data);
    user_confirmed = data.confirmed;
  });
}