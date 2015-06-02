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
 *  @file checkUserKnown.php
 *  Script for verification of OIDC-login.
 */

  $confirmed = 0;
  $access_token = filter_input(INPUT_POST, 'access_token');
  // from fake login:
  $userprofile->sub = filter_input(INPUT_POST, 'sub');
  $userprofile->email = filter_input(INPUT_POST, 'email');
  $userprofile->given_name = filter_input(INPUT_POST, 'given_name');
  $userprofile->family_name = filter_input(INPUT_POST, 'family_name');
  // fake_end
  
  if (isset($access_token)) {

		////// Setup session and cache access_token as login-validation, also for other pages      
      session_start();
		$_SESSION['access_token'] = $access_token;
		//from fake login:
		$_SESSION['sub'] = $userprofile->sub;
		// fake_end		

		////// Get user-profile from las2peer-service     not needed for fake login
		
      // require '../config/config.php';
  		// require '../php/tools.php';
  		// $res = getUserProfile($access_token);
  		// if($res->bOk === false) {
      //		die('Cannot retrieve User-information!');
      //	}
		//	
      //$userProfile = json_decode($res->sMsg);
      
		////// Search database for user and create new entry if it doesn't have      
      
      require '../php/db_connect.php';
      $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
      
      // FIRST OF ALL, CHECK WHETHER THE USER IS KNOWN TO THE SYSTEM
      // THIS IS DONE BY CHECKING WHETHER THE UNIQUE OPEN ID CONNECT SUB EXISTS IN OUR DATABASE
      $sqlSelect = "SELECT * FROM `users` WHERE openIdConnectSub='".$userProfile->sub."'";

      // This will escape symbols in the SQL statement (also supposed to prevent 
      // SQL injection attacks). Returns a PDOStatement
      $sth = $db->prepare($sqlSelect);
      $sth->execute();
      $user = $sth->fetch();
      
      $sqlInsert="";
      // If $user is empty, the user is not known
      if(!$user) {
        // CREATE A NEW USER DATABASE ENTRY IF USER WAS NOT KNOWN TO THE SYSTEM
		  $sqlInsert = "INSERT INTO users (email, openIdConnectSub, given_name, family_name) VALUES ('".$userProfile->email."','".$userProfile->sub."','".$userProfile->given_name."','".$userProfile->family_name."')";
        $sth = $db->prepare($sqlInsert);
        $ret = $sth->execute();
        if($ret === false) {
          error_log('Error: user insertion in database failed!');
          die('Could not create new user.');
        }
      } else {
      	// TODO: update user-email
      }
  }