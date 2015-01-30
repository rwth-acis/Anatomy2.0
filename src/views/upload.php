<!DOCTYPE html>	
<html>
  <head>
    <title>Upload Page</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
    <!-- Additional styles -->
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <!-- To be removed?
    <link rel='stylesheet' type='text/css' href='../css/style.css'>
    -->
     
    <link rel='stylesheet' type='text/css' href='../css/upload.css'>
  </head>
  <body>
    <?php 
      include("menu.php");
      // If the user is not logged in, redirect him to the login page
      if(!isset($_SESSION['user_id'])) { 
        header("Location: login.php");
        exit();
      }
    ?> 

    <header id="head" class="secondary">
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <h1>Upload Model</h1>
          </div>
        </div>
      </div>
    </header>
    </br></br>

    <div class="container">      
      <!--- UPLOAD FORM -->
      <form role="form" action="../php/upload_script.php" method="post" enctype="multipart/form-data" id="UploadForm">
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
  
  <?php include("footer.html");?>
  
  <!-- Javascript -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <script src="../js/jquery.form.min.js"></script> 	
  <script src="../js/script.js"></script> 	
  <!-- Form Validation - Parsley -->
  <script src="../js/parsley.min.js"></script> 	
  <script src="../js/upload-validation.js"></script>

  </body>
</html>
