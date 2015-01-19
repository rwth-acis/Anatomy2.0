<!--
  Just a frontend mockup for testing login
 -->
 
<!DOCTYPE html>
<html>
<head>
  <title>Collaborative 3D Model Viewer</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf8"/>
  <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
	<script src="../js/ajax.js" type="text/javascript"></script>
	<script src="../js/login.js" type="text/javascript"></script>
</head>
<body>
<div id="login">
	Login: 
	<br>
	<form id="form_login">
		<input type="text" id="login_email"/>
		<input type="password" id="login_password"/>
		<a href="#" id="form_login_submit" onClick="onClickLogin()">Submit</a> <img src="../images/ajax-loader.gif" style="display:none" id="login_loader">
		<div id="login_status"></div>
	</form>
</div>
</body>
</html>