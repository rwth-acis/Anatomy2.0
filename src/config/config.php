<?php
  // URL to the root directory of the Anatomy 2.0 web service
	$baseUrl = "http://eiche.informatik.rwth-aachen.de/3dnrt/Anatomy2.0-test";
  
  // Set up an array which contains the mail address, prename and lastname of each admin
  // The admins will be informed by mail, if someone registers an account. They can then decide whether the account will be confirmed.
  // You can add more admins by copying the "$admin2 = array("", "", "");" and using a higher index. The variable has to be added to the "admins" array then as well.
  $admin1 = array("dominik.studer@rwth-aachen.de", "Dominik", "Studer");
  $admin2 = array("dominik.studer@t-online.de", "Dominik", "Studer");
  $admin3 = array("dominik.studer@dbis.rwth-aachen.de", "Dominik", "Studer");
  $admins = array($admin1, $admin2, $admin3);
?>