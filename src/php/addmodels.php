<?php
/** 
 * @file addmodels.php
 * Script for adding selected models to the course
 */
include 'db_connect.php';
include 'tools.php';

$course = $_POST["course"];
$models = json_decode($_POST["models"],true);

$tuples = "";
foreach ($models as $modelid) {
    $tuples.=" ($course,$modelid),";
}

// remove last comma
$tuples = substr_replace($tuples, "", -1);

// Insert models into database
$query = $db->query("INSERT INTO course_models (course_id,model_id) VALUES".$tuples);

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