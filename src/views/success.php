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
