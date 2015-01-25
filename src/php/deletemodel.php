<?php
/** 
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