﻿/**
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
 * @file register.js
 * Handles client side of user (lecturer) registration
 */

 /**
  * Add event listener for registration
  */
function initRegister() {
  btn = document.getElementById('btn_register');
  
  btn.addEventListener('click', onRegisterClicked, false);
  
  // Activate input validation (this is JQuery code)
  $('#form_login').parsley().validate();
}

/**
 * Event handler for register (=create account) button in register_as_tutor.php
 * Sends ajax request to server to create account.
 */
function onRegisterClicked() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  if ($('#form_login').parsley().isValid()) {
    // Show a little animated "loading" image
    document.getElementById('register_loader').style.display = "inline";
    // Send a post request to server to create a new user in database
    ajax.post("../php/register_as_tutor.php", {register_email:email, register_pw:password}, function(msg) {
      msg = JSON.parse(msg);
      // Redirect to "success" page if account creation was successfull
      if (msg.result === "ok") {
        window.location.href = "register_success.php";
      }
      // Otherwise show an error message. At the moment the only known error is, that the account already exists.
      else {
        document.getElementById('error').innerHTML = "An account for this email address already exists.";
      }
      // Hide "loading" animation
      document.getElementById('register_loader').style.display = "none";    
    });
  }
}

/// Call initialize for registration when DOM loaded
document.addEventListener('DOMContentLoaded', initRegister, false);
