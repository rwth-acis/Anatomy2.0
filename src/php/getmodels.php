<?php
/** 
 * @file getmodels.php
 * Script for searching models matching the words entered by the user
 */
include 'db_connect.php';
include 'tools.php';

// Get search words
$searchstr = explode(" ", trim($_POST['q']));

// Compare each word to the name, the classification and the description of a model
$whereClause = '';
foreach( $searchstr as $word) {
   $whereClause .= " name LIKE '%".$word."%'
                    OR classification LIKE '%".$word."%' OR";
}

// Remove last 'OR'
$whereClause = substr($whereClause, 0, -2);

$query = $db->query("SELECT * FROM models WHERE" . $whereClause);
$result = $query->fetchAll();

// Create table structure and display it on the page
$html = createTable($result, "model");
echo $html;
?>