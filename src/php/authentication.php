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
 *  @file authentication.php
 *  Does identity verification – tries to verify users are who they say they are
 */

class Authentication {

  /**
   * @return boolean true, if the users identity has been verified
   */
  public function isAuthenticated() {
    
    session_start();
    
    // Implementation depends on the service used to authenticate a user 
    // (e.g. Learning Layers)
    if ($_SESSION['service_type'] === 'LearningLayers') {
      // fake implementation: As we cannot connect to the Learning Layers server,
      // there is no way to find out whether the access token is still valid
      // so we always return true if there is an access token at all
      if (isset($_SESSION['access_token'])) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  
  /**
   * Reading user data from the authentication service provider 
   * (e.g. Learning Layers)
   * @return \stdClass with sub, email, given_name and family_name attribute
   */
  public function getUserProfile() {    
    
    session_start();
    
    // Where the data can be retrieved from depends on which service has been 
    // used to authenticate the user
    if ($_SESSION['service_type'] === 'LearningLayers') {
      // from fake login: As we cannot connect to the Learning Layers server, we
      // read user data provided from the client to our server
      $userProfile = new stdClass();
      $userProfile->sub = filter_input(INPUT_POST, 'sub');
      $userProfile->email = filter_input(INPUT_POST, 'email');
      $userProfile->given_name = filter_input(INPUT_POST, 'given_name');
      $userProfile->family_name = filter_input(INPUT_POST, 'family_name');
      // fake_end

      //// Get user-profile from las2peer-service     not needed for fake login

      // require '../config/config.php';
      // require '../php/tools.php';
      // $res = getUserProfile($access_token);
      // if($res->bOk === false) {
      //   die('Cannot retrieve User-information!');
      // }
      //	
      //$userProfile = json_decode($res->sMsg);
      
      return $userProfile;
    }
  }
}
