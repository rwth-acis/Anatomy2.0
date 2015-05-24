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
 * @file welcome.php
 * Starting page when using Anatomy2.0
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
  <!-- link rel="stylesheet" type="text/css" href="../css/da-slider.css" /-->
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <?php include("menu.php"); ?>
    
  <!-- DESCRIPTION OF THE ANATOMY 2.0 WEBSITE -->
    <div class="container">
  <div class="row">
        <div class="col-md-12">
  <div class="featured-box">
    <h3>What is Collaborative Model Viewing?</h3>
    <p>
      Collaborative 3D Model Viewing allows investigating and learning from a 3D model in a group. You can open a model on different devices and if one person moves the model on his device, the view on all other devices is synchronized. Therefore, you can easily show, explain or discuss parts of the model, no matter if you are explaining something as a teacher, learning in a group over the internet or discussing about an object you don't have physical access to. The project mainly focuses on models from 3D scanned real objects that often are too valuable or not available for investigation by hands. If you want to view a model that is not already in the database, you can also upload it yourself.
    </p>
  </div>
  </div>
  </div>
  </div>


  <div id="courses">
    <div class="container">
  <p>&nbsp;</p>
      <div class="row">
        <div class="col-md-4">
          <div class="featured-box">
	    <?php
	       //Decide if this site is inside a separate widget
	       if(isset($_GET["widget"]) && $_GET["widget"] == "true")
	       {
	         //we have to link to the widget versions:
	         print("<a href='courses.php?widget=true'>");
	       }
	       else
	       {
  	         //we have to link to the non-widget versions:
	         print("<a href='courses.php'>");
	       }
	    ?>
            <i class="fa fa-file fa-2x"></i>
            <div class="text">
              <h3>Courses</h3>
              <p>Check for the the list of all the courses available here.</p>
            </a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="featured-box">
	    <?php
	       //Decide if this site is inside a separate widget
	       if(isset($_GET["widget"]) && $_GET["widget"] == "true")
	       {
	         //we have to link to the widget versions:
	         print("<a href='overview.php?widget=true'>");
	       }
	       else
	       {
  	         //we have to link to the non-widget versions:
	         print("<a href='overview.php'>");
	       }
	    ?>
            <i class="fa fa-play fa-2x"></i>
            <div class="text">
              <h3>Gallery</h3>
              <p>An extensive list of all the models present in our database.</p>
              </a>
            </div>
          </div>
        </div>
        <?php
          //Decide if this site is inside a separate widget
          if(!(isset($_GET["widget"]) && $_GET["widget"] == "true"))
          {
        ?>
        <div class="col-md-4">
          <div class="featured-box">
            <a href='role.php'>
              <i class="fa fa-tachometer fa-2x"></i>
              <div class="text">
                  <h3>Role</h3>
                  <p>Head to the Role learning environment and setup your own space.</p>
              </div>
            </a>
          </div>
        </div>
        <?php
          }
        ?>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="featured-box">
	    <?php
	       //Decide if this site is inside a separate widget
	       if(isset($_GET["widget"]) && $_GET["widget"] == "true")
	       {
	         //we have to link to the widget versions:
	         print("<a href='login.php?widget=true'>");
	       }
	       else
	       {
  	         //we have to link to the non-widget versions:
	         print("<a href='login.php'>");
	       }
	    ?>
            <i class="fa fa-sign-in fa-2x"></i>
            <div class="text">
              <h3>Login</h3>
              <p>Want to create a course room ? Simply login in and get started.</p>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="featured-box">
	    <?php
	       //Decide if this site is inside a separate widget
	       if(isset($_GET["widget"]) && $_GET["widget"] == "true")
	       {
	         //we have to link to the widget versions:
	         print("<a href='upload.php?widget=true'>");
	       }
	       else
	       {
  	         //we have to link to the non-widget versions:
	         print("<a href='upload.php'>");
	       }
	    ?>
            <i class="fa fa-upload fa-2x"></i>
            <div class="text">
              <h3>Upload</h3>
              <p>Upload models to our vast database and collaboratively view them.</p>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="featured-box">
	    <?php
	       //Decide if this site is inside a separate widget
	       if(isset($_GET["widget"]) && $_GET["widget"] == "true")
	       {
	         //we have to link to the widget versions:
	         print("<a href='help.php?widget=true'>");
	       }
	       else
	       {
  	         //we have to link to the non-widget versions:
	         print("<a href='help.php'>");
	       }
	    ?>
            <i class="fa fa-info fa-2x"></i>
            <div class="text">
              <h3>Help</h3>
              <p>Still need some help. Just follow the simple intructions and get started. </p>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!-- Spacing for footer -->
  <div style="padding-bottom:15%"></div>
  <!-- container -->
  <?php include("footer.php"); ?>

  <!-- JavaScript libs are placed at the end of the document so the pages load faster -->
  <script src="../js/custom.js"></script>
  <!-- Init communication with wrapper -->
  <?php
    //Decide if this site is inside a separate widget
    if(isset($_GET["widget"]) && $_GET["widget"] == "true")
    {
      //we have to link to the widget versions:
      print("<script type='text/javascript' src='../js/init-subsite.js'></script>");
    }
  ?>
</body>
</html>
