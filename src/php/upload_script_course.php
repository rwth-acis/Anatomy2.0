<?php 
/**
* @file upload_script_course.php
* 
* Adss new course to the course database on the server
* adds metadata about it database.
*/
//Get input data from form
$name = $_POST['name'];
$text = $_POST['text'];
$role_link = $_POST['roleLink'];
$preview_img_link = $_POST['previewImgLink'];

//TODO: get id of currently logged in user
$creator=17;
	
// Create database-entry
$conn = require '../php/db_connect.php';

$sql = "INSERT INTO courses (name, description, creator, role_url, img_url) VALUES ('$name','$text', $creator, '$role_link', '$preview_img_link')";

echo "sqlquery: $sql";

$conn->query($sql);

$last_id = $conn->lastInsertId();

header("Location: ../views/success-course-upload.php?id=$last_id");


echo 'Successfully added course';
?>
