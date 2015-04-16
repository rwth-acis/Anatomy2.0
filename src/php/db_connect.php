<?php
	/** @file db_connect.php 
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