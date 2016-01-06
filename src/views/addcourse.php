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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body>
    <?php include("menu.php"); ?>
    
    <header id='head' class='secondary'>
    <div class='container'>
      <div class='row'>
        <h1>Create a new course</h1>
      </div>
    </div>
    </header>
    
    <?php
      // Check whether the currently logged in user is allowed to create courses
      require '../php/access_control.php';
      $accessControl = new AccessControl();
      $canCreateCourse = $accessControl->canCreateCourse();

      if($canCreateCourse) {		
        include 'addcourse_content.php';
      } else {
        include 'not_authorized.php';
      }

      include("footer.php");
    ?>
    
  </body>

</html>
