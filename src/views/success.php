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
 * @file success.php
 * Webpage for displaying success of model upload
 */
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Upload Page</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
  </head>
  <body>
	<div class="container">
  		<div class="alert alert-success" role="alert">Your Model has been uploaded successfully</div>
  <?php
    //If this site is viewed in ROLE, do not provide "See your model" (can be provided if opened in the other widget)
    if(!(isset($_GET["widget"]) && $_GET["widget"] == "true"))
    {
  ?>
      <a  href="model_viewer.php?id=<?php echo $_GET['id']?>" >See your Model</a>
  <?php 
    }
  ?>
	</div>
  </body>

</html>
