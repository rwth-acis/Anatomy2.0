<!DOCTYPE html>
<html>
  <head>
    <title>Collaborative 3D Model Viewer</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
     <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <!-- Init communication with wrapper -->
    <script type='text/javascript' src='../js/init-subsite.js'></script>
    <?php
       //Decide if this site is inside a separate widget
       if(isset($_GET["widget"]) && $_GET["widget"] == "true")
       {
           print("<script type='text/javascript' src='../js/overview-widget.js'> </script>");
       }
    ?>
  </head>

  <body>
    <?php include("menu.html"); ?>
    
    <div style="text-align: center;" class="jumbotron">
	  <h1 style="color: black;">Welcome to Collaborative 3D Model Viewing</h1>
	  <p>This site introduces you into Collaborative 3D Model Viewing
	    and shows you how to use it</p>
	  <p><a class="btn btn-primary btn-lg" href="overview.php" role="button">View Models</a></p>
	</div>
	
	<div class="container" style="text-align: justify;">
		<p>Collaborative 3D Model Viewing allows investigating and learning
		    from a 3D model in a group. You can open a model on different
		    devices and if one person moves the model on his device, the view
		    on all other devices is synchronized. Therefore, you can easily
		    show, explain or discuss parts of the model, no matter if you are
		    explaining something as a teacher, learning in a group over the
		    internet or discussing about an object you don't have physical
		    access to. The project mainly focuses on models from 3D scanned
		    real objects that often are too valuable or not available for
		    investigation by hands. If you want to view a model that is not
		    already in the database, you can also upload it yourself.
		</p>
		<hr>
		<p>Collaborative 3D Model Viewing allows investigating and learning
		    from a 3D model in a group. You can open a model on different
		    devices and if one person moves the model on his device, the view
		    on all other devices is synchronized. Therefore, you can easily
		    show, explain or discuss parts of the model, no matter if you are
		    explaining something as a teacher, learning in a group over the
		    internet or discussing about an object you don't have physical
		    access to. The project mainly focuses on models from 3D scanned
		    real objects that often are too valuable or not available for
		    investigation by hands. If you want to view a model that is not
		    already in the database, you can also upload it yourself.
		</p>
		<hr>
		<p>The Collaborative 3D Model Viewing is provided in widgets for
		    the <a href="http://www.role-project.eu/">Responsive Open Learning
		    Environments (ROLE)</a>. Here you can create a workspace, setup a
		    learning environment and invite other people to join you. ROLE
		    allows you to combine the Collaborative 3D Model Viewing with many
		    other widgets for collaborative learing.
		</p>
		
	</div>  
    
    <div class="container" style="margin-top: 50px;">
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-check"></i>3D Models</h4>
                    </div>
                    <div class="panel-body">
	                    <img src="../images/skull.png" alt="...">
	                    <hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, optio corporis quae nulla aspernatur in alias at numquam rerum ea excepturi expedita tenetur assumenda voluptatibus eveniet incidunt dicta nostrum quod?</p>
                        <a href="overview.php" class="btn btn-default">View Models</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-gift"></i>Set Up Viewing Environement</h4>
                    </div>
                    <div class="panel-body">
	                    <img src="../images/role.png" alt="...">
	                    <hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, optio corporis quae nulla aspernatur in alias at numquam rerum ea excepturi expedita tenetur assumenda voluptatibus eveniet incidunt dicta nostrum quod? </p>
    					
                        <a href="http://role-sandbox.eu/" class="btn btn-default">To ROLE Space</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-compass"></i>Upload your own Model</h4>
                    </div>
                    <div class="panel-body">
	                    <img src="../images/upload.png" alt="...">
	                    <hr>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, optio corporis quae nulla aspernatur in alias at numquam rerum ea excepturi expedita tenetur assumenda voluptatibus eveniet incidunt dicta nostrum quod?</p>
                        <a href="upload.php" class="btn btn-default">Upload Page</a>
                    </div>
                </div>
            </div>
        </div>

       <?php include("footer.html"); ?>

  </body>

</html>
