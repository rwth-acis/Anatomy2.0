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
 *  @file user_management.php
 *  Class for CRUD operations for users
 */

class UserManagement {
  
  private $db;
  
  /**
   * Constructor for UserManagement
   */
  function __construct() {
    $this->db = require 'db_connect.php';
  }
  
  /**
   * Reading a user from our database
   * @param String $sub The Open ID Connect SUB
   * @return Object object with property names that correspond to the column 
   * names of our users table
   */
  public function readUser($sub) {
    $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
    $sqlSelect = "SELECT * FROM `users` WHERE openIdConnectSub='" . $sub . "'";
    // This will escape symbols in the SQL statement (also supposed to prevent 
    // SQL injection attacks). Returns a PDOStatement
    $sth = $this->db->prepare($sqlSelect);
    $sth->execute();
    return $sth->fetch(PDO::FETCH_OBJ);
  }
  
  /**
   * Create a user entry in our database
   * @param type $userProfile Object with properties email, sub, given_name,
   * family_name
   */
  public function createUser($userProfile) {
    // CREATE A NEW USER DATABASE ENTRY
    $sqlInsert = "INSERT INTO users (email, openIdConnectSub, given_name, family_name) VALUES ('".$userProfile->email."','".$userProfile->sub."','".$userProfile->given_name."','".$userProfile->family_name."')";
    $sth = $this->db->prepare($sqlInsert);
    $ret = $sth->execute();
    if($ret === false) {
      error_log('Error: user insertion in database failed!');
      die('Could not create new user.');
    }
  }
  
  /**
   * Update a user entry in our database
   * @param type $userProfile
   */
  public function updateUser($userProfile) {
    // TODO
  }
  
  /**
   * Delete a user entry in our database
   * @param type $sub
   */
  public function deleteUser($sub) {
    // TODO
  }
}