<?php 
  
  include '../php/db_connect.php';
  
  $email = $_POST['register_email'];
  $pw = md5($_POST['register_pw']);
  
  // Use only when debugging
  //$db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
  
  $sql = "INSERT INTO users (email, pass) VALUES ('$email','$pw')";
  
  // This will escape symbols in the SQL statement (also supposed to prevent 
  // SQL injection attacks). Returns a PDOStatement
  $sth = $db->prepare($sql);
  // Executes the select statement on DB
  $success = $sth->execute();
  
  // Create result to transmit to client. SQL is sent only for debugging
  if ($success) {
    $result = array('result'=>'ok', 'sql'=>$sql);		
  }
  else {
    $result = array('result'=>'error', 'sql'=>$sql);		
  }

  // JSON encode the return value to be transmitted to client again
  echo json_encode($result);
?>