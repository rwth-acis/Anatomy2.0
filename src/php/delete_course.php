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
 *  @file delete_course.php
 *  Script for deleting a course
 */

session_start();

ob_start();

//create database connection (needs to be done before mysql_real_escape_string)
$conn = require '../php/db_connect.php';

//Get input data from form
$course_id = mysql_real_escape_string(filter_input(INPUT_POST, 'course_id'));

// Get all models associated with the course
$sql_select = "SELECT * 
                FROM courses
                INNER JOIN users ON courses.creator = users.id
                WHERE courses.id = $course_id AND users.openIdConnectSub = '" . $_SESSION["sub"] . "'";

$query = $db->query($sql_select);
$course = $query->fetch();

// Check whether user is creator of this course
// Only the creator can delete the course
if ($course !== FALSE) {
  $subject_id = $course["subject_id"];

  // Remove the connection between models and this course
  $sql_remove_models = "DELETE FROM course_models WHERE course_id=$course_id";
  $conn->query($sql_remove_models);

  // Delete the course itself
  $sql_delete_course = "DELETE FROM courses WHERE id=$course_id";
  $conn->query($sql_delete_course);

  $html = "";
  if(isset($_GET['widget']) && $_GET['widget'] == 'true') {$html = "&widget=true";}
  
  // DELETE THE WIDGET WHICH WAS CREATED FOR THE COURSE
  $xml_file_name_path = __DIR__ . "/../widgets/gallery$course_id.xml";
  unlink($xml_file_name_path);

  $return = $subject_id;
}
else {
  // If not deleted, return FALSE
  $return = "FALSE";
}

ob_end_clean();

echo $return;
