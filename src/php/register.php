<?php 
  
  include '../php/db_connect.php';
  require '../config/config.php';
  
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
  
  if ($success) {
    // Send a mail to admins to inform that someone wants to register
    $mail_to = "dominik.studer@rwth-aachen.de";
    $admin_name = "Dominik Studer";
    $confirmation_link = $baseUrl . "/src/views/confirm_registration.php?mail=" . $email;
    $subject = "Anatomy 2.0 Registration";
    $message = "Hello " . $admin_name . ",\n\n" .
      "someone registered with the following email address: " . $email . "\n" .
      "If the email address belongs to a lecturer, please confirm his or her account by clicking the following link: " . $confirmation_link . "\n\n" .
      "This mail was automatically generated by the Anatomy 2.0 system. Please do not respond to this mail.";
    mail($mail_to, $subject, $message);
    
    // Create result to transmit to client. SQL is sent only for debugging
    $result = array('result'=>'ok', 'sql'=>$sql);		
  }
  else {
    $result = array('result'=>'error', 'sql'=>$sql);		
  }

  // JSON encode the return value to be transmitted to client again
  echo json_encode($result);
?>