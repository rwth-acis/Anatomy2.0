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
<?php
      include '../php/db_connect.php';
      $model_id = filter_input(INPUT_GET, "id");
      if (isset($model_id)) {
        $query  = "SELECT * FROM models WHERE id = $model_id";
        $model = $db->query($query)->fetchObject();
      }

      if (filter_input(INPUT_GET, "widget") == "true") { 
        $viewer_class = "viewer_object_role"; 
        $initModelViewer = "onload=\"modelViewer.onModelLoaded()\"";
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
