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
 * @file registration.js
 * Contains all client side logic for upgrading user accounts to lecturer accounts
 */

/**
 * Initializes login.php
 * @returns {undefined}
 */
function initLogin() {
  var btn = document.getElementById('btn_request_lecturer');
  if(btn !== null) {
    btn.addEventListener('click', onRequestLecturerClick, false);
  }
}

/**
 * Event handler for register (=create account) button in register_as_tutor.php
 * Sends ajax request to server to create account.
 */
function onRequestLecturerClick() {
  
//  var UPGRADE_WITH_ADMIN_INFO_TEXT = "<p>" +
//          "A 3DModels administrator of your university <b>has been contacted</b>. The administrator will enable your account. Afterwards, you have all lecturer rights." +
//	        "<br> <br>" +
//	        "<b>Why is a confirmation needed?</b> <br>" +
//	        "Your account enables functionality that is restricted to be used by lecturers only. The administrator therefore makes sure, that" +
//	        "only lecturers have an account\n" +
//          "</p>";
  
  $('loader').removeClass('hidden');
  
    ajax.post("../php/register_as_tutor.php", {}, function(msg) {
      
      msg = JSON.parse(msg);      
      if (msg.result === true) {

        // Refresh the current page to show its content instead of not_authorized.php
			  window.location.reload(true);
      }
      $('loader').addClass('hidden');
      
    });
  }

/// Call initialize for registration when DOM loaded
document.addEventListener('DOMContentLoaded', initLogin, false);

