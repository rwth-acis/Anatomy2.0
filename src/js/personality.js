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
 * @file signin_callbacks.js
 * Callback for OpenID Connect.
 * See https://github.com/learning-layers/openid-connect-button for more infos
 */

var personality = {}

// Placeholder text when there is no user name
personality.ANONYMOUS_USERNAME = 'Anonymous'

/**
 * Get the username of the currently logged in user (or an anonymous label).
 * 
 * Requires oidc-button to be able to retrieve a user name (uses the oidc_userinfo variable)
 * 
 * @returns {String} the username
 */
personality.getCurrentUsername = function() {
  
  var username = personality.ANONYMOUS_USERNAME;
  
  if (oidc_userinfo !== undefined) {
    if(oidc_userinfo.given_name !== undefined && oidc_userinfo.given_name !== ''
            && oidc_userinfo.family_name !== undefined && oidc_userinfo.family_name !== '') {
      username = oidc_userinfo.given_name + ' ' + oidc_userinfo.family_name;
    }
  }
  
  return username;
}

/**
 * This is the callback function for any LL login button (oidc-button). It must be global to be used with `oidc-button.js`
 * @param {String} result message returned from LL login server
 * @returns {undefined}
 */
personality_signinCallback = function (result) {
  if(result === "success"){
  	var bRedirect = window.location.pathname.endsWith('login_callback.php')

    // When user name and password were correct, the user gets assigned a token.
    // We store the token and the login service name in a session at our server.
    // Also, the user will be stored / updated in our database.
    // fake login: As our server cannot connect to the Learning Layers server,
    // the client has to send the data (e.g. email, name) to our server.
    $.post("../php/create_user_session.php", {access_token:window.localStorage["access_token"], service_type:'LearningLayers',
      sub:oidc_userinfo.sub, email:oidc_userinfo.email, given_name:oidc_userinfo.given_name,
      family_name:oidc_userinfo.family_name}, function (result) {
      	try{
      	if(JSON.parse(result).canEnterLecturerMode) {
                $(document).ready(function() {
                    if(window.showcase.toolbar != null) {
                        showcase.toolbar.lecturerModeViewModel.canEnter(true)
                        // So far it is the same:
                        showcase.toolbar.lecturerModeViewModel.isLecturer(true)
                    }
                })
      		}
      	}	catch (e) {console.log(e)}
      	 if(bRedirect) {
				 // the LL-login page redirects to 'login_callback.php', so redirect to the last page
				 window.location.replace("../php/login_redirect.php") // redirection
			}
      } );
  } else {
    // if sign in was not successful, log the cause of the error on the console
    console.log(result);
  }
}