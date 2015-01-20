/**
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