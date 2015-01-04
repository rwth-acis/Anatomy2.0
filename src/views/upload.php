<!DOCTYPE html>	
<html>
  <head>
    <title>Upload Page</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
    <!-- Additional styles -->
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <!--<link rel='stylesheet' type='text/css' href='../css/style.css'> -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> 
	<script src="../js/jquery.form.min.js"></script> 	
	<script src="../js/script.js"></script> 	
	<style>
		#progressbox {
		border: 1px solid #0099CC;
		padding: 1px; 
		position:relative;
		width:400px;
		border-radius: 3px;
		margin: 10px;
		display:none;
		text-align:left;
		}
		#progressbar {
		height:20px;
		border-radius: 3px;
		background-color: #003333;
		width:1%;
		}
		#statustxt {
		top:3px;
		left:50%;
		position:absolute;
		display:inline-block;
		color: #000000;
		}	
	</style>
  </head>
  <body>
    <!-- <div class="container">
  <header>
    <div class="row">
      <div class="col-md-12"> 
        <ul id="menu">
          <li><a href="home.html"><h1><strong>HENM</strong></h1></a></li>
          <li><a href="...">Upload</a></li>
          <li><a href="...">Models</a></li>
          <li><a href="...">Settings</a></li>
          <li><a href="...">About</a></li>
        </ul>
      </div>
    </div>    
    <div class="row">
      <div class="col-md-12" style="position:relative; right:20px">   
        <ul id="color">
          <li class="color color-red"></li>
          <li class="color color-yellow"></li>
          <li class="color color-blue"></li>
        </ul>
      </div>  
    </div>
  </header>
  <div id="wrap">
    <form action="" autocomplete="on">
      <input id="search" name="search" type="text" placeholder="Which model ?">
      <input id="search_submit" value="search" type="submit">
    </form>
  </div> -->

	
    <div class="container">
	    <h1>Upload Model</h1>
	    <!--- UPLOAD FORM -->
   		<form role="form" action="../php/upload_script.php" method="post" enctype="multipart/form-data" id="UploadForm">
		  <div class="form-group">
		    <label for="targetName">Your Model Name</label>
		    <input type="text" class="form-control" name="name" id="targetName" placeholder="Enter your model name" required>
		  </div>
		  <div class="form-group">
			<label for="targetText">Your Model Description</label>
		    <textarea class="form-control" rows="3" name="text" id="targetText" placeholder="Enter you model description" required></textarea>
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
			  <li>File Size: 50MB</li>
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
    
	  <footer>
    <p class="text-center">HENM LAB 2014/15: 3D Models</p>
    <p class="text-center">Reach us at: <a href="mailto:henm1415g2@dbis.rwth-aachen.de">henm1415g2@dbis.rwth-aachen.de</a></p>
  </footer>
<!-- Close surrounding container -->
</div>
  </body>

</html>
