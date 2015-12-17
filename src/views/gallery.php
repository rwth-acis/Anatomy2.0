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
 * @file gallery.php
 * Content page for the gallery WIDGET. If you are looking for the standard gallery
 * page, have a look at overview.php
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
  
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Collaborative Viewing of 3D Models </title>

  <link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  
  <script type='text/javascript' src='../js/overview-widget.js'> </script>

</head>
<body>
  
  <?php
    include("../php/tools.php");
  ?>
  
  <!-- container -->
  <div id="result-container">
    <?php
    $course_id = filter_input(INPUT_GET, "id");

    include '../php/db_connect.php';

    if (isset($course_id)) {
      $sql_select_models = "SELECT * FROM models "
              . "JOIN course_models ON models.id=model_id "
              . "WHERE course_id=$course_id";
    }
    else {
      $sql_select_models = "SELECT * FROM models";
    }

    $query  = $db->query($sql_select_models);
    $result = $query->fetchAll();

    $html = createTable($result, 'model');
    echo $html;
    ?>
  </div>

  <!-- JavaScript libs are placed at the end of the document so the pages load faster -->
  <script src="../js/modernizr-latest.js"></script>
  <script src="../js/custom.js"></script>
  <script type='text/javascript' src='../js/search.js'></script>
  <script type='text/javascript' src='../js/ajax.js'></script>
  <!-- Knockout -->
  <script src='../external/knockoutjs/dist/knockout.js'></script>
  <!--<script type="text/javascript" src="../js/gallery-widget.js"></script>-->

</body>
</html>
