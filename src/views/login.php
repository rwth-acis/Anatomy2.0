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
 * Webpage for entering login credentials.
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

	<?php
		//Decide if this site is inside a separate widget
		if(isset($_GET["widget"]) && $_GET["widget"] == "true") {

		}
		else {
			echo '
			<header id="head" class="secondary">
				<div class="container">
					<div class="row">
						<div class="col-sm-8">
							<h1>Login</h1>
						</div>
					</div>
				</div>
			</header>
		</br></br>';
		}
	?>

	<section class="container">
		<div class="row flat">
			<div class="login-card">
				<h3 class="text-center">Login</h3>

        <?php if (isset($_SESSION['user_id'])) { ?>
        <div id="login_status">You are logged in as <?php echo($_SESSION['user_email']) ?>.</div>
        <?php } else { ?>
        <div id="login">
          <form id="form_login">
            <input type="text" id="login_email" placeholder="User-email"/>
            <input type="password" id="login_password" placeholder="Password"/>
            <input type="button" id="form_login_submit" name="login" class="login login-submit" value="Login" onClick="onClickLogin()">
            <img src="../images/ajax-loader.gif" style="display:none" id="login_loader">
            <div class="login-help">
              <a href="register.php"><p>Create account</p></a>
            </div>
          </form>
        </div>
        <div id="login_status"></div>
        <?php } ?>

      </div>
    </div>
	</section>
  
  <?php include("footer.php"); ?>

	<!-- JavaScript libs are placed at the end of the document so the pages load faster -->
	<script src="../js/custom.js"></script>
	<?php
	   //Decide if this site is inside a separate widget
	   if(isset($_GET["widget"]) && $_GET["widget"] == "true")
	   {
	       //we have to link to the widget versions:
	       print("<script type='text/javascript' src='../js/init-subsite.js'></script>");
	   }
	?>	
	<script src="../js/ajax.js" type="text/javascript"></script>
	<script src="../js/login.js" type="text/javascript"></script>
</body>
</html>
