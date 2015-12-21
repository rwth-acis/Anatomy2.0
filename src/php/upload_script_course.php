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
 * @file upload_script_course.php
 * 
 * Adss new course to the course database on the server
 * adds metadata about it database.
 */
session_start();

//create database connection (needs to be done before mysql_real_escape_string)
$conn = require '../php/db_connect.php';
require_once '../php/tools.php';

if ((include '../config/config.php') === false) {
  throw new Exception("The config.php is missing! Cannot create widget automatically.");
}

//Get input data from form
$name = mysql_real_escape_string(filter_input(INPUT_POST, 'name'));
$text = mysql_real_escape_string(filter_input(INPUT_POST, 'text'));
$role_link = filter_input(INPUT_POST, 'roleLink');
$contact = filter_input(INPUT_POST, 'contact');
$dates = filter_input(INPUT_POST, 'dates');
$links = filter_input(INPUT_POST, 'links');
$subject_id = filter_input(INPUT_POST, 'subject_id');

// Get the ID (of our DB) of the currently logged in user. Required, because this 
// user will be registered as the creator of the course.
ob_start();
$user_database_entry = getSingleDatabaseEntryByValue('users', 'openIdConnectSub', $_SESSION['sub']);
ob_end_clean();
$creator = $user_database_entry['id'];

// Create database-entry
$sql = "INSERT INTO courses (name, description, creator, role_url, contact, dates, links, subject_id) VALUES ('$name','$text', $creator, '$role_link', '$contact', '$dates', '$links', '$subject_id')";

$conn->query($sql);

$last_id = $conn->lastInsertId();

$html = "";
if (isset($_GET['widget']) && $_GET['widget'] == 'true') {
  $html = "&widget=true";
}

// After creating a course, the user is redirected to the edit page. The reason
// for this is, that it is not possible to add models on addcourse.php. But the user
// can add models on editcourse.php
header("Location: ../views/editcourse.php?id=$last_id$html");
?>
