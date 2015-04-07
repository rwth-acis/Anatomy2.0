<?php
  // If outside ROLE environment, menu.php will start a session.
  // So start session only if inside ROLE.
  if(isset($_GET["widget"]) && $_GET["widget"] == "true") {
    session_start();
  }
?>

<!-- Functionality of menu toolbar -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="../js/menuToolbar.js"></script>
<script src="../js/bootstrap.min.js"></script>

<!-- Toolbar -->
<nav class="navbar navbar-inverse" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">3-D Model Viewer</a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <!-- li role="presentation" class="dropdown navbar-li">
          <select id="viewModeSelect" onChange="x3dChangeView()" class="form-control navbar-select">
            <option>Walk</option>
            <option id="optionExamine">Examine</option>
            <option>Fly</option>
            <option>Helicopter</option>
            <option>LookAt</option>
            <option>Turntable</option>
            <option>Game</option>
          </select>
        </li -->
        <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" onclick="showAll()">Show all</button></li>
      <?php
        // If and only if inside ROLE environment, show the synchronize / unsynchronize button
        if(isset($_GET["widget"]) && $_GET["widget"] == "true") {
      ?>
          <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" onclick="x3dSynchronize()" id="btnSynchronize">Unsynchronize</button></li>
      <?php
          }
      ?>
        <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" id="btnCopy">Copy Link</button></li>
        <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" onclick="btnShowInfo()" id="btnInfo">Show info</button></li>
        <!-- Show lecturer mode button only if user logged in (as lecturer) and in ROLE environment -->
        <?php if (isset($_SESSION['user_id']) && (isset($_GET["widget"]) && $_GET["widget"] == "true")) { ?>
          <li class="navbar-li"><button type="submit" class="btn btn-default navbar-btn form-control" onclick="toggleLecturerMode()" id="btnLecturerMode">Enable Lecturer Mode</button></li>
        <?php } ?>

      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
