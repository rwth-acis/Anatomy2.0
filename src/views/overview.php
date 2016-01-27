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
 * @file overview.php
 * Webpage for viewing an overview of all existing models in the database.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collaborative Viewing of 3D Models </title>

  <?php
    //Decide if this site is inside a separate widget
    if(filter_input(INPUT_GET, "widget") == "true")
    {
      print("<script src='../js/overview-widget.js'> </script>");
    }
  ?>

</head>
<body>
  <?php
    include("menu.php");
    include("../php/tools.php");
  ?>
  <?php
    //Decide if this site is inside a separate widget
    if(filter_input(INPUT_GET, "widget") == "true") {

    }
    else {
        // Disable uploading in ROLE
  ?>
      <header id="head" class="secondary">
        <div class='container'>
          <div class='row'>
            <div  class="col-sm-8">
              <h1>Gallery</h1>
            </div>
            <div class="col-sm-4">
              <?php
                $btn_edit_class = "btn btn-success btn-block btn-lg";
                printLinkBtn("upload.php", $btn_edit_class." headline-btn", "Upload");
              ?>
            </div>
          </div>
        </div>
      </header>
  <?php
    }
  ?>
  <div class='container'>
    <div class='row'>
      <div class='col-md-6'>
        <div class="col-sm-12">
          <?php
            printLinkBtn("upload.php", $btn_edit_class." headline-btn-smartphone", "Upload");
          ?>
        </div>
      </div>
    </div>
  </div>
  <?php include("search.php"); ?>
  <!-- container -->
  <section class="container">
    <br><br><br>
    <div class="container" id="result-container">
      <?php
      include '../php/db_connect.php';

      $query  = $db->query("SELECT * FROM models");
      $result = $query->fetchAll();

      $html = createTable($result, 'model');
      echo $html;
      ?>
    </div>
  </section>
  <!-- /container -->

  <?php include("footer.php"); ?>

  <!-- JavaScript libs are placed at the end of the document so the pages load faster -->
  <script src='../js/search.js'></script>

</body>
</html>
