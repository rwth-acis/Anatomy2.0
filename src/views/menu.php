<?php
// Hide the menu in ROLE environment
if(!(isset($_GET["widget"]) && $_GET["widget"] == "true"))
{
?>
  <link rel='stylesheet' type='text/css' href='../css/style.css'>
  <!-- Ajax helper script for menu_logged_in.js / menu_logged_out.js -->
  <script src="../js/ajax.js" type="text/javascript"></script>
  <!-- Functionality for login button (depends whether user is logged in or not) -->
  <?php if (isset($_SESSION['user_id'])) { ?>
    <script src="../js/menu_logged_in.js" type="text/javascript"></script>
  <?php } else { ?>
    <script src="../js/menu_logged_out.js" type="text/javascript"></script>
  <?php } ?>
  
  <div class='navbar navbar-inverse'>
    <div class='container'>
      <div class='navbar-header'>
        <!-- Button for smallest screens -->
        <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'><span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span></button>
        <a class='navbar-brand' href='welcome.php'>
          <img src='../images/logo.png' alt='HENM: 3D Models'>
        </a>
      </div>
      <div class='navbar-collapse collapse'>
        <ul class='nav navbar-nav pull-right mainNav'>
          <li><a href='welcome.php'>Home</a></li>
          <li><a href='courses.php'>Courses</a></li>
          <li><a href='overview.php'>Models</a></li>
          <li><a href='role.php'>ROLE</a></li>
          <li><a href='upload.php'>Upload</a></li>
          <li><a href='help.html'>Help</a></li>
	  <!-- Button will show "login" or "logout" based on current login status of user.
           If user_id is set, the user is currently logged in -->
          <li>
	    <a href='#' style='padding-left:20px' id='menu_login'>
	    <?php if (isset($_SESSION['user_id'])) { echo ("Logout"); } else { echo("Login"); } ?>
            </a>
	  </li>
        </ul>

      </div>
      <!--/.nav-collapse -->
    </div>
  </div> 
  </br></br>"

<?php
  }
?>
    
  <!-- Search durrently not implemented -->
  <!--
  <div id="wrap">
    <form action="" autocomplete="on">
      <input id="search" name="search" type="text" placeholder="Which model ?">
      <input id="search_submit" value="search" type="submit">
    </form>
  </div>
  -->
