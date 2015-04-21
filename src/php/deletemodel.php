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
 * @file deletemodel.php
 * Script for deleting the clicked models from the course
 */
include 'db_connect.php';
include 'tools.php';

$course = $_POST["course"];
$model = $_POST["model"];

// Delete model in database
$query = $db->query("DELETE FROM course_models WHERE course_id = $course AND model_id = $model");

// Get all models associated with the course
$query = $db->query("SELECT * 
                     FROM course_models
                     INNER JOIN models ON course_models.model_id = models.id
                     WHERE course_models.course_id = $course");
$result = $query->fetchAll();

// Create table structure and display it on the page
$html = createTable($result,"modeldeletion");
echo $html;
?>