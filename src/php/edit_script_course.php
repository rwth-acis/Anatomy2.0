<?php 
/**
* @file upload_script_course.php
* 
* Adss new course to the course database on the server
* adds metadata about it database.
*/
//Get input data from form
$id = $_POST['targetId'];
$name = $_POST['name'];
$text = $_POST['text'];
$role_link = $_POST['roleLink'];
$preview_img_link = $_POST['previewImgLink'];

//Creator stays the same
	
// Create database-entry
$conn = require '../php/db_connect.php';

$sql = "UPDATE courses SET name='$name', description='$text', role_url='$role_link', img_url='$preview_img_link' WHERE id=$id";

//echo "sqlquery: $sql";

$conn->query($sql);

$last_id = $conn->lastInsertId();

header("Location: ../views/success-course-upload.php?id=$last_id");


echo 'Successfully added course';
	
?>