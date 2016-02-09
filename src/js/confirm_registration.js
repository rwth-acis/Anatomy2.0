/**
 * @file confirm_registration.js
 * Invokes a request to server, such that an account is confirmed in the database
 */

/// When DOM is loaded, a request to server is sent to confirm a lecturer account
$(document).ready(function(){
  
  // Send a post request to server to confirm a user/account in database
  var email = URI().query(true).mail;
  $.post("../php/confirm_registration.php", {mail:email}, function(msg) {
    msg = JSON.parse(msg);
    // Redirect to "success" page if account creation was successfull
    if (msg.result === "ok") {
      $('#conf-text').html( "The account for email <b>" + email + "</b> has been unlocked. The lecturer is informed by mail, that his or her account can be used." )
    }
    // Otherwise show an error message. At the moment the only known error is, that the account already exists.
    else {
      $('#conf-text').html(msg.error)
    }
    // Hide "loading" animation
    $('#loader').css('display', "none");    
  });
});