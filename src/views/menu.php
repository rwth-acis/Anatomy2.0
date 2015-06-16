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
 * @file menu.php
 * Navigation bar with links to other pages.
 */
?>
<?php
/*ob_start();
  Debugging with FireBug+FirePHP
  require_once '../php/fb.php';*/
  session_start();
  require '../config/config.php'; 
?>
  <!-- Ajax helper script for menu_logged_in.js / menu_logged_out.js -->
  <script src="../js/ajax.js" type="text/javascript"></script>
  <!-- Functionality for login button (depends whether user is logged in or not) -->
  
  <!-- Bootstrap and JQuery also required for dropdown menu if screen size is small -->
  <!-- import jQuery for AJAX calls (must) -->
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
  <!-- import Bootstrap for responsive UI (must) -->
  <script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
  <!-- import JWS and JSRSASIGN (must) -->
  <script type="text/javascript" src="../js/jsjws/jws-2.0.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/ext/base64.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/ext/jsbn.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/ext/jsbn2.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/ext/rsa.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/ext/rsa2.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/asn1hex-1.1.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/base64x-1.1.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/crypto-1.1.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/rsapem-1.1.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/rsasign-1.2.min.js"></script>
  <script type="text/javascript" src="../js/jsrsasign/x509-1.1.js"></script>


	<script src="../js/tools.js" type="text/javascript"></script>
	<script type="text/javascript" src="../js/signin_callbacks.js"></script>

  <div class='navbar navbar-inverse'>
    <div class='container'>
      <div class='navbar-header'>
        <!-- Button for smallest screens -->
<?php
  //Decide if this site is inside a separate widget
  if(isset($_GET["widget"]) && $_GET["widget"] == "true")
  {
    //we have to link to the widget versions:
    print("
        <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#henm-nav-bar'>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>
        </button>
        <img src='../images/logo.png' class='head-logo' alt='HENM: 3D Models'>
      </div>
      <div id='henm-nav-bar' class='collapse navbar-collapse'>
        <ul class='nav navbar-nav pull-right mainNav'>
	        <li><a href='welcome.php?widget=true'>Home</a></li>
          <li><a href='subjects.php?widget=true'>Courses</a></li>
          <li><a href='overview.php?widget=true'>Gallery</a></li>
          <li><a href='help.php?widget=true'>Help</a></li>");
  }
  else
  {
    //we have to link to the non-widget versions:
    print("
        <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#henm-nav-bar'>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>
        </button>
        <img src='../images/logo.png' class='head-logo' alt='HENM: 3D Models'>
      </div>
      <div id='henm-nav-bar' class='collapse navbar-collapse'>
        <ul class='nav navbar-nav pull-right mainNav'>
	        <li><a href='welcome.php'>Home</a></li>
          <li><a href='subjects.php'>Courses</a></li>
          <li><a href='overview.php'>Gallery</a></li>
          <li><a href='help.php'>Help</a></li>");
  }
?>
          <li>
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
          </li>
        </ul>
      </div>
    </div>
  </div>
  <script type="text/javascript">
  (function() {
    var po = document.createElement('script'); 
    po.type = 'text/javascript'; 
    po.async = true;
    po.src = '../js/oidc-button.js';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(po, s);
  })();
  </script>
