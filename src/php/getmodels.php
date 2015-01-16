<?php
include 'db_connect.php';
include 'tools.php';

$searchstr = $_GET['q'];
$query = "SELECT * FROM models WHERE name LIKE '%".$searchstr."%'";
$result = mysql_query($query);

$html = createModelsTable($result);
echo $html;
?>