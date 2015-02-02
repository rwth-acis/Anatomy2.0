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
  <script src="assets/js/html5shiv.js"></script>
  <script src="assets/js/respond.min.js"></script>
  <![endif]-->

</head>

<body>
    <?php include("menu.php"); ?>

    <?php
       //get data from db
       include '../php/db_connect.php';
       include '../php/tools.php';
       
       $arg    = $_GET["id"];
       $query  = $db->query("SELECT * FROM courses WHERE id = $arg");
       $entry = $query->fetchObject();
    ?>
  <header id='head' class='secondary'>
    <div class='container'>
      <div class='row'>
          <h1><?php echo "$entry->name";?></h1>
      </div>
    </div>

  </header>
  <div id='courses'>
    <section class='container'>
      <br><br>
    <div class='container'>
      <div class='row'>
        <div class='col-md-4'>
          <h3><?php echo "$entry->name"; ?></h3>
          
          <div class='featured-box'>
            <img src=<?php echo "$entry->img_url"?> ><br><br>
            <div>
                <a href=editcourse.php?id=<?php echo "$arg"?>>
                <button class='btn btn-primary btn-lg btn-block' type='button'>Edit</button>
                </a>
                <?php if(!(isset($_GET["widget"]) && $_GET["widget"] == "true")) { ?>
                  <a href=<?php echo "$entry->role_url"; ?>>
                  <button class='btn btn-primary btn-lg btn-block' type='button'>Role Link OTTO</button>
                  </a>
                <?php } ?>
              </div> </br>

            <div>
              <p>
              <?php echo "$entry->description"; ?>
              </p>
            </div>
          </div>
          
        </div>	
        <div class='col-md-8'>
          <div><h3>Models</h3></div>
          <button class='btn btn-success' type='button'>Add</button>
          <button class='btn btn-success' type='button'>Upload</button>
        
          <br><br>
      
  <?php
  //create model overview in course
  $query = $db->query("SELECT * FROM course_models
        INNER JOIN models ON course_models.model_id = models.id
        WHERE course_models.course_id = $arg");
  $result = $query->fetchAll();

  $html = createTable($result,'model');
  
  echo $html;
  ?>
         
        </div>
      </div>
    </div>	
    </section>
  </div>
  <!-- container -->
  
  <?php include("footer.html"); ?>


  <!-- JavaScript libs are placed at the end of the document so the pages load faster -->


  <script src="../js/modernizr-latest.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
  <script src="../js/jquery.cslider.js"></script>
  <script src="../js/custom.js"></script>
  <!-- Init communication with wrapper -->
  <script type='text/javascript' src='../js/init-subsite.js'> </script>

  <script type='text/javascript' src='../js/x3d-extensions.js'> </script>
  <script type='text/javascript' src='../js/viewer.js'> </script>

  <!-- General functionality (used in menuToolbar.js) -->
  <script type="text/javascript" src="../js/tools.js"></script>
  <!-- The library for the copy to clipboard feature in the toolbar -->
  <script type="text/javascript" src="../js/ZeroClipboard.js"></script>


</body>
</html>
