<!DOCTYPE html>
<html>
  <head>
    <title>Collaborative 3D Model Viewer</title>
    <meta charset='utf-8'/>
    <script type='text/javascript' src='http://www.x3dom.org/download/x3dom.js'> </script>
    <script>
      var init = function (evt) {
        document.getElementById('x3d_element').runtime.showAll();
      };
    </script>
    <link type='text/css' rel='stylesheet' href='http://www.x3dom.org/download/x3dom.css'> </link> 
    <link type='text/css' rel='stylesheet' href='../css/inspector.css'> </link> 
  </head>

  <body>
    <h1>Model Inspector</h1>

    <x3d id="x3d_element">
      <scene>
      	<navigationInfo headlight="true"></navigationInfo>
      	<background skyColor='0.0 0.0 0.0'> </Background>
  	<?php
      include '../php/db_connect.php';
      $arg 	  = $_GET["id"];
      $query  = "SELECT data_url FROM models WHERE id = $arg";
      $result = mysql_query($query);
      $entry  = mysql_fetch_object($result);
  	  echo "<inline url=\"../$entry->data_url\" onload=\"init()\"> </inline>";
    ?>

      	<viewpoint id="viewport" DEF="viewport" centerOfRotation="0 0 0" position="0.00 0.00 5.00" orientation="-0.92 0.35 0.17 0.00" fieldOfView="0.858"> </viewpoint>
      </scene>
    </x3d>
  </body>
</html>
