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
 * @file register.php
 * Webpage for creating a new account
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Collaborative Viewing of 3D Models </title>
  
	<link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../css/bootstrap.min.css">
	<link rel="stylesheet" href="../css/font-awesome.min.css">
	<link rel="stylesheet" href="../css/bootstrap-theme.css" media="screen">
	<link rel="stylesheet" type="text/css" href="../css/da-slider.css" />
	<link rel="stylesheet" href="../css/style.css">
  <!-- Styles form validation -->
  <link rel='stylesheet' type='text/css' href='../css/upload.css'>
</head>
<body>
  <?php
    include("menu.php");
  ?>

	<header id="head" class="secondary">
		<div class="container">
			<div class="row">
				<div class="col-sm-8">
					<h1>Create lecturer account</h1>
				</div>
			</div>
		</div>
	</header>
  </br></br>

	<section class="container">
    <!-- User input elements -->
		<div class="row flat">
			<div class="login-card">
				<h3 class="text-center">Register</h3>
        <div id="login">
          <form id="form_login">
            <input type="text" id="email" placeholder="Email" data-parsley-required="true" data-parsley-type="email"/>
            <input type="password" id="password" placeholder="Password" data-parsley-required="true" data-parsley-minlength="7"/>
            <input type="password" id="password_conf" placeholder="Confirm password" data-parsley-required="true" data-parsley-minlength="7" data-parsley-equalto="#password"/>
            <input type="button" id="btn_register" name="login" class="login login-submit" value="Create account">
            <img src="../images/ajax-loader.gif" style="display:none" id="register_loader">
          </form>
        </div>
        <div id="error">
        </div>
      </div>
    </div>
    <!-- Some user information text -->
    <div class="login-card">
      <b>What is the purpose of a 3DModels account?</b> <br>
      The account is required only for creating your own courses, uploading models and presenting models in <i>lecturer mode</i>.
      <b>As a student, you do not need to register.</b>
    </div>
	</section>

	<?php include("footer.php"); ?>

	<!-- JavaScript libs are placed at the end of the document so the pages load faster -->
  <!-- Registration functionality -->
	<script src="../js/ajax.js" type="text/javascript"></script>
	<script src="../js/register.js" type="text/javascript"></script>
  <!-- Styling and JQuery -->
	<script src="../js/custom.js"></script>
  <!-- Form validation with Parsley -->
  <script src="../js/parsley.min.js"></script>
</body>
</html>
