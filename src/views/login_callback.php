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
 *  @file login_callback.php
 *  Callback page for the Learning Layers service. Will redirect to the page the
 *  user was originally on.
 */
?>
<!DOCTYPE html>	
<html>
  
  <head>
    <title>Redirecting</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body>
    <?php require("menu.php") ?>
    
    <header id='head' class='secondary'>
    <div class='container'>
      <div class='row'>
        <h1>Redirecting ...</h1>
      </div>
    </div>
    </header>
    
    <?php include("footer.php"); ?>
    
  </body>
  
</html>


