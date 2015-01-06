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

    <h1>Welcome to Collaborative 3D Model Viewing</h1>
    
    <p>This site introduces you into Collaborative 3D Model Viewing
    and shows you how to use it.</p>

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
    already in the database, you can also upload it yourself.</p>

    <p>The Collaborative 3D Model Viewing is provided in widgets for
    the <a href="http://www.role-project.eu/">Responsive Open Learning
    Environments (ROLE)</a>. Here you can create a workspace, setup a
    learning environment and invite other people to join you. ROLE
    allows you to combine the Collaborative 3D Model Viewing with many
    other widgets for collaborative learing.</p>

    <!-- TODO: h2 is written in white on white background? -->
    <h2>How to setup the viewing environment</h2>

    <p>Setting up the environment for collaborative viewing is really
    easy. If you do it for the first time, you can follow these steps: </p>

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


    <h2>How to upload models</h2>

    <?php include("footer.html"); ?>

  </body>

</html>
