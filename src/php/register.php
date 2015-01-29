<?php 
  
  include '../php/db_connect.php';
  
  $email = $_POST['register_email'];
  $pw = md5($_POST['register_pw']);
  
  $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
  
  $sql = "INSERT INTO users (email, pass) VALUES ('$email','$pw')";
  
  // This will escape symbols in the SQL statement (also supposed to prevent 
  // SQL injection attacks). Returns a PDOStatement
  $sth = $db->prepare($sql);
  // Executes the select statement on DB
  $sth->execute();
  
  $result = array('email'=>$email, 'pw'=>$pw, 'sql'=>$sql);		

  // JSON encode the return value to be transmitted to client again
  echo json_encode($result);
?>