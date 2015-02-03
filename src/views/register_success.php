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
	<script src="../js/modernizr-latest.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
	<script src="../js/custom.js"></script>

</body>
</html>
