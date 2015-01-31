<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collaborative 3D Model Viewer</title>

    <!-- X3Dom includes -->
    <script type='text/javascript' src='http://www.x3dom.org/download/x3dom.js'> </script>

    <!-- Init communication with wrapper -->
    <script type='text/javascript' src='../js/init-subsite.js'> </script>

    <script type='text/javascript' src='../js/x3d-extensions.js'> </script>
    <script type='text/javascript' src='../js/viewer.js'> </script>
    <link type='text/css' rel='stylesheet' href='http://www.x3dom.org/download/x3dom.css'> </link>

    <link rel='stylesheet' type='text/css' href='../css/model_viewer.css'></link>

    <!-- Additional styles -->
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <link rel='stylesheet' type='text/css' href='../css/style.css'>

    <!-- Custom styles-->
    
    <link rel="stylesheet" href="../css/bootstrap-theme.css" media="screen">
    <link rel="stylesheet" type="text/css" href="../css/da-slider.css" />
    <link rel="stylesheet" href="../css/style.css">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="../js/html5shiv.js"></script>
    <script src="../js/respond.min.js"></script>
    <![endif]-->
    

    <!-- General functionality (used in menuToolbar.js) -->
    <script type="text/javascript" src="../js/tools.js"></script>
    <!-- The library for the copy to clipboard feature in the toolbar -->
    <script type="text/javascript" src="../js/ZeroClipboard.js"></script>
  </head>

  <body>
    <?php include("menu.php"); ?>
  
    <div class="row" style="position:relative; padding-left:5%; padding-right:5%">
<!--          <?php
             //Decide if this site is inside a separate widget
             if(isset($_GET["widget"]) && $_GET["widget"] == "true")
             {
                 print("<script type='text/javascript' src='../js/model-viewer-widget.js'> </script>");
             }
          ?>
-->          
      <?php
        include '../php/db_connect.php';
        include '../php/tools.php';
        
        $arg    = $_GET["id"];
        $query  = $db->query("SELECT * FROM courses WHERE id = $arg");
        $entry = $query->fetchObject();
        echo "<p><b>$entry->name</b></p>
        <img src=$entry->img_url alt=$entry->name class='img-responsive img-fit'>
        <a href=$entry->role_url>Go to ROLE space</a>
        <p><b>Description:</b> $entry->description</p>";

        // Show the link to edit the page only when the user who created it is logged in
        if (isset($_SESSION['user_id']) && $entry->creator == $_SESSION['user_id']) { 
          echo "<a href=editcourse.php?id=$arg>Edit your course</a>";
        }
      ?>
    </div>
    <?php
      $query = $db->query("SELECT * 
                           FROM course_models
                           INNER JOIN models ON course_models.model_id = models.id
                           WHERE course_models.course_id = $arg");
      $result = $query->fetchAll();

      $html = createTable($result,"model");
      echo $html;
            
    ?>

     <!-- JavaScript libs are placed at the end of the document so the pages load faster -->


    <script src="../js/modernizr-latest.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
    <script src="../js/jquery.cslider.js"></script>
    <script src="../js/custom.js"></script>

  </body>
</html>