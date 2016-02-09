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
 * @file showcase.php
 * Webpage for viewing a single model. The model can be examined from different positions
 */
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' charset='utf8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Collaborative 3D Model Viewer</title>

    <link type='text/css' rel='stylesheet' href='../external/x3dom/x3dom.css'/>
    <link rel='stylesheet' type='text/css' href='../css/showcase.css'/>
  </head>

  <body>

    <!-- Load all Javascript dependencies. Care: menu.php also loads dependencies -->

    <?php require ("menu.php"); ?>

    	<script src='../external/yjs/y.js'></script>
      <script src='../external/x3dom/x3dom.js'> </script>

      <script src='../js/x3d-extensions.js'> </script>
      <script src='../js/showcase-base.js'> </script>
      <script src='../js/showcase-annotations.js'> </script>
      <script src='../js/showcase-annotations-connector.js'> </script>
      <script src='../js/showcase-sync.js'> </script>
      <script src="../js/showcase-highlighting.js"></script>
      <script src="../js/showcase-specials.js"></script>
      <script src='../js/showcase-help.js'> </script>

    <?php
      include("toolbar.php");

      include '../php/db_connect.php';
      $model_id = filter_input(INPUT_GET, "id");
      if (isset($model_id)) {
        $query  = "SELECT * FROM models WHERE id = $model_id";
        $model = $db->query($query)->fetchObject();
      }

      if (filter_input(INPUT_GET, "widget") == "true") {
        $viewer_class = "viewer_object_role";
        $initModelViewer = "onload=\"showcase.onModelLoaded()\"";
      } else {
        $viewer_class = "viewer_object";
        $initModelViewer = "onload=\"showcase.onModelLoaded()\"";
      }
    ?>

    <div id="x3d-container"></div>
      <!-- loading first model -->
    <script>
        showcase.setNewModel(<?php echo $model_id;?>)
    </script>

    <!-- Creates a panel with information about mouse usage and hotkeys for navigation -->
    <!-- Navigation info: Explanations of mouse usage/hotkeys to navigate the current view will be shown here -->
    <div id="mainNav" class="navigation-overlay">
      <div id="buttonArea">
        <table id="mouseTable">
        <tr id="mouseRow"><td><img class="navigation-info-img" src="../images/Mouse.gif"></td><td id="mouse"></td></tr>
        <tr id="mouseLeftRow"><td><img class="navigation-info-img" src="../images/Mouse_Left.gif"></td><td id="mouseLeft"></td></tr>
        <tr id="mouseRightRow"><td><img class="navigation-info-img" src="../images/Mouse_Right.gif"></td><td id="mouseRight"></td></tr>
        <tr id="mouseWheelScrollRow"><td><img class="navigation-info-img" src="../images/Mouse_Wheel_Scroll.gif"></td><td id="mouseWheelScroll"></td></tr>
        </table>

        <table id="buttonTable">
        </table>
      </div>
    </div>

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
