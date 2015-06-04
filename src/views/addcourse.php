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
 * @file addcourse.php
 * Webpage for creating a new course.
 */
?>
<!DOCTYPE html>	
<html>
  <head>
    <title>Create a new course</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
    <!-- Additional styles -->
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <!--<link rel='stylesheet' type='text/css' href='../css/style.css'> -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> 
	<script src="../js/jquery.form.min.js"></script> 	
	<script src="../js/script.js"></script> 	
  </head>
  <body>
    <?php 
      include("menu.php"); 
      // If the user is not logged in, redirect him to the login page
      if (!isset($_SESSION['user_id'])) { 
        header("Location: login.php");
        exit();
      }

    ?> 
	
    <div class="container">
	    <h1>Create a new course</h1>
      
      <!-- User info text box -->
      <div class="featured-box">
        <p>
          Enter course name, course room URL, contact, description and dates below. If you would like help on how to creat your course room, press the "?" button.<br>
          Models will be added afterwards.<br>
          Press "Save" when you are done.
        </p>
      </div>
	    <!--- CREATE COURSE INPUT FORM -->
   		<form role="form" class="form-horizontal" action="../php/upload_script_course.php<?php if(isset($_GET['widget']) && $_GET['widget']) {echo '?widget=true';} ?>" method="post" enctype="multipart/form-data" id="UploadForm">
        <div class="form-group">
          <label class="col-sm-2 control-label" for="targetName">Course name:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" rows="1" name="name" id="targetName" placeholder="Enter your course name" required>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" for="targetRole">Course room:</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" rows="1"name="roleLink" id="targetRole" placeholder="Enter ROLE space link">
            <!-- Help button which opens role.php in new tab. TODO: Could be done more specific and in place. Also in editcourse.php -->
            <a target="_blank" href="role.php">
              <input class="col-sm-1 btn btn-default btn-inline" type="button" value="?"/>
            </a>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" for="targetContact">Contact:</label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="3" name="contact" id="targetContact" placeholder="Enter your contact details, e.g. enter university name, department, address, phone number, fax number"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" for="targetText">Description:</label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="3" name="text" id="targetText" placeholder="Enter course description"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" for="targetDates">Dates:</label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="3" name="dates" id="targetDates" placeholder="Enter dates for online appointments which are relevant for your students"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" for="targetLinks">Links:</label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="3" name="links" id="targetLinks" placeholder="Enter external links which provide additional information, e.g. links to Campus Office, L2P"></textarea>
          </div>
        </div>
        <input hidden id="subject_input" name="subject_id">
        <button type="submit" class="btn btn-success col-xs-6" id="SubmitButton" value="Upload">Save</button>
      </form>
      <div id="output"></div>	    
      <!--- CREATE COURSE INPUT FORM ENDING -->
    </div>
    
    <?php include("footer.php");?>
    
    <script type="text/javascript" src="../js/tools.js"></script>
    <script type="text/javascript" src="../js/addCourse.js"></script>
  </body>

</html>
