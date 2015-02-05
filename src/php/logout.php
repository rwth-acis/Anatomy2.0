<?php
  /**
   * Handles logout of user on server side.
   */

  // Delete session cookie and session
  // Taken from http://php.net/manual/de/function.session-destroy.php
  if (ini_get("session.use_cookies")) {
      $params = session_get_cookie_params();
      setcookie(session_name(), '', time() - 42000, $params["path"],
          $params["domain"], $params["secure"], $params["httponly"]
      );
  }
  
  // return JSON encoded result to client (always "ok" at the moment)
  $result = array ('result' => 'ok');
  echo json_encode($result);
?>