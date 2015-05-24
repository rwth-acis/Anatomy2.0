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
 * @file course.php
 * Webpage for viewing a single course
 */
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collaborative Viewing of 3D Models </title>

    <link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/bootstrap-theme.css" media="screen">
    <link rel="stylesheet" type="text/css" href="../css/da-slider.css" />
    <link rel="stylesheet" href="../css/style.css">
  </head>
  <body>
      <?php include("menu.php"); ?>

      <?php
         //get data from db
         include '../php/db_connect.php';
         include '../php/tools.php';

         $arg    = $_GET["id"];
         $query  = $db->query("SELECT * FROM courses WHERE id = $arg");
         $entry = $query->fetchObject();
      ?>
    <header id='head' class='secondary'>
      <div class='container'>
        <div class='row'>
            <h1><?php echo "$entry->name";?></h1>
        </div>
      </div>

    </header>
    <div id='courses'>
      <section class='container'>
        <br><br>
      <div class='container'>
        <div class='row'>
          <div class='col-md-4'>
            <h3><?php echo "$entry->name"; ?></h3>

            <div class='featured-box'>
              <img src=<?php echo "$entry->img_url"?> ><br><br>
              <div>
                  <?php if(isset($_SESSION["user_id"]) && $entry->creator == $_SESSION['user_id']) { ?>
                    <a href=editcourse.php?id=<?php echo "$arg"; if(isset($_GET["widget"]) && $_GET["widget"] == "true") { echo "&widget=true"; }?>>
                    <button class='btn btn-primary btn-lg btn-block' type='button'>Edit</button>
                    </a>
                  <?php } if(!(isset($_GET["widget"]) && $_GET["widget"] == "true")) { ?>
                    <a href=<?php echo "$entry->role_url"; ?>>
                    <button class='btn btn-primary btn-lg btn-block' type='button'>Course room</button>
                    </a>
                  <?php } ?>
                </div> </br>

              <div>
                <p>
                <?php echo "$entry->description"; ?>
                </p>
              </div>
            </div>

          </div>
          <div class='col-md-8'>
            <div><h3>Models</h3></div>
            <br><br>

    <?php
    //create model overview in course
    $query = $db->query("SELECT * FROM course_models
          INNER JOIN models ON course_models.model_id = models.id
          WHERE course_models.course_id = $arg");
    $result = $query->fetchAll();

    $html = createTable($result,'model');

    echo $html;
    ?>

          </div>
        </div>
      </div>
      </section>
    </div>
    <!-- container -->

    <?php include("footer.php"); ?>


    <!-- JavaScript libs are placed at the end of the document so the pages load faster -->
    <script src="../js/jquery.cslider.js"></script>
    <script src="../js/custom.js"></script>

    <script type='text/javascript' src='../js/x3d-extensions.js'> </script>
    <script type='text/javascript' src='../js/viewer.js'> </script>

    <!-- General functionality -->
    <script type="text/javascript" src="../js/tools.js"></script>
    <?php
      //Decide if this site is inside a separate widget
      if(isset($_GET["widget"]) && $_GET["widget"] == "true")
      {
          print("<script type='text/javascript' src='../js/overview-widget.js'> </script>");
          print("<script type='text/javascript' src='../js/init-subsite.js'></script>");
      }
    ?>
  </body>
</html>
