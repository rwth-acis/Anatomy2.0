<?php
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
 * @file login.php
 * Webpagesection OIDC-button.
 */

$isTutor = false;

abstract class USER_STATUS
{
    const NO_SESSION = 0;
    const LAS2PEER_CONNECT_ERROR = 1;
    const OIDC_UNAUTHORIZED = 2;
    const OIDC_ERROR = 3;
    const DATABASE_ERROR = 4;
    const USER_NOT_CONFIRMED = 5;
    const USER_IS_TUTOR = 6;
}

$status = -1;

// fake login
//$_SESSION['access_token'] = '1234abcd';
//$_SESSION['sub'] = '8f55-3f84d7524753';
//FB::log($_SESSION);
$userProfile = new stdClass();
$userProfile->access_token = $_SESSION['access_token'];
$userProfile->sub = $_SESSION['sub'];

if(!isset($_SESSION['access_token'])) {
	$status = USER_STATUS::NO_SESSION;
} else {
	// following is not needed for fake login
	// require '../config/config.php';
	require '../php/tools.php';
	//
	// $aRes = httpRequest("GET", $las2peerUrl.'/'.'user'.'?access_token='.$_SESSION['access_token']);	
	//
	// if($aRes->bOk == FALSE) { $status = USER_STATUS::LAS2PEER_CONNECT_ERROR;
	// } else if($aRes->iStatus === 401) { $status = USER_STATUS::OIDC_UNAUTHORIZED;
	// } else if($aRes->iStatus !== 200) { $status = USER_STATUS::OIDC_ERROR;
	// } else {
	//	// OIDC is OK
	//	// check if user is confirmed as tutor
	//	$userProfile = json_decode($aRes->sMsg);
		$r = checkUserConfirmed($userProfile->sub);
		if($r->bErr) {
			$status = USER_STATUS::DATABASE_ERROR;
			error_log($r->sMsg);
		} else if(!$r->bIsConfirmed) {
			$status = USER_STATUS::USER_NOT_CONFIRMED;
		} else {
			$status = USER_STATUS::USER_IS_TUTOR;
		}
	// }
	
	// DEBUG:
	// if($aRes->bOk == FALSE or $aRes->iStatus !== 200) {
	// 	error_log('3dnrt/user call unsuccessfull: '.$aRes->sMsg);
	// }
}

switch($status) {
	case USER_STATUS::NO_SESSION:
		$err_msg = 'You did not login.';
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
		$err_msg = 'You are not recognised as tutor. If you want to, you can send an email to the admins and they may confirm you as tutor.';
		break;
	case USER_STATUS::USER_IS_TUTOR:
		$err_msg = '';
		break;
}
	
switch($status) {
	case USER_STATUS::NO_SESSION:
	case USER_STATUS::LAS2PEER_CONNECT_ERROR:
	case USER_STATUS::OIDC_UNAUTHORIZED:
	case USER_STATUS::OIDC_ERROR:
	case USER_STATUS::DATABASE_ERROR:
	case USER_STATUS::USER_NOT_CONFIRMED:
		// show error
		?>
		<div class="alert alert-danger" role="alert"><?php echo $err_msg?></div>
		<?php
}

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

switch($status) {
	case USER_STATUS::USER_NOT_CONFIRMED:
		// show button to request confirmation as tutor
		?>
		<button id="sendEmail">Send Email (Please push only one time.)</button>
		<div id="emailConfirmation"></div>
		<script>
			document.getElementById('sendEmail').innerHtml = "Resend Email";
			document.getElementById('emailConfirmation').innerHrml = "Email succesfully sent!";
		</script>
		<?php
}

switch($status) {
	case USER_STATUS::USER_IS_TUTOR:
		$isTutor = true;
}

