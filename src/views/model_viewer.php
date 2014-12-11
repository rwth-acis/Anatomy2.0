<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' charset='utf8'/>
    <title>Collaborative 3D Model Viewer</title>

    <!-- X3Dom includes -->
    <script type='text/javascript' src='http://www.x3dom.org/download/x3dom.js'> </script>
    <script type='text/javascript' src='../js/viewer.js'> </script>
    <link type='text/css' rel='stylesheet' href='http://www.x3dom.org/download/x3dom.css'> </link> 
    <link rel='stylesheet' type='text/css' href='../css/model_viewer.css'></link>

    <!-- Additional styles -->
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <link rel='stylesheet' type='text/css' href='../css/style.css'>

    <!-- Init communication with wrapper -->
    <script type='text/javascript' src='../js/init-subsite.js'> </script>

    <script>
      var init = function (evt) {
        document.getElementById('viewer_object').runtime.showAll();
      };
    </script>
  </head>

  <body>
    
    <?php include("menu.html"); ?>


    <!-- <h1>Model Inspector</h1> -->

    <div class="row" style="position:relative; left:60px">
      <p id='debugText'></p>
      <x3d id='viewer_object' showStat="true">
        <scene>
          <navigationInfo headlight="true"></navigationInfo>
          <background skyColor='0.0 0.0 0.0'> </background>
      <?php
        include '../php/db_connect.php';
        $arg    = $_GET["id"];
        $query  = "SELECT data_url FROM models WHERE id = $arg";
        $result = mysql_query($query);
        $entry  = mysql_fetch_object($result);
        echo "<inline url=\"../../$entry->data_url\" onload=\"init()\"> </inline>";
      ?>

          <viewpoint id="viewport" DEF="viewport" centerOfRotation="0 0 0" position="0.00 0.00 5.00" orientation="-0.92 0.35 0.17 0.00" fieldOfView="0.858"> </viewpoint>
        </scene>
      </x3d>
      <?php
        $arg    = $_GET["id"];
        $query  = "SELECT * FROM models WHERE id = $arg";
        $result = mysql_query($query);
        $entry  = mysql_fetch_object($result);
        echo "<div id='metadata_overlay'>
          <div class='x3dom-states-head'> </div>
          <div class='x3dom-states-item-title'>Name:</div>
          <div class='x3dom-states-item-value'>$entry->name</div> <br>
          <div class='x3dom-states-item-title'>Classification:</div>
          <div class='x3dom-states-item-value'>$entry->classification</div> <br>
          <div class='x3dom-states-item-title'>Description:</div>
          <div class='x3dom-states-item-value'>$entry->description</div> <br>
          <div class='x3dom-states-item-title'>Upload Date:</div>
          <div class='x3dom-states-item-value'>$entry->upload_date</div> <br>
          <div class='x3dom-states-item-title'><a href=\"../../$entry->data_url\">Download</a></div>
          </div>";
      ?>
    </div>

    <?php include("footer.html"); ?>

    </div>
  </body>
</html>
