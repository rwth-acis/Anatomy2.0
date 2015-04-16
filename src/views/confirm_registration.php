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
  <!-- link rel="stylesheet" type="text/css" href="../css/da-slider.css" /-->
  <link rel="stylesheet" href="../css/style.css">

  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
  <script src="assets/js/html5shiv.js"></script>
  <script src="assets/js/respond.min.js"></script>
  <![endif]-->
</head>
<body>
  <?php include("menu.php"); ?>
  
  <header id="head" class="secondary">
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <h1>Account confirmed</h1>
        </div>
      </div>
    </div>
  </header>
  </br></br>
  
  <?php
	  if(isset($_GET["mail"])) {
  ?> 
  <div id="conf-reg" style="font-size:20px; padding:100px">
    <p>The account for email <b><?php echo ($_GET["mail"]); ?></b> has been unlocked. The lecturer is informed by mail, that his or her account can be used.</p>
  </div>
  <?php 
    }
  ?>
  
  <!-- Spacing for footer -->
  <div style="padding-bottom:15%"></div>
  <!-- container -->
  <?php include("footer.php"); ?>

  <!-- JavaScript libs are placed at the end of the document so the pages load faster -->
  <script src="../js/modernizr-latest.js"></script>
  <script src="../js/custom.js"></script>
</body>
</html>
