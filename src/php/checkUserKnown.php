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
  $openIdConnectSub = filter_input(INPUT_POST, 'openIdConnectSub');
  $openIdConnectEmail = filter_input(INPUT_POST, 'openIdConnectEmail');

  if (isset($openIdConnectSub) && isset($openIdConnectEmail)) {
    if ($openIdConnectEmail !== FALSE && $openIdConnectSub !== FALSE) {
      require '../php/db_connect.php';
  
      // Use only when debugging
      //$db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );

      // FIRST OF ALL, CHECK WHETHER THE USER IS KNOWN TO THE SYSTEM
      // THIS IS DONE BY CHECKING WHETHER THE UNIQUE OPEN ID CONNECT SUB EXISTS IN OUR DATABASE
      $sqlSelect = "SELECT * FROM `users` WHERE openIdConnectSub='$openIdConnectSub'";

      // This will escape symbols in the SQL statement (also supposed to prevent 
      // SQL injection attacks). Returns a PDOStatement
      $sth = $db->prepare($sqlSelect);
      // Executes the select statement on DB
      $sth->execute();
      // As there can be only one row in the result, get the first row
      $user = $sth->fetch();
      // If $user is empty, the user is not known
      if($user) {
        // CREATE A NEW USER DATABASE ENTRY IF USER WAS NOT KNOWN TO THE SYSTEM
        $sth = $db->prepare($sqlInsert);
        // Executes the select statement on DB
        $ret = $sth->execute();
      }
      else {
        $confirmed = $user['confirmed'];
      }
    }
  }
  
  $result = ['confirmed'=>$confirmed, 'sqlSelect'=>$sqlSelect, 'sqlInsert'=>$sqlInsert];		
  echo json_encode($result);