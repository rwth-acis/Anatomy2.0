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
$html = createTable($result, $_POST["type"]);
echo $html;
?>