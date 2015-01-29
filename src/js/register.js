/**
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
 * Event handler for register (=create account) button in register.php
 * Ajax request to server will trigger logging out. Afterwards the 
 * page is reloaded (with content for user that is not signed in).
 */
function onRegisterClicked() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var password_conf = document.getElementById('password_conf').value;
  
  // Show a little animated "loading" image
  document.getElementById('register_loader').style.display = "inline";
  ajax.post("../php/register.php", {register_email:email, register_pw:password}, function(msg) {
    console.log(msg);
    msg = JSON.parse(msg);
    if (msg.result === "ok") {
      window.location.href = "register_success.php";
    }
    else {
      document.getElementById('error').innerHTML = "An account for this email address already exists.";
    }
    document.getElementById('register_loader').style.display = "none";    
  });
}

/// Call initialize for menu when DOM loaded
document.addEventListener('DOMContentLoaded', initRegister, false);
