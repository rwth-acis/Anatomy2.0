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
 * @file courses.php
 * Webpage for viewing an overview of all existing subjects.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collaborative Viewing of 3D Models </title>

</head>
<body>
  <?php include("menu.php"); ?>

  <?php
    //Decide if this site is inside a separate widget
    if(filter_input(INPUT_GET, "widget") == "true") {

    }
    else {
      echo '
          <header id="head" class="secondary">
              <div class="container">
                  <div class="row">
                      <div class="col-sm-8">
                          <h1>Subjects</h1>
                      </div>
                  </div>
              </div>
          </header>
      ';
    }
  ?>

  <!-- Build course table -->
    <div id="table-container">
    <?php
      include '../php/db_connect.php';
      include '../php/tools.php';

      $query  = $db->query("SELECT * FROM subjects");
      $result = $query->fetchAll();

      $html = createTable($result,"subjects");
      echo $html;
    ?>
    </div>
  <!-- /container -->

  <?php include("footer.php");?>
 ?>

</body>
</html>
