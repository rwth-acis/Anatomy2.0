/**
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
  window.location.href = "login.php";
}

/// Call initialize for menu when DOM loaded
document.addEventListener('DOMContentLoaded', initMenu, false);