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

  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../external/bootstrap/dist/css/bootstrap.min.css">

</head>
<body>
  <?php
    include("../php/tools.php");
  ?>

  <!-- container -->
  <div id="result-container">
    <?php
    $role_space = filter_input(INPUT_GET, "rolespace");

    include '../php/db_connect.php';

    if (isset($role_space)) {
      $sql_select_models = "SELECT course_models.*, models.* FROM models "
              . "JOIN course_models ON models.id=model_id "
              . "JOIN courses ON courses.id=course_id "
              . "WHERE role_url='$role_space'";
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
  <script src='../js/search.js'></script>
  <!-- jQuery -->
  <script src="../external/jquery/dist/jquery.min.js"></script>
  <!-- Y-js -->
  <script src='../external/yjs/y.js'></script>
  <!-- Knockout -->
  <script src='../external/knockoutjs/dist/knockout.js'></script>
  <!--<script type="text/javascript" src="../js/gallery-widget.js"></script>-->
  <script src='../js/overview-widget.js'> </script>

</body>
</html>
