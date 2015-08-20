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
 *  @file authorization.php
 *  TODO
 */

class Authorization {

  public function isAuthorized() {
    
    session_start();
    
    if ($_SESSION['service_type'] === 'LearningLayers') {
      if (isset($_SESSION['access_token'])) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  
  public function getUserProfile() {    
    
    session_start();
    
    if ($_SESSION['service_type'] === 'LearningLayers') {
      // from fake login:
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
