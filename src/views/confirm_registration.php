<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collaborative Viewing of 3D Models </title>
  <link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
  <link rel="stylesheet" href="../css/font-awesome.min.css">
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
    <p id="conf-text">A confirmation request was sent for <?php echo($GET["mail"]); ?>. This should take only a few seconds.</p>
    <img src="../images/ajax-loader.gif" id="loader">
  </div>
  <?php 
    }
  ?>
  
  <!-- Spacing for footer -->
  <div style="padding-bottom:15%"></div>
  <!-- container -->
  <?php include("footer.php"); ?>

  <!-- JavaScript libs are placed at the end of the document so the pages load faster -->
  <!-- Sending the confirmation request on load -->
  <script src="../js/confirm_registration.js" type="text/javascript"></script>
  <script src="../js/modernizr-latest.js" type="text/javascript"></script>
  <script src="../js/custom.js" type="text/javascript"></script>
</body>
</html>
