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


  <!-- Build course table -->
    <div id="table-container">
    <?php
      include '../php/db_connect.php';
      $query  = "SELECT * FROM courses";
      $result = mysql_query($query);
      $i = 1;
      $html = '<div class="row">';
      while($entry = mysql_fetch_object($result))
      {
        if($i > 2 && $i % 2) {
          $html .= '</div><div class="row">';
        }
        // id and name used in overview-widget.js for highlighting
        $html .= "<div class='col-md-6 overview-entry' name='table-entry' id='table_entry$i'>";
        // id used to derive course id (from database) connected to clicked link
        $html .= "  <a href='course.php?id=$entry->id' id='a_img$i'>
            <img src=$entry->img_url alt=$entry->name class='img-responsive img-fit'>
            <h3>$entry->name</h3>
          </a>
        </div>";

        $i++;
      }
      $html .= '</div>';

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
