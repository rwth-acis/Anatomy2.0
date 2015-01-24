<!--
  Just a frontend mockup for testing login
 -->
<?php
  session_start();
?>

<!DOCTYPE html>
<html>
<head>
  <title>Collaborative 3D Model Viewer</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
  <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
	<script src="../js/ajax.js" type="text/javascript"></script>
	<script src="../js/login.js" type="text/javascript"></script>
  <style>
  #login_email {
    border:1px solid grey;
    width:400px;
    border-radius:1px;
    padding:0px;
    margin-left:10px;
  }
  </style>
</head>
<body>
  <?php
    include("menu.php");
  ?> 
  <!-- This is a code example for HTML code dependent on login state. If user id is set, the user is logged in -->
  <?php if (isset($_SESSION['user_id'])) { ?>
  <div id="login_status">You are logged in as <?php echo($_SESSION['user_email']) ?>.</div>
  <?php } else { ?>
  <div id="login">
    Login: 
    <br>
    <form id="form_login">
      <input type="text" id="login_email"/>
      <input type="password" id="login_password"/>
      <a href="#" id="form_login_submit" onClick="onClickLogin()">Login</a> <img src="../images/ajax-loader.gif" style="display:none" id="login_loader">
    </form>
  </div>
  <div id="login_status"></div>
  <?php } ?>
</body>
</html>