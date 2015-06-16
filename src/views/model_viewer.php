<?php
/**
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file model_viewer.php
 * Webpage for viewing a single model. The model can be examined from different positions
 */
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' charset='utf8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Collaborative 3D Model Viewer</title>

    <!-- X3Dom includes -->
    <script type='text/javascript' src='../js/x3dom.js'> </script>

    <!-- Init communication with wrapper -->
    <?php
    //Decide if this site is inside a separate widget
    if(isset($_GET["widget"]) && $_GET["widget"] == "true")
    {
      //we have to link to the widget versions:
      print("<script type='text/javascript' src='../js/init-subsite.js'></script>");
    }
    ?>
    <script type='text/javascript' src='../js/x3d-extensions.js'> </script>
    <script type='text/javascript' src='../js/viewer.js'> </script>
    <link type='text/css' rel='stylesheet' href='http://www.x3dom.org/download/x3dom.css'> </link>

    <link rel='stylesheet' type='text/css' href='../css/model_viewer.css'></link>

    <!-- Additional styles -->
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <link rel='stylesheet' type='text/css' href='../css/style.css'>

    <!-- General functionality (used in menuToolbar.js) -->
    <script type="text/javascript" src="../js/tools.js"></script>
    <!-- The library for the copy to clipboard feature in the toolbar -->
    <script type="text/javascript" src="../js/ZeroClipboard.js"></script>
  </head>

  <body>
    <?php
      // Hide the menu in ROLE environment. Outside ROLE the menu must be displayed.
      if(!(isset($_GET["widget"]) && $_GET["widget"] == "true"))
      {
        include("menu.php");
      } else {
        //Decide if this site is inside a separate widget
        print("<script type='text/javascript' src='../js/model-viewer-widget.js'> </script>");
      }
      
      include '../php/db_connect.php';
      $model_id = filter_input(INPUT_GET, "id");
      if (isset($model_id)) {
        $query  = "SELECT * FROM models WHERE id = $model_id";
        $model = $db->query($query)->fetchObject();
      }

      include("toolbar.php");
    ?>

    <div class="row" style="position:relative; padding-left:5%; padding-right:5%">
      <p id='debugText' style="display:none;"></p>
      <x3d id='viewer_object' showStat="false">
        <scene>
          <navigationInfo headlight="true" type="examine" id="navType"></navigationInfo>
          <background skyColor='1.0 1.0 1.0'> </background>
          <?php
            if(is_object($model)) {
              echo "<inline url=\"../../$model->data_url\" onload=\"initializeModelViewer()\"> </inline>";
            }
          ?>
          <viewpoint id="viewport" DEF="viewport" centerOfRotation="0 0 0" position="0.00 0.00 5.00" orientation="-0.92 0.35 0.17 0.00" fieldOfView="0.858"> </viewpoint>
        </scene>
      </x3d>
      <?php
        if(is_object($model)) {
          echo "<div id='metadata_overlay'>
            <div class='x3dom-states-head'> </div>
            <div class='x3dom-states-item-title'>Name:</div>
            <div class='x3dom-states-item-value'>$model->name</div> <br>
            <div class='x3dom-states-item-title'>Classification:</div>
            <div class='x3dom-states-item-value'>$model->classification</div> <br>
            <div class='x3dom-states-item-title'>Description:</div>
            <div class='x3dom-states-item-value'>$model->description</div> <br>
            <div class='x3dom-states-item-title'>Upload Date:</div>
            <div class='x3dom-states-item-value'>$model->upload_date</div> <br>
            <div class='x3dom-states-item-title'><a href=\"../../$model->data_url\">Download</a></div>
            </div>";
        }
      ?>
      <!-- Creates a panel with information about mouse usage and hotkeys for navigation -->
      <?php include("nav_info.html"); ?>
    </div>
  </body>
</html>
