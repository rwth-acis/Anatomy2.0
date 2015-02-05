<!DOCTYPE html>	
<html>
  <head>
    <title>Create a new course</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
    <!-- Additional styles -->
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <!--<link rel='stylesheet' type='text/css' href='../css/style.css'> -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> 
	<script src="../js/jquery.form.min.js"></script> 	
	<script src="../js/script.js"></script> 	
  </head>
  <body>
    <?php 
      include("menu.php"); 
      // If the user is not logged in, redirect him to the login page
      if (!isset($_SESSION['user_id'])) { 
        header("Location: login.php");
        exit();
      }

    ?> 
	
    <div class="container">
	    <h1>Create a New Course</h1>
	    <!--- UPLOAD FORM -->
   		<form role="form" action="../php/upload_script_course.php<?php if(isset($_GET['widget']) && $_GET['widget']) {echo '?widget=true';} ?>" method="post" enctype="multipart/form-data" id="UploadForm">
        <div class="form-group">
          <label for="targetName">Your Course Name</label>
          <input type="text" class="form-control" rows="1" name="name" id="targetName" placeholder="Enter your course name" required>
        </div>
        <div class="form-group">
        <label for="targetText">Description of your Course</label>
          <textarea class="form-control" rows="3" name="text" id="targetText" placeholder="Enter course description"></textarea>
        </div>
        <div class="form-group">
        <label for="targetText">Link to your course space in ROLE</label>
          <textarea class="form-control" rows="1" name="roleLink" id="targetRole" placeholder="Enter ROLE space link"></textarea>
        </div>
        <div class="form-group">
        <label for="targetText">Link to the Preview Image of your Course</label>
          <textarea class="form-control" rows="1" name="previewImgLink" id="targetImgLink" placeholder="Enter preview image link"></textarea>
        </div>
        <button type="submit" class="btn btn-default" id="SubmitButton" value="Upload">Submit</button>
      </form>
      <div id="output"></div>
    </div>
    
    <?php include("footer.php");?>
  </body>

</html>
