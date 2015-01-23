<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' charset='utf8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Edit Your Course</title>

    <!-- X3Dom includes -->
    <script type='text/javascript' src='http://www.x3dom.org/download/x3dom.js'> </script>

    <!-- Init communication with wrapper -->
    <script type='text/javascript' src='../js/init-subsite.js'> </script>

    <script type='text/javascript' src='../js/x3d-extensions.js'> </script>
    <script type='text/javascript' src='../js/viewer.js'> </script>
    <link type='text/css' rel='stylesheet' href='http://www.x3dom.org/download/x3dom.css'> </link>

    <link rel='stylesheet' type='text/css' href='../css/model_viewer.css'></link>

    <!-- Additional styles -->
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <link rel='stylesheet' type='text/css' href='../css/style.css'>

    <!-- General functionality (used in menuToolbar.js) -->
    <script type="text/javascript" src="../js/tools.js"></script>
    <!-- The library for the copy to clipboard feature in the toolbar -->
    <script type="text/javascript" src="../js/ZeroClipboard.js"></script>
  </head>

  <body>
    <?php include("menu.php"); ?>
  
    <div class="row" style="position:relative; padding-left:5%; padding-right:5%">
         <?php
             //Decide if this site is inside a separate widget
             if(isset($_GET["widget"]) && $_GET["widget"] == "true")
             {
                 print("<script type='text/javascript' src='../js/model-viewer-widget.js'> </script>");
             }
          ?>
          <?php
            include '../php/db_connect.php';
            include '../php/tools.php';
            
            $arg    = $_GET["id"];
            $query  = $db->query("SELECT * FROM courses WHERE id = $arg");
            $entry = $query->fetchObject();
      
	    echo "<div class='container'>
	    <h1>Edit Your Course</h1>
	    <!--- UPLOAD FORM -->
   	    <form role='form' action='../php/edit_script_course.php' method='post' enctype='multipart/form-data' id='UploadForm'>
              <div class='form-group'>
		<!-- hidden field for course id -->
		<input type='hidden' name='targetId' value='$arg'>
		<label for='targetName'>Your Course Name</label>
		<input type='text' class='form-control' rows='1' name='name' id='targetName' value='$entry->name' required>
              </div>
              <div class='form-group'>
		<label for='targetText'>Description of your Course</label>
		<textarea class='form-control' rows='3' name='text' id='targetText' required>$entry->description</textarea>
              </div>
              <div class='form-group'>
		<label for='targetText'>Link to your course space in ROLE</label>
		<textarea class='form-control' rows='1' name='roleLink' id='targetRole' required>$entry->role_url</textarea>
              </div>
              <div class='form-group'>
		<label for='targetText'>Link to the Preview Image of your Course</label>
		<textarea class='form-control' rows='1' name='previewImgLink' id='targetImgLink' required>$entry->img_url</textarea>
              </div>
              <button type='submit' class='btn btn-default' id='SubmitButton' value='Upload'>Submit</button>
	    </form>
	    <div id='output'></div>
	  </div>";
          ?>
    
    <?php include("footer.html");?>
  </body>
</html>
