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
 * @file db_connect.php 
 * Connects to the database using predefined settings.
 */

  // Sets the variables $host, $database, $user, $password
	require '../config/database.php';

	// mysql_connect - call for compatibility-reasons. The API is deprecated (http://php.net/manual/de/function.mysql-connect.php)
    $connection = mysql_connect($host, $user, $password)
    or die ("Unable to connect! Please check username and password");

    mysql_select_db($database) or die ("Requested database does not exist!");


	try {
		$db = new PDO("mysql:host=$host;dbname=$database", $user, $password);
	} catch (PDOException $e) {
		die ('Connection failed: ' . $e->getMessage());
		exit();
	}

	return $db;
?>