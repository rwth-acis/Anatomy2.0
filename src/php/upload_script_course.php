<?php 
/**
* @file upload_script_course.php
* 
* Adss new course to the course database on the server
* adds metadata about it database.
*/
session_start();

//Get input data from form
$name = mysql_real_escape_string($_POST['name']);
$text = mysql_real_escape_string($_POST['text']);
$role_link = $_POST['roleLink'];
$preview_img_link = $_POST['previewImgLink'] != "" ? $_POST['previewImgLink'] : "https://www.symplicity.com/assets/Icon_-_Product_Features_-_Tutor_New.jpg";

// Get id of currently logged in user
$creator = $_SESSION["user_id"];
	
// Create database-entry
$conn = require '../php/db_connect.php';

$sql = "INSERT INTO courses (name, description, creator, role_url, img_url) VALUES ('$name','$text', $creator, '$role_link', '$preview_img_link')";

$conn->query($sql);

$last_id = $conn->lastInsertId();

$html = "";
if(isset($_GET['widget']) && $_GET['widget'] == 'true') {$html = "&widget=true";}

header("Location: ../views/course.php?id=$last_id$html");

?>
