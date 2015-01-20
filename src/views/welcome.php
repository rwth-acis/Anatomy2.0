<?php
  session_start();
?>

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
    <?php include("menu.php"); ?>
    
    <div style="text-align: center;" class="jumbotron">
	  <h1 style="color: black;">Collaborative 3D Model Viewing</h1>
	  <p>This site introduces you into Collaborative 3D Model Viewing
	    and shows you how to use it</p>
	  <p><a class="btn btn-primary btn-lg" href="overview.php" role="button">View Models</a></p>
	</div>
    
    <div class="container" style="margin-top: 50px;">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-check"></i>What is
                        Collaborative Model Viewing?</h4>
                    </div>
                    <div class="panel-body">
	              <img src="../images/collaborative-logo.png" alt="..." class='img-responsive img-welcome'>
	              <hr>
                      <p>Collaborative 3D Model Viewing allows
			investigating and learning from a 3D model in
			a group. You can open a model on different
			devices and if one person moves the model on
			his device, the view on all other devices is
			synchronized. Therefore, you can easily show,
			explain or discuss parts of the model, no
			matter if you are explaining something as a
			teacher, learning in a group over the internet
			or discussing about an object you don't have
			physical access to. The project mainly focuses
			on models from 3D scanned real objects that
			often are too valuable or not available for
			investigation by hands. If you want to view a
			model that is not already in the database, you
			can also upload it yourself.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-check"></i>3D Models</h4>
                    </div>
                    <div class="panel-body">
	                    <img src="../images/skull.png" alt="..."  class='img-responsive img-welcome'>
	                    <hr>
                            <p>There is a database which already
                            contains a list of models with some
                            description and information. Most of these
                            models are scanned from real object using
                            the <a href="http://en.wikipedia.org/wiki/Structured-light_3D_scanner">structured
                            light scanning method</a>. You can look
                            through the database and investigate the
                            models on this site by clicking the button
                            below. If you want to view models in
                            collaboration, you can find more
                            information in the ROLE section.</p>
                        <a href="overview.php" class="btn btn-default">View Models</a>
                    </div>
                </div>
            </div>
    </div>
    <div class="container" style="margin-top: 50px;">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-gift"></i>Set Up Viewing Environment</h4>
                    </div>
                    <div class="panel-body">
	                    <img src="../images/role-full.jpg" alt="..."  class='img-responsive img-welcome'>
	                    <hr>
                            <p>The Collaborative 3D Model Viewing is
			      provided in widgets for
			      the <a href="http://www.role-project.eu/">Responsive
			      Open Learning Environments
			      (ROLE)</a>. Here you can create a
			      workspace, setup a learning environment
			      and invite other people to join
			      you. ROLE allows you to combine the
			      Collaborative 3D Model Viewing with many
			      other widgets for collaborative
			      learning. </p>

			    <p>Setting up the environment for
			    collaborative viewing is really easy. If
			    you do it for the first time, you can
			    follow these steps:</p>
			    
			    <ol>
			      <li>Create a ROLE space <a href="http://role-sandbox.eu/">here</a></li>
			      <li>Log in (e.g. with your Google account)</li>
			      <li>Add the following widgets in the sidebar on the left</li>
			      <ul>
				<li>http://eiche.informatik.rwth-aachen.de/henm1415g2/src/role/overview.xml</li>
				<li>http://eiche.informatik.rwth-aachen.de/henm1415g2/src/role/model_viewer.xml</li>
			      </ul>
			      <li>Invite others by providing the link to the space (e.g. http://role-sandbox.eu/spaces/spacename)</li>
			      <li>Select a model in the overview</li>
			    </ol>
    					
                        <a href="http://role-sandbox.eu/" class="btn btn-default">To ROLE Space</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-compass"></i>Upload Your Own Model</h4>
                    </div>
                    <div class="panel-body">
	                    <img src="../images/upload.png" alt="..."  class='img-responsive img-welcome'>
	                    <hr>
                            <p>It is also possible to upload your 3D
                              model to the database, so you can view
                              it in collaboration with others. You can
                              add additional information and select a
                              thumbnail afterwards. Models from 3D
                              scans are usually very large. To use
                              them on mobile devices and with a slow
                              internet connection, please down-sample
                              the model (e.g. with the free
                              tool <a href="http://meshlab.sourceforge.net/">
                              MeshLab</a>).</p>
                        <a href="upload.php" class="btn btn-default">Upload Page</a>
                    </div>
                </div>
            </div>
        </div>

       <?php include("footer.html"); ?>

  </body>

</html>
