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
 * user is currently logged in, so it will only handle logging out)
 */

 /**
  * Add event listener for logout
  */
function initMenu() {
  login = document.getElementById('menu_login');
  
  login.addEventListener('click', onMenuLoginClicked, false);
}

/**
 * Event handler for logout button in menu
 * Ajax request to server will trigger logging out. Afterwards the 
 * page is reloaded (with content for user that is not signed in).
 */
function onMenuLoginClicked() {
  ajax.get("../php/logout.php", {}, function(msg) {
    window.location.reload(false);
  });
}

/// Call initialize for menu when DOM loaded
document.addEventListener('DOMContentLoaded', initMenu, false);