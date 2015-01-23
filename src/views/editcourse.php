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
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/editcourse.css">
  <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
  <script src="../js/editcourse.js"></script>

  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
  <script src="assets/js/html5shiv.js"></script>
  <script src="assets/js/respond.min.js"></script>
  <![endif]-->

  <!-- Init communication with wrapper -->
   <!-- <script type='text/javascript' src='../js/init-subsite.js'></script>
    <?php
       //Decide if this site is inside a separate widget
       if(isset($_GET["widget"]) && $_GET["widget"] == "true")
       {
           print("<script type='text/javascript' src='../js/overview-widget.js'> </script>");
       }
    ?>-->

</head>
<body>
  <?php include("menu.php"); ?> 

  <!-- Button to create a new course -->
  <p><a class="btn btn-primary btn-lg" href="upload.php" target="blank" role="button">Upload models</a></p>
  <input type="button" id="addcourse" value="Add models" />

  <!-- Darken background when model select window appears -->
  <div id="blackout"></div>

  <!-- Show models in a popup -->
  <div id="modelbox">
    <div id="closebox">close</div>
    <?php 

      include '../php/db_connect.php';
      include '../php/tools.php';
      $query  = $db->query("SELECT * FROM models");
      $result = $query->fetchAll();

      $html = createTable($result,"model");
      echo $html;

    ?>
  </div>
  
  <!-- /container -->
  <?php include("footer.html"); ?>
  

  <!-- JavaScript libs are placed at the end of the document so the pages load faster -->


  <script src="../js/modernizr-latest.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
  <script src="../js/jquery.cslider.js"></script>
  <script src="../js/custom.js"></script>

</body>
</html>

