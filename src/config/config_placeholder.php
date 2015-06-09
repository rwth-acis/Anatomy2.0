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
  
  // OpenIDConnect client ID
  // A new OpenIDConnect client can be created using the instructions on https://github.com/learning-layers/openid-connect-button
  // The concrete registration of a OpenIdConnect client can be done e.g. on https://api.learning-layers.eu/o/oauth2/
  // example: "bced4d7b-9e63-4984-af35-c568e68b208e"
  $oidcClientId = "";
  
  // Las2Peer-Service-url
  // Make sure NOT to end with a "/".
  // example: "localhost:8080/3dnrt"
  $las2peerUrl = "";
?>