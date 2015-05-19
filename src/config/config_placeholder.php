<?php
  /**
   * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Contact
   * 
   * RWTH Aachen University
   * Lehrstuhl für Informatik 5 (Informationssysteme und Datenbanken)
   * Ahornstraße 55
   * 52074Aachen
   * Telefon:     +49 241 80 21513
   * Fax :     +49 241 80 22321
   */

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
  $oidcClientId = "";
?>