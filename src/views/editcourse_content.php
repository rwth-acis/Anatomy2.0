<?php

/* 
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * 
 *  @file editcourse_content.php
 *  The content of 'editcourse.php' if the user is allowed to edit courses
 */

  $db = require '../php/db_connect.php';
  $course_id = filter_input(INPUT_GET, 'id');
  try {
    $entry = getSingleDatabaseEntryByValue('courses', 'id', $course_id);
  } catch(Exception $e) {
    error_log($e->getMessage());
  }
?>

<div id='courses'>
  <section class='container'>
    <br><br>
  <div class='container'>
    <div class='row'>
      <div class='col-md-6'>
        <!-- User information box -->
        <div class='featured-box'>
          Enter course name, contact, description and dates below. Click "+" to set up your own course room. If you would like help on how to set up a course room, press the "?" button.<br>
          To show models in your course room, add models on the right side. You can delete models by pressing the red "x". Those models will not be shown in your course room.<br>
          Press "Save" when you are done.
        </div>

        <!-- FROM FOR EDITING INPUT VALUES -->
        <form role="form" action="../php/edit_script_course.php<?php if(isset($_GET['widget']) && $_GET['widget'] == true) {echo '?widget=true';} ?>" method="post" enctype="multipart/form-data" id="UploadForm">              
          <div class="form-group">
            <input type="hidden" name="targetId" value="<?php echo $course_id; ?>">
            <label for="targetName">Course name:</label>
            <input type="text" class="form-control" rows="1" name="name" id="targetName" value="<?php echo htmlentities($entry['name']); ?>" required>
          </div>
          <div class="form-group">
            <label for="targetText">Course room:</label>
            <input type="text" class="col-xs-10 form-control" rows="1" name="roleLink" id="targetRole" placeholder="Enter ROLE space name" value="<?php echo $entry['role_url']; ?>">
            <a href="#">
              <input id="create-room-btn" class="col-xs-1 btn btn-default btn-inline" type="button" value="+"/>
            </a>
            <!-- Help button which opens role.php in new tab. TODO: Could be done more specific and in place. Also in addcourse.php -->
            <a target="_blank" href="role.php">
              <input class="col-xs-1 btn btn-default btn-inline" type="button" value="?"/>
            </a>
            <div class="featured-box">
              <p><?php echo $baseUrl . "/src/widgets/model_viewer.xml"; ?></p>
              <p><?php echo $baseUrl . "/src/widgets/gallery.xml"; ?></p>
            </div>
          </div>
          <div class="form-group">
            <label for="targetContact">Contact:</label>
            <textarea class="form-control" rows="3" name="contact" id="targetContact" placeholder="Enter your contact details, e.g. enter university name, department, address, phone number, fax number""><?php echo htmlentities($entry['contact']); ?></textarea>
          </div>
          <div class="form-group">
            <label for="targetText">Description:</label>
            <textarea class="form-control" rows="3" name="text" id="targetText"  placeholder="Enter course description"><?php echo htmlentities($entry['description']); ?></textarea>
          </div>
          <div class="form-group">
            <label for="targetDates">Dates:</label>
            <textarea class="form-control" rows="3" name="dates" id="targetDates" placeholder="Enter dates for online appointments which are relevant for your students"><?php echo htmlentities($entry['dates']); ?></textarea>
          </div>
          <div class="form-group">
            <label for="targetLinks">Links:</label>
            <textarea class="form-control" rows="3" name="links" placeholder="Enter external links which provide additional information, e.g. links to Campus Office, L2P" id="targetLinks"><?php echo htmlentities($entry['links']); ?></textarea>
          </div>
          <button type="submit" class="btn btn-success col-xs-6" id="SubmitButton" value="Upload">Save</button>
        </form>
        <!-- FROM FOR EDITING INPUT VALUES ENDING -->
        <br>
      </div> 

      <!-- AREA FOR ADDING AND REMOVING MODELS FROM A COURSE -->
      <div class='col-md-6'>
        <div><h3>Models</h3></div>
        <!-- Buttons to create add and upload models -->
        <button class='btn btn-success col-xs-6' type='button' id="openbox" onclick="startBlackout()">Add</button>

        <div id="model_table" class="col-xs-12 model_div">
        <?php
          $query = $db->query("SELECT * 
                               FROM course_models
                               INNER JOIN models ON course_models.model_id = models.id
                               WHERE course_models.course_id = $course_id");
          $result = $query->fetchAll();

          $html = createTable($result,"modeldeletion");
          echo $html;
        ?>
        </div>           
      </div>
      <!-- AREA FOR ADDING AND REMOVING MODELS FROM A COURSE -->

    </div>
  </div>  
  </section>
</div>
<!-- container -->

<!-- Darken background when model select window appears -->
<div id="blackout" onclick="endBlackout()"></div>

<!-- Show models in a pop-up -->
<div id="modelbox">
  <div id="closebox" onclick="endBlackout()">close</div>
  <button class='btn btn-success' type='button' id="addmodels" onclick="addModels()">Add models to course</button>
  <?php include("search.php"); ?>
  <div id="result-container">
  <!-- Models will be inserted here -->
  </div>
</div>
