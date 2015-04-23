<?php
  // URL to the root directory of the Anatomy 2.0 web service.
  // Make sure NOT to end with a "/".
	$baseUrl = "";
  
  // Set up an array which contains the mail address, prename and lastname of each admin
  // The admins will be informed by mail, if someone registers an account. They can then decide whether the account will be confirmed.
  // You can add more admins by copying the "$admin2 = array("", "", "");" and using a higher index. The variable has to be added to the "admins" array then as well.
  $admin1 = array("", "", "");
  $admin2 = array("", "", "");
  $admins = array($admin1, $admin2);
?>