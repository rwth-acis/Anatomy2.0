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
 * @file toolbar.php
 * Toolbar with controls for the viewer navigation and other viewer functionality
 * 
 * REQUIRES JQuery and Bootstrap.js to be included before, if not in ROLE environment.
 * Is included in menu.php
 */
?>
<?php
  // If outside ROLE environment, menu.php will start a session.
  // So start session only if inside ROLE.
  if(isset($_GET["widget"]) && $_GET["widget"] == "true") {
    session_start();
  }
  require_once '../config/config.php'; 
?>

<!-- JS includes of menu toolbar functionality -->
<?php 
  // If widget parameter is set, the this is a widget in ROLE environment. 
  // Therefore menu.php is not included. Then, JQuery and bootstrap.js are also 
  // missing. Include here. Make sure not to include twice, because this will 
  // break the menu.
  if(isset($_GET["widget"]) && $_GET["widget"] == "true") {
?>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
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
  <script src="../js/signin_callbacks.js"></script>
<?php
  }
?>
<script type="text/javascript" src="../js/menuToolbar.js"></script>


<!-- Toolbar -->
<nav class="navbar toolbar navbar-inverse" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">3-D Model Viewer</a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li role="presentation" class="dropdown navbar-li">
          <select id="viewModeSelect" onChange="x3dChangeView()" class="form-control navbar-select">
            <!-- option>[W]alk</option>
            <option id="optionExamine">[E]xamine</option>
            <option>[F]ly</option>
            <option>[H]elicopter</option>
            <option>[L]ookAt</option>
            <option>[T]urntable</option>
            <option>[G]ame</option -->
          </select>
        </li>
        <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" onclick="showAll()">Reset view [A]</button></li>
      <?php
        // If and only if inside ROLE environment, show the synchronize / unsynchronize button
        if(isset($_GET["widget"]) && $_GET["widget"] == "true") {
      ?>
          <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" onclick="x3dSynchronize()" id="btnSynchronize">Unsynchronize</button></li>
      <?php
          }
      ?>
        <!-- Took out the copy link button, because it is not natively supported by browsers. Requires Flash Player. And has little use. -->
        <!--<li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" id="btnCopy">Copy Link</button></li>-->
        <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" onclick="btnShowInfo()" id="btnInfo">Show info</button></li>
        <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" onclick="showHelp()" id="btnHelp">Show help</button></li>
        <!-- Show lecturer mode button only if user logged in (as lecturer) and in ROLE environment -->
        <?php
          ob_start();
          require '../php/access_control.php';
          $accessControl = new AccessControl();
          $canEnterLecturerMode = $accessControl->canEnterLecturerMode();          
          ob_end_clean(); 
          
          if ($canEnterLecturerMode && (isset($_GET["widget"]) && $_GET["widget"] == "true")) { 
        ?>
        <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" onclick="toggleLecturerMode()" id="btnLecturerMode">Enable Lecturer Mode</button></li>
        <?php 
          }
        ?>
        <script>console.log("Change 1");</script>
        <li class="navbar-li">
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
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

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
