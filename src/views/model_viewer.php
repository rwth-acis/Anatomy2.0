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
    
    <link type='text/css' rel='stylesheet' href='../css/external/x3dom.css'/>
    <link rel='stylesheet' type='text/css' href='../css/model_viewer.css'/>
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <link rel='stylesheet' type='text/css' href='../css/external/bootstrap-switch.min.css'>
    <link rel='stylesheet' type='text/css' href='../external/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css'>    
    <link rel='stylesheet' type='text/css' href='../css/style.css'>
  </head>

  <body>
    
    <!-- This div is a helper to allow our x3d viewer to be full height -->
    <div style="position: fixed; height:100%"></div>
    <!-- Load all Javascript dependencies. Care: menu.php also loads dependencies -->
    <?php
      // Hide the menu in ROLE environment. Outside ROLE the menu must be displayed.
      if(!(isset($_GET["widget"]) && $_GET["widget"] == "true"))
      {
        include("menu.php");
    ?>
      <script type='text/javascript' src='../js/x3dom.js'> </script>
      <script type='text/javascript' src='../js/x3d-extensions.js'> </script>
    <?php
      } else {
    ?>
      <script type='text/javascript' src='../js/x3dom.js'> </script>
      <script type='text/javascript' src='../js/init-subsite.js'></script>
      <script type='text/javascript' src='../js/viewer.js'> </script>
      <script type='text/javascript' src='../js/x3d-extensions.js'> </script>
      <script type="text/javascript" src="../js/tools.js"></script>      
      <script type='text/javascript' src='../js/model-viewer-widget.js'> </script>
    <?php
      }
    ?>
      <script type='text/javascript' src='../js/annotations.js'> </script>
      <script type='text/javascript' src='../js/model-viewer.js'> </script>
      <script type="text/javascript" src="../js/model-part-highlighting.js"></script>
      <script type="text/javascript" src="../js/model-special-features.js"></script>
    <?php
      
      include '../php/db_connect.php';
      $model_id = filter_input(INPUT_GET, "id");
      if (isset($model_id)) {
        $query  = "SELECT * FROM models WHERE id = $model_id";
        $model = $db->query($query)->fetchObject();
      }

      include("toolbar.php");
      
      if (isset($_GET["widget"]) && $_GET["widget"] == "true") { 
        $viewer_class = "viewer_object_role"; 
        $initModelViewer = "onload=\"initializeModelViewer()\"";
      } else { 
        $viewer_class = "viewer_object"; 
        $initModelViewer = "onload=\"modelViewer.onModelLoaded()\"";
      }
    ?>
    
    <x3d id='viewer_object' swfpath="../swf/x3dom.swf" class="<?php echo $viewer_class; ?>" showStat="false">
      <scene id="scene">
        <navigationInfo headlight="true" type="examine" id="navType"></navigationInfo>
        <background skyColor='1.0 1.0 1.0'> </background>
        <Group id="model-nodes">
          <?php
          if(is_object($model)) {
            // nameSpaceName='inlinespace' required for highlighting parts of a model
            echo "<inline nameSpaceName='inlinespace' id=\"x3dInline\" url=\"../../$model->data_url\" $initModelViewer> </inline>";
          }
          ?>
        </Group>
        <viewpoint id="viewport" DEF="viewport" centerOfRotation="0 0 0" position="0.00 0.00 5.00" orientation="-0.92 0.35 0.17 0.00" fieldOfView="0.858"> </viewpoint>
        <Group id="annotation-markers" onclick="modelViewer.handleAnnotationMarkerClick(event)" onmouseover="modelViewer.handleAnnotationMarkerMouseOver(event)" onmouseout="modelViewer.handleAnnotationMarkerMouseOut(event)"></Group>
      </scene>
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
    </x3d>
  
    <!-- Hidden input field to provide the Sevianno object id from our database to model-viewer.js -->
    <input id="model-sevianno-id" class="hidden" value="<?php echo $model->seviannoId; ?>"/>
    <!-- Creates a panel with information about mouse usage and hotkeys for navigation -->
    <?php include("nav_info.html"); ?>
    <!-- A box for showing annotation content. There will always be just one box at a time. This div will be moved to the correct position. -->
    <div id="annotation-content" class="annotation-content hidden">
      <div id="div-annotation-content-loading" class="hidden">
        <h4>Loading...</h4>
      </div>
      <!-- This div contains elements for viewing annotation content in read mode -->
      <div id="div-annotation-content-read">
        <button id="btn-annotation-content-close" type="button" class="btn btn-default btn-sm pull-right" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <p id ="username-read" class="pull-right"></p>
        <p class="pull-right">Last updated by:</p>
        <h4 id="header-annotation-content" class="annotation-header"></h4>
        <p id="p-annotation-content"></p>
        <button id="btn-annotation-edit" class="btn btn-default">Edit</button>
        <button id="btn-annotation-delete" class="btn btn-default">Delete</button>
        <img src="../images/ajax-loader.gif" alt="Loader" class="hidden" id="ajax-loader-read">
      </div>
      <!-- This div contains elements for viewing annotation content in edit mode -->
      <div id="div-annotation-content-edit" class="hidden">
        <form action="javascript:void(0);">
          <input id="input-annotation-title" class="form-control" value="" placeholder="Title"/>
          <textarea id="textarea-annotation-content" class="form-control" rows="6" placeholder="Write your annotation content here .."></textarea>
          <button id="btn-annotation-save" class="btn btn-default">Save</button>
          <button id="btn-annotation-cancel" class="btn btn-default">Cancel</button>
          <img src="../images/ajax-loader.gif" alt="Loader" class="hidden" id="ajax-loader-edit">
        </form>
      </div>
    </div>
  </body>
</html>
