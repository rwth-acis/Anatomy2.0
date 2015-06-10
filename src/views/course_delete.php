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
 * @file course_delete.php
 * Webpage for deleting a course.
 */
?>
<!DOCTYPE html>	
<html>
<head>
  
  <title>Delete course</title>

  <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
  <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'/>
  <link rel="stylesheet" type="text/css" href="../css/style.css"/>
  
</head>
<body>
  <?php
    // LOAD COURSE DATA ////////////////////////////////////////////////////////
    include '../php/tools.php';
    $course_id = filter_input(INPUT_GET, 'id');
    try {
      $course = getSingleDatabaseEntryByValue('courses', 'id', $course_id);
    } catch(Exception $e) {
      error_log($e->getMessage());
    }
  ?>
  
  <!-- Top level navigation and logo -->
  <?php include("menu.php"); ?>
  
  <!-- Banner with page headline -->
  <header id='head' class='secondary'>
    <div class='container'>
      <div class='row'>
        <h1>Delete course <?php echo $course['name']; ?></h1>
      </div>
    </div>
  </header>
  
  
  <?php 
    // A course can only be deleted by its creator. Therefore check whether the 
    // user is logged in and if so, whether he is the owner.
    // $isTutor will be set to true in 'login.php', if user is logged in and 
    // confirmed in our database. Otherwise explanation will be shown to the user.
    $isTutor = false;
    include 'login.php';

    if($isTutor) {
      // Check whether tutor is also creator of course
      // If the user is not the creator, show explanation to user
      if(!isset($course) || !isset($course['creator']) || $course['creator'] != $user_database_entry['id']) { 
  ?>
        <div class="alert alert-danger" role="alert">Someone else created this course. Only the creator is able to delete this course.</div>
  <?php
      }
      // If the user is the creator, show the main content
      else {
  ?>   
        <!-- Confirmation check UI elements to ask user whether or not to delete the 
          selected course.-->
        <div class="center-block container">
          <div class="featured-box container delete-confirm-div">
            <p><strong>Do you really want to delete course <?php echo $course['name']; ?>?</strong></p>
            <input type="button" id="btn-yes" class="btn btn-warning col-sm-5 btn-yes-no" value="Yes"/>
            <input type="button" id="btn-no" class="btn btn-success col-sm-5 btn-yes-no" value="No"/>
          </div>
        </div>
  <?php
      }
    }
  ?> 
            
  <script type="text/javascript" src="../js/course-delete.js"></script>
</body>

</html>
