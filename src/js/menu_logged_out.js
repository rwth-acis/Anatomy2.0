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
 *
 * @file menu_logged_in.js
 * Functionality for menu buttons (this file is only loaded when 
 * user is currently signed out)
 */

/**
 * Add event listener for login
 */
function initMenu() {
  login = document.getElementById('menu_login');
  
  login.addEventListener('click', onMenuLoginClicked, false);
}

/**
 * Event handler for "login" menu button.
 * Navigates to login.php where user can perform the actual login.
 */
function onMenuLoginClicked() {
  login = document.getElementById('menu_login');
  var append = "";
  if (getURLParameter("widget") == "true") {
    append = "?widget=true";
  }
  window.location.href = "login.php" + append;
}

/// Call initialize for menu when DOM loaded
document.addEventListener('DOMContentLoaded', initMenu, false);