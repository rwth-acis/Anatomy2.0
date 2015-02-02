<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collaborative Viewing of 3D Models </title>
    <link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/font-awesome.min.css">

    <!-- Custom styles-->
    
    <link rel="stylesheet" href="../css/bootstrap-theme.css" media="screen">
    <link rel="stylesheet" type="text/css" href="../css/da-slider.css" />
    <link rel="stylesheet" href="../css/style.css">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="../js/html5shiv.js"></script>
    <script src="../js/respond.min.js"></script>
    <![endif]-->

</head>

<body>
    <?php include("menu.php"); ?> 
    
    <header id="head" class="secondary">
        <div class="container">
            <div class="row">
                <div class="col-sm-8">
                    <h1>Help</h1>
                </div>
            </div>
        </div>
    </header>

    <!-- container -->
    <section class="container">
        <div class="row">
            <!-- main content -->
            <section class="col-sm-8 maincontent">
                <h3>What is Collaborative Model Viewing?</h3>
                <p>
                    <img src="../images/collaborative-logo.png" alt="" class="img-rounded pull-right" width="300">
                    Collaborative 3D Model Viewing allows investigating and learning from a 3D model in a group. You can open a model on different devices and if one person moves the model on his device, the view on all other devices is synchronized. Therefore, you can easily show, explain or discuss parts of the model, no matter if you are explaining something as a teacher, learning in a group over the internet or discussing about an object you don't have physical access to. The project mainly focuses on models from 3D scanned real objects that often are too valuable or not available for investigation by hands. If you want to view a model that is not already in the database, you can also upload it yourself.
                </p>

                <h3>Set Up Viewing Environment</h3>
                <p>
                    <img src="../images/role-full.jpg" alt="" class="img-rounded pull-right" width="300">
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

                </ul>

                <h3>3D Models</h3>
                <p>
                    <img src="../images/upload.png" alt="" class="img-rounded pull-right" width="300">
                    There is a database which already
                            contains a list of models with some
                            description and information. Most of these
                            models are scanned from real object using
                            the <a href="http://en.wikipedia.org/wiki/Structured-light_3D_scanner">structured
                            light scanning method</a>. You can look
                            through the database and investigate the
                            models on this site by clicking the button
                            below. If you want to view models in
                            collaboration, you can find more
                            information in the ROLE section.
                </p>

                <h3>Upload Your Own Model</h3>
                <p>
                    
                    It is also possible to upload your 3D
                              model to the database, so you can view
                              it in collaboration with others. You can
                              add additional information and select a
                              thumbnail afterwards. Models from 3D
                              scans are usually very large. To use
                              them on mobile devices and with a slow
                              internet connection, please down-sample
                              the model (e.g. with the free
                              tool <a href="http://meshlab.sourceforge.net/">
                              MeshLab</a>).
                </p>
            </section>
            <!-- /main -->

            <!-- Sidebar -->
            <aside class="col-sm-4 sidebar sidebar-right">

                <div class="panel">
                    <h4>Important Links</h4>
                    <ul class="list-unstyled list-spaces">
                      <?php
                        //Decide if this site is inside a separate widget
                        if(isset($_GET["widget"]) && $_GET["widget"] == "true")
                        {
                      ?>
                        <li><a href="courses.php?widget=true">Courses</a><br>
                            <span class="small text-muted">A list of all the courses available</span></li>
                        <li><a href="overview.php?widget=true">Models</a><br>
                            <span class="small text-muted">An extensive list of all the models present in our database</span></li>
                        <li><a href="upload.php?widget=true">Upload</a><br>
                            <span class="small text-muted">Upload models to our vast database and collaboratively view them.</span></li>
                        <li><a href="login.php?widget=true">Login</a><br>
                            <span class="small text-muted">Want to create a course room ? Simply login in and get started.</span></li>
                      <?php } else { ?>
                        <li><a href="courses.php">Courses</a><br>
                            <span class="small text-muted">A list of all the courses available</span></li>
                        <li><a href="overview.php">Models</a><br>
                            <span class="small text-muted">An extensive list of all the models present in our database</span></li>
                        <li><a href="role.php">Role</a><br>
                            <span class="small text-muted">Head to the Role learning environment and setup your own space.</span></li>
                        <li><a href="upload.php">Upload</a><br>
                            <span class="small text-muted">Upload models to our vast database and collaboratively view them.</span></li>
                        <li><a href="login.php">Login</a><br>
                            <span class="small text-muted">Want to create a course room ? Simply login in and get started.</span></li>
                      <?php } ?>
                    </ul>
                </div>

            </aside>
            <!-- /Sidebar -->

        </div>
    </section>
    <!-- /container -->
    <?php include("footer.php"); ?>

    

    <!-- JavaScript libs are placed at the end of the document so the pages load faster -->


    <script src="../js/modernizr-latest.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
    <script src="../js/custom.js"></script>

</body>
</html>
