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
 * @file check_credentials.php
 * Script for verification of login credentials (email + password).
 */
      
include '../php/db_connect.php';

// If email or password not set, there is nothing to check
if (isset($_POST['login_email']) && isset($_POST['login_password'])) {
  // The next line is only for debugging PDO 
  //$db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
  
	$email = $_POST['login_email'];
  // Password is md5 hashed before storing in DB
	$pass = md5($_POST['login_password']);
  $sql = "SELECT * FROM `users` WHERE `email`='$email' AND `pass`='$pass'";
  // This will escape symbols in the SQL statement (also supposed to prevent 
  // SQL injection attacks). Returns a PDOStatement
  $sth = $db->prepare($sql);
  // Executes the select statement on DB
  $sth->execute();
  // As there can be only one row in the result, get the first row
  $user = $sth->fetch();
  // If user is empty, the email and password did not match anything in DB
  if($user) {
		if ($user['confirmed']) {
      // Now that user is logged in, we can personalize web page. Store data using session
      session_start();
			$_SESSION['user_id'] = $user['id'];
			$_SESSION['user_email'] = $user['email'];
			$result = array('result'=>'ok','email'=>$email);
		}
    else {
			$result = array('result'=>'Your account has not yet been confirmed. Please contact an administrator to unlock your account.');
		}
  }
  else {
		$result = array('result'=>'The provided email or password is wrong. Please consider that email and password are case sensitive.');		
	}
}
else {
	$result = array('result'=>'Please input your email and password.');			
}
// JSON encode the return value to be transmitted to client again
echo json_encode($result);

?>