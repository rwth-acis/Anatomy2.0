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

// CREATING A XML FILE FOR THE GALLERY WIDGET
$xml_file_name_path = __DIR__ . "/../widgets/gallery$last_id.xml";
$content = 
'<?xml version="1.0" encoding="UTF-8" ?>
  <Module>
    <ModulePrefs title="Anatomy 2.0 Gallery" description="" author="Dominik Studer" author_email="studer@dbis.rwth-aachen.de" height="250" width="1200">
        <Require feature="opensocial-0.8"/>
    </ModulePrefs>
    <Content type="html">
<![CDATA[

  <!-- The following seems to be the minimum required includes and html for iwc to work -->

  <!-- Interwidget communication includes -->
  <script src ="http://open-app.googlecode.com/files/openapp.js" > </script>
  <script src ="http://dbis.rwth-aachen.de/gadgets/iwc/lib/iwc.js" > </script>
  <script src ="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <!-- provide Role objects for subsites -->
  <script type="text/javascript" src="../js/init-wrapper.js"></script>

  <!-- container for the actual site: -->
  <iframe id="content-frame" src="' . $baseUrl . '/src/views/gallery.php?widget=true&id=' . $last_id . '" width="100%" height="100%" frameborder="no" padding=0 margin=0>
  </iframe>

]]>
    </Content>
</Module>
';
$fp = fopen($xml_file_name_path, "wb");
fwrite($fp, $content);
fclose($fp);

$html = "";
if (isset($_GET['widget']) && $_GET['widget'] == 'true') {
  $html = "&widget=true";
}

// After creating a course, the user is redirected to the edit page. The reason
// for this is, that it is not possible to add models on addcourse.php. But the user
// can add models on editcourse.php
header("Location: ../views/editcourse.php?id=$last_id$html");
?>
