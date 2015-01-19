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

  <!-- Init communication with wrapper -->
    <script type='text/javascript' src='../js/init-subsite.js'></script>
    <?php
       //Decide if this site is inside a separate widget
       if(isset($_GET["widget"]) && $_GET["widget"] == "true")
       {
           print("<script type='text/javascript' src='../js/overview-widget.js'> </script>");
       }
    ?>

</head>
<body>
  <?php include("menu.php"); ?>

  <!-- Header -->
  <hr>
  <header id="head">
    
  </header>
  <!-- /Header -->


  <div id="courses">
    <div class="container">
  <p>&nbsp;</p>
      <div class="row">
        <div class="col-md-4">
          <div class="featured-box">
            <i class="fa fa-file fa-2x"></i>
            <div class="text">
              <h3>Courses</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="featured-box">
            <i class="fa fa-play fa-2x"></i>
            <div class="text">
              <h3>Models</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="featured-box">
            <i class="fa fa-tachometer fa-2x"></i>
            <div class="text">
              <h3>Role</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="featured-box">
            <i class="fa fa-sign-in fa-2x"></i>
            <div class="text">
              <h3>Login</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="featured-box">
            <i class="fa fa-upload fa-2x"></i>
            <div class="text">
              <h3>Upload</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="featured-box">
            <i class="fa fa-info fa-2x"></i>
            <div class="text">
              <h3>Help</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!-- container -->
  <?php include("footer.html"); ?>

  <!-- JavaScript libs are placed at the end of the document so the pages load faster -->
  <script src="../js/modernizr-latest.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
  <script src="../js/jquery.cslider.js"></script>
  <script src="../js/custom.js"></script>
</body>
</html>
