<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Collaborative Viewing of 3D Models </title>
	<link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../css/bootstrap.min.css">
	<link rel="stylesheet" href="../css/font-awesome.min.css">

	<!-- Custom styles-->
	
	<link rel="stylesheet" href="../css/bootstrap-theme.css" media="screen">
	<link rel="stylesheet" type="text/css" href="../css/da-slider.css" />
	<link rel="stylesheet" href="../css/style.css">

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="assets/js/html5shiv.js"></script>
	<script src="assets/js/respond.min.js"></script>
	<![endif]-->

	<script src="../js/ajax.js" type="text/javascript"></script>
	<script src="../js/login.js" type="text/javascript"></script>

</head>
<body>
  <?php
    include("menu.php");
  ?> 

	<header id="head" class="secondary">
		<div class="container">
			<div class="row">
				<div class="col-sm-8">
					<h1>Login</h1>
				</div>
			</div>
		</div>
	</header>
</br></br>
	<!-- container -->

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

	<?php include("footer.php"); ?>

	</section>

	<!-- JavaScript libs are placed at the end of the document so the pages load faster -->
	<script src="../js/modernizr-latest.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
	<script src="../js/custom.js"></script>

</body>
</html>
