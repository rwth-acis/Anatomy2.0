<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='X-UA-Compatible' content='IE=edge' charset='utf8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Collaborative 3D Model Viewer</title>

    <!-- X3Dom includes -->
    <script type='text/javascript' src='http://www.x3dom.org/download/x3dom.js'> </script>
    <script type='text/javascript' src='../js/viewer.js'> </script>
    <link type='text/css' rel='stylesheet' href='http://www.x3dom.org/download/x3dom.css'> </link> 
    <link rel='stylesheet' type='text/css' href='../css/model_viewer.css'></link>

    <!-- Additional styles -->
    <link rel='stylesheet' type='text/css' href='../css/bootstrap.min.css'>
    <link rel='stylesheet' type='text/css' href='../css/style.css'>

    <!-- Init communication with wrapper -->
    <script type='text/javascript' src='../js/init-subsite.js'> </script>
    
    <script>
      var init = function (evt) {
        document.getElementById('viewer_object').runtime.showAll();
      };
    </script>
  </head>

  <body>
    

    <!-- Toolbar -->
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">3D Models</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li role="presentation" class="dropdown navbar-li">
              <select id="viewModeSelect" onChange="x3dChangeView()" class="form-control navbar-select">
                <option>Walk</option>
                <option id="optionExamine">Examine</option>
                <option>Fly</option>
                <option>Helicopter</option>
                <option>LookAt</option>
                <option>Turntable</option>
                <option>Game</option>
              </select> 
            </li>
            <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn" onclick="reset()">Reset view</button></li>          
            <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn" onclick="showAll()">Show all</button></li>
            <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn" onclick="upright()">Upright</button></li>
            <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn" onclick="x3dSynchronize()" id="btnSynchronize">Synchronize</button></li>
            <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn">Lecturer Mode</button></li>
            <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn">Copy Link</button></li>
            <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn">Screenshot</button></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  <div >  
    <div class="row" style="position:relative; left:60px">
      <p id='debugText'></p>
      <x3d id='viewer_object' showStat="true">
        <scene>
          <navigationInfo headlight="true" type="examine" id="navType"></navigationInfo>
          <background skyColor='1.0 1.0 1.0'> </background>
      <?php
        include '../php/db_connect.php';
        $arg    = $_GET["id"];
        $query  = "SELECT data_url FROM models WHERE id = $arg";
        $result = mysql_query($query);
        $entry  = mysql_fetch_object($result);
        echo "<inline url=\"../../$entry->data_url\" onload=\"init()\"> </inline>";
      ?>

          <viewpoint id="viewport" DEF="viewport" centerOfRotation="0 0 0" position="0.00 0.00 5.00" orientation="-0.92 0.35 0.17 0.00" fieldOfView="0.858"> </viewpoint>
        </scene>
      </x3d>
      <?php
        $arg    = $_GET["id"];
        $query  = "SELECT * FROM models WHERE id = $arg";
        $result = mysql_query($query);
        $entry  = mysql_fetch_object($result);
        echo "<div id='metadata_overlay'>
          <div class='x3dom-states-head'> </div>
          <div class='x3dom-states-item-title'>Name:</div>
          <div class='x3dom-states-item-value'>$entry->name</div> <br>
          <div class='x3dom-states-item-title'>Classification:</div>
          <div class='x3dom-states-item-value'>$entry->classification</div> <br>
          <div class='x3dom-states-item-title'>Description:</div>
          <div class='x3dom-states-item-value'>$entry->description</div> <br>
          <div class='x3dom-states-item-title'>Upload Date:</div>
          <div class='x3dom-states-item-value'>$entry->upload_date</div> <br>
          <div class='x3dom-states-item-title'><a href=\"../../$entry->data_url\">Download</a></div>
          </div>";
      ?>
    </div>
  </div>  
    
    <!-- Functionality of menu toolbar -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="../js/menuToolbar.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    </div>
  </body>
</html>
