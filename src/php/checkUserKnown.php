<?php

/* 
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * 
 *  @file check_credentials.php
 *  Script for verification of login credentials (email + password).
 */

  $confirmed = 0;
  $access_token = filter_input(INPUT_POST, 'access_token');

  if (isset($access_token)) {
      require '../php/db_connect.php';
      require '../config/config.php';
  		require '../php/tools.php';

  		$aRes = httpRequest("GET", $las2peerUrl.'/'.'user'.'?access_token='.$access_token);
      // Use only when debugging
	  	// require '../php/fb.php';

      $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
      
      if($aRes->bOk == FALSE or $aRes->iStatus !== 200) {
      	error_log('3dnrt/user call unsuccessfull: '.$aRes.sMsg);
      	die('Cannot retrieve User-information!');
      }
      $userProfile = json_decode($aRes->sMsg);
      
      // FIRST OF ALL, CHECK WHETHER THE USER IS KNOWN TO THE SYSTEM
      // THIS IS DONE BY CHECKING WHETHER THE UNIQUE OPEN ID CONNECT SUB EXISTS IN OUR DATABASE
      $sqlSelect = "SELECT * FROM `users` WHERE openIdConnectSub='".$userProfile->sub."'";

      // This will escape symbols in the SQL statement (also supposed to prevent 
      // SQL injection attacks). Returns a PDOStatement
      $sth = $db->prepare($sqlSelect);
      // Executes the select statement on DB
      $sth->execute();
      // As there can be only one row in the result, get the first row
      $user = $sth->fetch();
      // If $user is empty, the user is not known
      if(!$user) {
        // CREATE A NEW USER DATABASE ENTRY IF USER WAS NOT KNOWN TO THE SYSTEM
		  $sqlInsert = "INSERT INTO users (email, openIdConnectSub, given_name, family_name) VALUES ('".$userProfile->email."','".$userProfile->sub."','".$userProfile->given_name."','".$userProfile->family_name."')";
        $sth = $db->prepare($sqlInsert);
        // Executes the select statement on DB
        $ret = $sth->execute();
        if($ret === false) {
          error_log('Error: user insertion in database failed!');
          die('Could not create new user.');
        }
      }
      else {
        $confirmed = $user['confirmed'];
      }
  }
  
  $result = ['confirmed'=>$confirmed, 'sqlSelect'=>$sqlSelect, 'sqlInsert'=>$sqlInsert];		
  echo json_encode($result);