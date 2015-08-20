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
 *  @file login_redirect.php
 *  Redirects a user to the url stored in $_SESSION["currentPage"].
 *  This is used to be able to redirect users to the page they came from after 
 *  using learning layers service to authenticate
 */

session_start();

require_once '../config/config.php';

if (isset($_SESSION["currentPage"])) {

  header('Location: '.$_SESSION["currentPage"]);
}
else {
  header('Location: '.$baseUrl.'/src/views/welcome.php');
}

