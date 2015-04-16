<?php 
	/**
	 * @file confirm_registration.php
	 * 
   * Sets the confirmation flag in the database for a given email address
	 */
  
  $mail = $_POST['mail'];
  
  // Create database-entry
  $conn = require '../php/db_connect.php';

  $sql = "UPDATE users SET confirmed=1 WHERE email='" . $mail . "'";
				
  // This will escape symbols in the SQL statement (also supposed to prevent 
  // SQL injection attacks). Returns a PDOStatement
  $sth = $db->prepare($sql);
  
  // Executes the select statement on DB
  $success = $sth->execute();
  
  if ($success) {
    // Create result to transmit to client. SQL is sent only for debugging
    $result = array('result'=>'ok', 'mail'=>$mail, 'sql'=>$sql);		
  }
  else {
    $result = array('result'=>'error', 'mail'=>$mail, 'sql'=>$sql, 'error'=>'Confirmation was not successful. Please try again.');		
  }

  // JSON encode the return value to be transmitted to client again
  echo json_encode($result);
?>
	
