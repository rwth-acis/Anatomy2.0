<?php

/* 
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * 
 *  @file not_authorized.php
 *  HTML to be included in pages where the user cannot access the content based 
 *  on insufficient user rights. E.g. a user might not be allowed to upload models,
 *  then this page is included in upload.php.
 * 
 *  WARNING: $accessControl has to be instantiated in the calling 
 */

// $accessControl has to be instantiated in the calling HTML page.
// Will retrieve an error code for the access control problem.
$status = $accessControl->getLastErrorStatus();

// Create a human understandable error description for the error code in $status
switch($status) {
  case USER_STATUS::NO_SESSION:
    $err_msg = 'This feature can only be used as a lecturer. If you are a lecturer, please click the "Sign in" button to log in.';
    break;
  case USER_STATUS::LAS2PEER_CONNECT_ERROR:
    $err_msg = 'Unable to check your login, sorry!';
    break;
  case USER_STATUS::OIDC_UNAUTHORIZED:
    $err_msg = 'Your logindata is invalid. Probably the session has expired and you have to login again.';
    break;
  case USER_STATUS::OIDC_ERROR:
    $err_msg = 'Some error with your account-validation occured, sorry!';
    break;
  case USER_STATUS::DATABASE_ERROR:
    $err_msg = 'Your tutor-status could not be checked, sorry! You may try again later.';
    break;
  case USER_STATUS::USER_NOT_CONFIRMED:
    $err_msg = 'At the moment, you do not have a lecturer account. If you are a lecturer, you can request your account being upgraded to a lecturer account by clicking the "I am a lecturer!" button.';
    break;
  case USER_STATUS::USER_IS_TUTOR:
    $err_msg = '';
    break;
  case USER_STATUS::USER_NOT_CREATOR_COURSE:
    $err_msg = 'Someone else created this course. Only the creator is able to modify or delete this course.';
    break;
}

// Show the error only for certain error states
switch($status) {
	case USER_STATUS::NO_SESSION:
	case USER_STATUS::LAS2PEER_CONNECT_ERROR:
	case USER_STATUS::OIDC_UNAUTHORIZED:
	case USER_STATUS::OIDC_ERROR:
	case USER_STATUS::DATABASE_ERROR:
  case USER_STATUS::USER_NOT_CONFIRMED:
  case USER_STATUS::USER_NOT_CREATOR_COURSE:
		// show error
		?>
<div class="alert alert-danger" role="alert"><p><?php echo $err_msg?></p></div>
		<?php
}
    
// Show a login button if the problem is, that the user is not yet logged in.
switch($status) {		
	case USER_STATUS::NO_SESSION:
	case USER_STATUS::OIDC_UNAUTHORIZED:
		// render oidc-button
		?>
		<script src="../js/signin_callbacks.js"></script>
		<span id="signinButton">
			<span class="oidc-signin"
				data-callback="signinCallback"
				data-name="Learning Layers"
				data-logo="https://raw.githubusercontent.com/learning-layers/LayersToolTemplate/master/extras/logo.png"
				data-server="https://api.learning-layers.eu/o/oauth2"
				data-clientid=<?php echo($oidcClientId); ?>
				data-scope="openid phone email address profile">
			</span>
		</span>
		<p></p>
		<script>
			(function() {
				var po = document.createElement('script'); 
				po.type = 'text/javascript'; 
				po.async = true;
				po.src = '../js/oidc-button.js';
				var s = document.getElementsByTagName('script')[0]; 
				s.parentNode.insertBefore(po, s);
			})();
		</script>
		<?php
}

// If the user does not have a lecturer account (instead he just has a standard 
// student account), show some info on how to upgrade to a lecturer account
switch($status) {
	case USER_STATUS::USER_NOT_CONFIRMED:
		// show button to request confirmation as tutor
		?>
			<div class="featured-box" id="div_lecturer_registration">
        <button class="login login-submit btn btn-success btn-block" id="btn_request_lecturer">I am a lecturer</button>
		    <p>
		      <b>How does upgrading to a lecturer account work?</b> <br>
		      Our admins will check whether you are a lecturer. If you are, they will upgrade your account to a lecturer account. Once your account has been upgraded, you will be informed by mail.
        </p>
        <p>
          <b>What benefits do I have when using a lecturer account?</b><br>
          A lecturer account is required for creating your own courses, uploading models and presenting models in lecturer mode.
        </p>
      </div>
		<?php
}