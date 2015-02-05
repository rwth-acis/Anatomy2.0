<?php 
/**
* @file upload_script_course.php
* 
* Adss new course to the course database on the server
* adds metadata about it database.
*/

//create database connection (needs to be done before mysql_real_escape_string)
$conn = require '../php/db_connect.php';

//Get input data from form
$id = $_POST['targetId'];
$name = mysql_escape_string($_POST['name']);
$text = mysql_escape_string($_POST['text']);
$role_link = $_POST['roleLink'];
$preview_img_link = $_POST['previewImgLink'] != "" ? $_POST['previewImgLink'] : "https://www.symplicity.com/assets/Icon_-_Product_Features_-_Tutor_New.jpg";

//Creator stays the same
	
// modify database-entry
$sql = "UPDATE courses SET name='$name', description='$text', role_url='$role_link', img_url='$preview_img_link' WHERE id=$id";

//echo "sqlquery: $sql";

$conn->query($sql);

$html = "";
if(isset($_GET['widget']) && $_GET['widget'] == 'true') {$html = "&widget=true";}

header("Location: ../views/course.php?id=$id$html");

?>