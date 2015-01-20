
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
  
  <div class='container'>
    <header>
      <div class='row'>
        <div class='col-md-12'> 
          <ul id='menu'>
            <li><a href='welcome.php'><h1><strong>HENM</strong></h1></a></li>
            <li><a href='overview.php' style='padding-left:20px'>Models</a></li>
            <li><a href='role.php' style='padding-left:20px'>Role</a></li>
            <li><a href='upload.php' style='padding-left:20px'>Upload</a></li>
            <!-- Button will show "login" or "logout" based on current login status of user.
              If user_id is set, the user is currently logged in -->
            <li>
              <a href='#' style='padding-left:20px' id='menu_login'>
  <?php
    if (isset($_SESSION['user_id'])) { echo ("Logout"); } else { echo("Login"); }
  ?>
              </a>
            </li>
          </ul>
        </div>
      </div>    
      <div class='row'>
        <div class='col-md-12' style='position:relative; right:20px'>   
          <ul id='color'>
            <li class='color color-red'></li>
            <li class='color color-yellow'></li>
            <li class='color color-blue'></li>
          </ul>
        </div>  
      </div>
    </header>
  </div>
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
