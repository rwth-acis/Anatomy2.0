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
 * @file editcourse.php
 * Webpage for editing a single course.
 */
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' charset='utf8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Edit Your Course</title>

    <!-- Additional styles -->
    <link rel="stylesheet" href="../css/editcourse.css">
    
  </head>

  <body>
    <?php include "menu.php"; ?>
    
    <header id='head' class='secondary'>
    <div class='container'>
      <div class='row'>
        <h1>Edit Your Course</h1>
      </div>
    </div>
    </header>
    <?php
      // Check whether the currently logged in user is allowed to edit courses
      require '../php/access_control.php';
      $course_id = filter_input(INPUT_GET, 'id');
      $accessControl = new AccessControl();
      $canEditCourse = $accessControl->canUpdateCourse($course_id);

      if($canEditCourse) {		
        include 'editcourse_content.php';
      } else {
        include 'not_authorized.php';
      }

      include("footer.php");
    ?>

    <script src="../js/editcourse.js"></script>
    <script src="../js/search.js"></script>

  </body>
</html>
