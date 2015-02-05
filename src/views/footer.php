<footer id="footer">
    <div class="container">
      <div class="clear"></div>
      <!--CLEAR FLOATS-->
    </div>
    <div class="footer2">
      <div class="container">
        <div class="row">
          <div class="col-md-6 panel">
            <div class="panel-body">
              <p class="simplenav">
              <?php
                //Decide if this site is inside a separate widget
                if(isset($_GET["widget"]) && $_GET["widget"] == "true")
                {
              ?>
                <a href="welcome.php?widget=true">Home</a> | 
                <a href="courses.php?widget=true">Courses</a> |
                <a href="overview.php?widget=true">Models</a> |
                <a href="upload.php?widget=true">Upload</a> |
                <a href="help.php?widget=true">Help</a>
              <?php } else { ?>
                <a href="welcome.php">Home</a> | 
                <a href="courses.php">Courses</a> |
                <a href="overview.php">Models</a> |
                <a href="role.php">Role</a> |
                <a href="upload.php">Upload</a> |
                <a href="help.php">Help</a>
              <?php } ?>
              </p>
            </div>
          </div>

          <div class="col-md-6 panel">
            <div class="panel-body">
              <p class="text-right">
                HENM LAB 2014/15: 3D Models
              </p>
              <p class="text-right">Reach us at: <a href="mailto:henm1415g2@dbis.rwth-aachen.de">henm1415g2@dbis.rwth-aachen.de</a></p>
            </div>
          </div>

        </div>
        <!-- /row of panels -->
      </div>
    </div>
  </footer>