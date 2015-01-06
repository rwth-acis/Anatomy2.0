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
        "<div class='col-md-6'>
          <a href='model_viewer.php?id=$entry->id'>
            <img src='../../$entry->preview_url' alt=$entry->name class='img-responsive img-fit' align='left'>
            <h3>$entry->name</h3>
          </a>
          <p><b>Model Name:</b>$entry->name</p>
            <p><b>Category:</b>$entry->classification</p>
            <p><b>Size:</b> 18,431 Triangles</p>
            <p><b>Upload Date:</b>$entry->upload_date</p>
            <p><b>Description:</b> Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video.</p>
        </div>";

        $i++;
      }
      $html .= '</div>';

      echo $html;
    ?>

    <?php include("footer.html"); ?>

  </body>
</html>
