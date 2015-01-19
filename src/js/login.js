/**
 * @file login.js
 * Contains all client side logic for login functionality
 */

/**
 * Handler function for clicking the "Submit" button on login.php
 * Does an ajax post request to server (where login credentials are checked)
 */
function onClickLogin() {
  var email = document.getElementById('login_email').value;
  var password = document.getElementById('login_password').value;
  // If email or password are empty, there is no need to check credentials on server
  if (email && password) {
    // Show a little animated "loading" image
    document.getElementById('login_loader').style.display = "inline";
    // Send an ajax post request using helper functions in ajax.js
    ajax.post("../php/check_credentials.php", {login_email:email, login_password:password}, function(data) {
      // The data we receive from server is JSON encoded, so we have to decode first
      data = JSON.parse(data);
      if (data.result == 'ok') {
        document.getElementById('login_status').innerHTML = "You are now logged in as " + email;
      }
      else {
        document.getElementById('login_status').innerHTML = data.result;
      }
      // Hide the "loading" animation
      document.getElementById('login_loader').style.display = "none";
    });
  }
}

/*
 // JQuery code for further functionality taken from "https://github.com/MichaelZelensky/php_login"
$(function(){

	//login input text helpers
	var val1 = 'email';
	var val2 = 'password';
	$('input[name=login_email]')
		.val(val1)
		.focus(function(){
			$this = $(this);
			if ($this.val()==val1) {
				$this.removeClass('login_inactive').addClass('login_active');
				$this.val('');
			}
		})
		.blur(function(){
			if (!$this.val()){
				$this.removeClass('login_active').addClass('login_inactive');
				$this.val(val1);
			}
		});
	$('input[name=login_password]')
		.val(val2)
		.focus(function(){
			$this = $(this);
			if ($this.val()==val2) {
				$this.removeClass('login_inactive').addClass('login_active');
				$this.val('');
			}
		})
		.blur(function(){
			if (!$this.val()){
				$this.removeClass('login_active').addClass('login_inactive');
				$this.val(val2);
			}
		});
		
	//login submit
	$('#form_login_submit').click(function(){
	});
	ul();
	//register
	var loader_img = '<img src="/img/ajax-loader.gif">';
	var check_ok = '<span style="color:green">OK</span>';
	var check_noemail = '<span style="color:red">Must be an email!</span>';
	var check_fail = '<span style="color:red">Already exists! <a href="/register/resend.php">Resend</a> confirmation?</span>';
	var check_badpass = '<span style="color:red">Not the same!</span>';
	var old_email_val = '';
	var old_pass_val = '';
	var old_repeat_pass_val = '';
	//check password
	$('input[name=register_password]').blur(function(){
		//changed?
		if (this.value == old_pass_val) {
			return;
		} else {
			old_pass_val = this.value;
		}
		if (this.value) {
			$('#password_check').html(check_ok);
		} else {
			$('#password_check').html('');
		}
		if ($('input[name=register_password_repeat]').val()) {
			if (old_repeat_pass_val == this.value) {
				$('#repeat_password_check').html(check_ok);
			} else {
				$('#repeat_password_check').html(check_badpass);
			}
		}
	});
	//check password repeat
	$('input[name=register_password_repeat]').blur(function(){
		//changed?
		if (this.value == old_repeat_pass_val) {
			return;
		} else {
			old_repeat_pass_val = this.value;
		}
		if (this.value == old_pass_val) {
			$('#repeat_password_check').html(check_ok);
		} else {
			$('#repeat_password_check').html(check_badpass);
		}
	});
	//check email value
	$('input[name=register_email]').blur(function(){
		//changed?
		if (this.value == old_email_val) {
			return;
		} else {
			old_email_val = this.value;
		}
		//email?
		if(checkemail(this)){
			$('#email_check').html(loader_img);
			//exists already?
			$.ajax({
				type: 'POST',
				url: '/ajax/check.php',
				data: 'email=' + this.value,
				success: function(data){
					var jdata = jQuery.parseJSON(data);
					if (jdata.result=='ok') {
						$('#email_check').html(check_ok);
					} else {
						$('#email_check').html(check_fail);
					}
				}
			});
		} else {
			$('#email_check').html(check_noemail);
		};
	});
	//register submit
	$('#register_submit').click(function(){
		if (
			$('#email_check').html() == check_ok &&
			$('#repeat_password_check').html() == check_ok 
		)
    $hugo = $('#register_form').serialize();
    {
			$.ajax({
				type: 'POST',
				url: '/ajax/register.php',
				data: $('#register_form').serialize(),
				success: function(data){
					var jdata = jQuery.parseJSON(data);
					if (jdata.result=='ok') $('#registration_div').html($('#confirmation').html());
				}
			});
		}
	});
	$('#password_reset_submit').click(function(){$('#form_password_reset').submit()});
	$('#confirmation_resend_submit').click(function(){$('#form_confirmation_resend').submit()});
	$('h1').click(function(){location.href='/'});
})
function ul(){
	//logout
	$('#user_logout').click(function(){
		$.ajax({
			url: "/ajax/logout.php",
			success: function(){
				document.location.reload();
			}
		});
	});
}
function checkemail(obj){
	var str=obj.value;
	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	if (filter.test(str)) {
		testresults=true;
	} else{
		testresults=false
	}
	return (testresults)
}*/