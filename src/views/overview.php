<!DOCTYPE html>
<html>
  <head>
    <title>Collaborative 3D Model Viewer</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
     <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
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
    <?php include("menu.html"); ?>

    <!--<div class="row">
      <h2>Models</h2>
    </div>-->
    
    <!-- Build model table -->
    <div id="table-container">
    <?php
      include '../php/db_connect.php';
      $query  = "SELECT * FROM models";
      $result = mysql_query($query);
      $i = 1;
      $html = '<div class="row">';
      while($entry = mysql_fetch_object($result))
      {
        if($i > 2 && $i % 2) {
          $html .= '</div><div class="row">';
        }
        $html .= 
        "<div class='col-md-6' name='table-entry'>
          <a href='model_viewer.php?id=$entry->id' id='a_img$i'>
            <img src='../../$entry->preview_url' alt=$entry->name class='img-responsive img-fit'>
            <h3>$entry->name</h3>
          </a>
        </div>";

        $i++;
      }
      $html .= '</div>';

      echo $html;
    ?>
    </div>

    <?php include("footer.html"); ?>

  </body>

</html>
