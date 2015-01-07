<!DOCTYPE html>
<html>
  <head>
    <title>Collaborative 3D Model Viewer</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
     <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
  </head>

  <body>
    <?php include("menu.html"); ?>

    <!--<div class="row">
      <h2>Models</h2>
    </div>-->
    
    <!-- Build model table -->
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
        "<div class='col-md-6 overview-entry'>
          <a href='model_viewer.php?id=$entry->id'>
            <img src='../../$entry->preview_url' alt=$entry->name class='img-responsive img-fit'>
            <h3>$entry->name</h3>
          </a>
          <p><b>Model Name:</b> $entry->name</p>
            <p><b>Category:</b> $entry->classification</p>
            <p><b>Size:</b> $entry->size</p>
            <p><b>Upload Date:</b> $entry->upload_date</p>
            <p><b>Description:</b> $entry->description</p>
        </div>";

        $i++;
      }
      $html .= '</div>';

      echo $html;
    ?>

    <?php include("footer.html"); ?>

  </body>
</html>
