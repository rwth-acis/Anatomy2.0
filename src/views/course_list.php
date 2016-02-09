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
 * Webpage for deleting a single course
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collaborative Viewing of 3D Models </title>
    
  <link rel="stylesheet" href="../external/jasny-bootstrap/dist/css/jasny-bootstrap.min.css"/>
</head>

<body>
  <?php include("menu.php"); ?>

  <?php
    // Get all course data and name + email of their creators from our database based
    // on the subject id given in the website URL
    include '../php/db_connect.php';
    include '../php/tools.php';

    $subject_id = filter_input(INPUT_GET, "id");
    $subject = $db->query("SELECT * FROM subjects WHERE id='$subject_id'")->fetchObject();
    $courses = $db->query("SELECT courses.*, users.given_name, users.family_name FROM courses JOIN users ON courses.creator=users.id WHERE subject_id='$subject_id'")->fetchAll();
  ?>
  <header id='head' class='secondary'>
    <div class='container'>
      <div class='row'>
        <h1><?php echo "$subject->name courses";?></h1>
      </div>
    </div>
  </header>
  
  <div id='courses'>
    <section class='container'>
      <div class='container'>
        <div class='row'>
          <!-- Info box with data about subject -->
          <div class='col-sm-4'>
            <div class='featured-box'>
              <img src="<?php echo "$subject->img_url"?>" >
              <?php if(!(filter_input(INPUT_GET, "widget") == "true")) { ?>
                <a href="addcourse.php?id=<?php echo $subject->id; ?>">
                  <button class='btn btn-success btn-lg btn-block margin-top' type='button'>Add new course</button>
                </a>
              <?php } ?>
            </div>
          </div>

          <!-- List of all courses -->
          <div class='col-sm-8'>
            <h3>Choose course</h3>
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Course name</th>
                  <th>Created by</th>
                  <th>Last edited</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody data-link="row" class="rowlink">
                <?php
                  foreach ($courses as $course) {
                ?>
                <tr>
                  <td><a href="course.php?id=<?php echo $course["id"]; ?>"><?php echo $course["name"]; ?></a></td>
                  <td><?php echo $course["given_name"]." ".$course["family_name"]; ?></td>
                  <td><?php echo $course["edit_date"]; ?></td>
                  <td class="rowlink-skip"><input type="button" data-id="<?php echo $course["id"];?>" class="btn btn-edit btn-sm btn-success btn-block" value="Edit"/></td>
                  <td class="rowlink-skip"><input type="button" data-id="<?php echo $course["id"];?>" class="btn btn-delete btn-sm btn-warning btn-block" value="Delete"</td>
                </tr>
                <?php
                  }
                ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- container -->

  <?php include("footer.php"); ?>

  <script type="text/javascript" src="../js/tools.js"></script>
  <?php
    //Decide if this site is inside a separate widget
    if(filter_input(INPUT_GET, "widget") == "true")
    {
        print("<script src='../js/overview-widget.js'> </script>");
    }
  ?>
  <!-- Library which defines behavior of the <table class="table table-striped table-bordered table-hover"> -->
  <script src="../external/jasny-bootstrap/dist/js/jasny-bootstrap.min.js"></script>
  <script src="../js/course-list.js"></script>
</body>
</html>
