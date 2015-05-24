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
 * @file register_success.php
 * Webpage with information what happens next after successfully creating an account.
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

  <!-- User information text -->
	<section class="container">
		<div class="row flat">
			<div class="login-card">
				<h3 class="text-center">Your account has been successfully created</h3>
        <b>Please contact</b> a 3DModels administrator of your university. The administrator will
        enable your account. Afterwards, you can login with lecturer rights.
        <br> <br>
        <b>Why is a confirmation needed?</b> <br>
        Your account enables functionality that is restricted to be used by lecturers only. The administrator therefore makes sure, that
        only lecturers have an account.
      </div>
    </div>
	</section>

	<?php include("footer.php"); ?>

	<!-- JavaScript libs are placed at the end of the document so the pages load faster -->
	<script src="../js/custom.js"></script>
</body>
</html>
