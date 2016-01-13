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
 * Event handler for "Upgrade to lecturer account" button in not_authorized.php
 * Sends ajax request to server to set confirmed flag. Also reads optional user 
 * data and writes sends it to our server.
 */

$(document).ready( function () {
    var btn = $('#btn_request_lecturer');
    if(btn.length > 0) {
        btn.on('click', function () {
            // This is the old info message. Here the user was informed, that an admin 
            // first had to accept the account upgrade. This is no longer required.
            //  var UPGRADE_WITH_ADMIN_INFO_TEXT = "<p>" +
            //          "A 3DModels administrator of your university <b>has been contacted</b>. The administrator will enable your account. Afterwards, you have all lecturer rights." +
            //	        "<br> <br>" +
            //	        "<b>Why is a confirmation needed?</b> <br>" +
            //	        "Your account enables functionality that is restricted to be used by lecturers only. The administrator therefore makes sure, that" +
            //	        "only lecturers have an account\n" +
            //          "</p>";

              // Using Bootstrap (button.js) to add a loading state behavior. This disables the
              // button after being clicked and shows the text "Updating.."
              var btn = $('#btn_request_lecturer');
              btn.button('loading');

              // Read optional user input
              var affiliationValue = $('#affiliation-input').val();
              var cityValue = $('#city-input').val();
              var streetValue = $('#street-input').val();
              var phoneValue = $('#phone-input').val();

              // Request server to upgrade our account to a lecturer (=tutor) account
              $.post("../php/register_as_tutor.php", 
                  {affiliation:affiliationValue, city:cityValue, street:streetValue, phone:phoneValue}, 
                  function(msg) {

                msg = JSON.parse(msg);      
                if (msg.result === true) {

                  // Refresh the current page to show its content instead of not_authorized.php
                  window.location.reload(true);
                }
                else {
                  // If upgrade was not successfull, unlock the "Upgrade to lecturer" button,
                  // such that the user can click it again.
                  btn.button('reset');
                }

              });
        });
    }
} );
