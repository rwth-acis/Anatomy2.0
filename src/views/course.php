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
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/font-awesome.min.css">

  <!-- Custom styles-->

  <link rel="stylesheet" href="../css/bootstrap-theme.css" media="screen">
  <link rel="stylesheet" type="text/css" href="../css/da-slider.css" />

  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
  <script src="assets/js/html5shiv.js"></script>
  <script src="assets/js/respond.min.js"></script>
  <![endif]-->

</head>

<body>
    <?php include("menu.php"); ?>

    <?php
      //get data from db
      include '../php/db_connect.php';
      include '../php/tools.php';

      $arg    = $_GET["id"];
      $query  = $db->query("SELECT courses.*, users.given_name, users.family_name, users.email FROM courses JOIN users ON courses.creator = users.id WHERE courses.id = $arg");
      
      $entry = $query->fetchObject();
      
      $is_logged_in = isset($_SESSION["user_id"]) && $entry->creator == $_SESSION['user_id'];
       
      function printEditBtn($arg, $class) {
        $widgetExtension = "";
        if(isset($_GET["widget"]) && $_GET["widget"] == "true") { 
          $widgetExtension = "&widget=true"; 
        }
        echo "<a href=editcourse.php?id=$arg $widgetExtension>"; 
        echo "<button class='$class' type='button'>Edit</button>";
        echo "</a>";
      }
       
      // Taken from https://css-tricks.com/snippets/php/find-urls-in-text-make-links/
      function replaceLinks($text) {
        $reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
        preg_match_all($reg_exUrl, $text, $matches);
        $usedPatterns = array();
        foreach($matches[0] as $pattern){
            if(!array_key_exists($pattern, $usedPatterns)){
                $usedPatterns[$pattern]=true;
                $text = str_replace  ($pattern, "<a href=\"$pattern\" rel=\"nofollow\">$pattern</a>", $text);   
            }
        }
        return $text;
      }
    ?>
  <header id='head' class='secondary'>
    <div class='container'>
      <div class='row'>
        <div class ="col-sm-8">
          <h1><?php echo "$entry->name";?></h1>
        </div>
        
        <div class="col-sm-4">
          <?php 
            $btn_edit_class = "btn btn-success btn-block btn-lg";
            printEditBtn($arg, $btn_edit_class." headline-btn");
          ?>          
        </div>
      </div>
    </div>
  </header>
  
  <div id='courses'>
    <section class='container'>
      <br><br>
    <div class='container'>
      <div class='row'>
        <div class='col-md-6'>   
          <div class="col-sm-12">
            <?php 
              printEditBtn($arg, $btn_edit_class." headline-btn-smartphone");
            ?> 
          </div>
          <div class="col-sm-8">            
            <?php if(!(isset($_GET["widget"]) && $_GET["widget"] == "true")) { ?>
              <a href=<?php echo "$entry->role_url"; ?>>
              <button class='btn btn-success btn-lg btn-block' type='button'>Enter course room</button>
              </a>
            <?php } ?>
          </div>
          <div class="col-sm-4 margin-top">
            <a href="http://www.x3dom.org/check/">Test my browser</a>
          </div>
        
            <div class="col-xs-12 margin-top">
            <p class="col-sm-3">Created by:</p>
            
            <a href="mailto:<?php echo $entry->email; ?>">
              <p class="col-sm-6 output-element"><?php echo $entry->given_name ." ". $entry->family_name; ?></p>
            </a>
          </div>
          <div class="col-xs-12">
            <p class="col-sm-3">Contact:</p>
            <p class="col-sm-9 output-element"><?php echo $entry->contact; ?></p>
          </div>
          <div class="col-xs-12">
            <p class="col-sm-3">Description:</p>
            <p class="col-sm-9 output-element"><?php echo $entry->description; ?></p>
          </div>
          <div class="col-xs-12">
            <p class="col-sm-3">Dates:</p>
            <p class="col-sm-9 output-element"><?php echo $entry->dates; ?></p>
          </div>
          <div class="col-xs-12">
            <p class="col-sm-3">Links:</p>
            <p class="col-sm-9 output-element"><?php echo replaceLinks($entry->links); ?></p>
          </div>

        </div>
        <div class='col-md-6'>
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


  <script src="../js/modernizr-latest.js"></script>
  <script src="../js/custom.js"></script>

  <script type='text/javascript' src='../js/x3d-extensions.js'> </script>
  <script type='text/javascript' src='../js/viewer.js'> </script>

  <!-- General functionality (used in menuToolbar.js) -->
  <script type="text/javascript" src="../js/tools.js"></script>
  <!-- The library for the copy to clipboard feature in the toolbar -->
  <script type="text/javascript" src="../js/ZeroClipboard.js"></script>
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
