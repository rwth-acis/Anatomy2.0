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
 *  @file upload_content.php
 *  The content of 'upload_content.php' if the user is allowed to create / upload models
 */
?>
<div class="container">

  <?php $action = '"../php/upload_script.php"'; ?>
  <form role="form" action=<?php echo $action?> method="post" enctype="multipart/form-data" id="UploadForm">
    <div class="form-group">
      <label for="targetName">Your Model Name</label>
      <input type="text" class="form-control" name="name" id="targetName" placeholder="Enter your model name" data-parsley-trigger="keyup" data-parsley-minlength="5"
        data-parsley-validation-threshold="1" data-parsley-minlength-message = "Please give it at least a 5 characters name.." required>
    </div>
    <div class="form-group">
      <label for="targetText">Your Model Description</label>
      <textarea class="form-control" rows="3" name="text" id="targetText" placeholder="Enter a model description... (optional)"></textarea>
    </div>
    <div class="form-group">
      <label for="targetOption">Choose Category</label>
      <select class="form-control" name="cat" id="targetOption">
        <option value="Archaeology">Archaeology</option>
        <option value="Games">Games</option>
        <option value="Medicine">Medicine</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div class="form-group">
      <label for="tagetInputFile">File input</label>
      <input type="file" name="file" id="targetInputFile" required>
      <p class="help-block">
      <ul>
        <li>File Format: *.x3d</li>
        <li>File Size: 100MB</li>
      </ul>
      </p>
    </div>
    <button type="submit" class="btn btn-default" id="SubmitButton" value="Upload">Submit</button>
  </form>
  <div id="progressbox">
    <div id="progressbar"></div >
    <div id="statustxt">0%</div >
  </div>
  <div id="output"></div>
</div>

<!-- Javascript -->
<script src="../external/jquery-form/jquery.form.js"></script>
<!-- Form Validation - Parsley -->
<script src="../external/parsleyjs/dist/parsley.min.js"></script>

<script src="../js/upload.js"></script>
