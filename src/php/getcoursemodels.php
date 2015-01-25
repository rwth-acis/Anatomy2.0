<?php 
/** 
 * @file getcoursemodels.php
 * Script for displaying all models for selection
 */
include 'db_connect.php';
include 'tools.php';

$query  = $db->query("SELECT * FROM models");
$result = $query->fetchAll();

$html = createTable($result,"modelselection");
echo $html;
?>