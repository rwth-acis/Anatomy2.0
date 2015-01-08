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
    
    
    
	<div class="container" style="margin-bottom: 50px;">
    <!-- TODO: h2 is written in white on white background? -->
    <h2>How to setup the viewing environment</h2>

    <p>Setting up the environment for collaborative viewing is really
    easy. If you do it for the first time, you can follow these steps: </p>

    <ol style="color: black;">
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
	</div>

    <?php include("footer.html"); ?>

  </body>

</html>
