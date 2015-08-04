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
 *  @file access_control.php
 *  Class which is able to decide whether a user can access a feature or not
 */

require_once 'user_management.php';
require_once 'tools.php';

class AccessControl {
  
  private $lastStatus = USER_STATUS::NO_SESSION;

  private function getSessionUser() {
    $db = require_once 'db_connect.php';
    $userManagement = new UserManagement();      
    return $userManagement->readUser($db, $_SESSION['sub']);
  }
  
  private function getUserStatus($user) {
    
    // $aRes = httpRequest("GET", $las2peerUrl.'/'.'user'.'?access_token='.$_SESSION['access_token']);	
    //
    // if($aRes->bOk == FALSE) { $status = USER_STATUS::LAS2PEER_CONNECT_ERROR;
    // } else if($aRes->iStatus === 401) { $status = USER_STATUS::OIDC_UNAUTHORIZED;
    // } else if($aRes->iStatus !== 200) { $status = USER_STATUS::OIDC_ERROR;
    // } else {
    //	// OIDC is OK
    //	// check if user is confirmed as tutor
    //	$user_oidc_profile = json_decode($aRes->sMsg);

    if(!$user) {
     // User has no databaseentry
      $status = USER_STATUS::USER_NOT_CONFIRMED;
    } else if($user->confirmed != 1) {
      $status = USER_STATUS::USER_NOT_CONFIRMED;
    } else {
      $status = USER_STATUS::USER_IS_TUTOR;			
    }
      
    $this->lastStatus = $status;
    
    return $status;
  }
  
  private function isLecturer() {
    if(!isset($_SESSION['access_token'])) {
      $this->lastStatus = USER_STATUS::NO_SESSION;
      return false;
    } else {
      return $this->getUserStatus($this->getSessionUser()) == USER_STATUS::USER_IS_TUTOR;
    }
  }
  
  private function isLecturerAndCourseOwner($course_id) {
    $ret = false;
    if(!isset($_SESSION['access_token'])) {
      $this->lastStatus = USER_STATUS::NO_SESSION;
    } else {
      $user = $this->getSessionUser();
      if ($this->getUserStatus($user) == USER_STATUS::USER_IS_TUTOR) {

        $course = getSingleDatabaseEntryByValue('courses', 'id', $course_id);
        $ret = $user->id == $course->creator;
      }
    }
    return $ret;
  }
  
  public function canCreateModel() {
    return $this->isLecturer();
  }
  
  public function canCreateCourse() {
    return $this->isLecturer();
  }
  
  public function canUpdateCourse($course_id) {
    $this->isLecturerAndCourseOwner($course_id);
  }
  
  public function canDeleteCourse($course_id) {
    $this->isLecturerAndCourseOwner($course_id);
  }
  
  public function canEnterLecturerMode() {
    return $this->isLecturer();
  }
  
  public function getLastErrorStatus() {
    return $this->lastStatus;
  }
  
  public function getErrorMessage($status) {
    switch($status) {
      case USER_STATUS::NO_SESSION:
        $err_msg = 'This feature can only be used as a lecturer. If you are a lecturer, please click the "Sign in" button to log in.';
        break;
      case USER_STATUS::LAS2PEER_CONNECT_ERROR:
        $err_msg = 'Unable to check your login, sorry!';
        break;
      case USER_STATUS::OIDC_UNAUTHORIZED:
        $err_msg = 'Your logindata is invalid. Probably the session has expired and you have to login again.';
        break;
      case USER_STATUS::OIDC_ERROR:
        $err_msg = 'Some error with your account-validation occured, sorry!';
        break;
      case USER_STATUS::DATABASE_ERROR:
        $err_msg = 'Your tutor-status could not be checked, sorry! You may try again later.';
        break;
      case USER_STATUS::USER_NOT_CONFIRMED:
        $err_msg = 'At the moment, you do not have a lecturer account. If you are a lecturer, you can request your account being upgraded to a lecturer account by clicking the "I am a lecturer!" button.';
        break;
      case USER_STATUS::USER_IS_TUTOR:
        $err_msg = '';
        break;
    }

    return $err_msg;
  }
  
  public function getLastErrorMessage() {
    return $this->getErrorMessage($this->getLastErrorStatus());
  }
}

abstract class USER_STATUS
{
    const NO_SESSION = 0;
    const LAS2PEER_CONNECT_ERROR = 1;
    const OIDC_UNAUTHORIZED = 2;
    const OIDC_ERROR = 3;
    const DATABASE_ERROR = 4;
    const USER_NOT_CONFIRMED = 5;
    const USER_IS_TUTOR = 6;
}