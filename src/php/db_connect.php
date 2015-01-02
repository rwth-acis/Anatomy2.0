<?php
	$host = "localhost:3306";
	$database = "henm1415g2";
	$user = "root";
	$password = "";

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