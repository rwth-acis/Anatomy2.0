### 21.5.2015
cloned `github.com/rwth-acis/LAS2peer-Template-Project`
added to git and commited
imported with IntelliJ
Marked `test/` as "Test sources"
Added `lib/` as Project-library 
One time ant-task `all`, then `compile-main` (skips junit-compile/test, user-agent-generation, javadoc-generation)
`
  --> Exception in executed method!
      InvocationTargetException (i5/las2peer/services/servicePackage/ServiceClass : Unsupported major.minor version 52.0)
      `
Wrong javaversion! Using `extended_bash`

### 26.5.2015
Configuration on eiche:
`config.php`: add `$las2peerUrl = "http://eiche.informatik.rwth-aachen.de/3dnrt:8080";`
via ssh: 
```bash
export PATH="$PATH:/opt/java-8/bin"
cd ~/web/Anatomy2.0/applications/LAS2peer-Template-Project
./bin/start_network.sh
```
Getting public IP with `ifconfig`.

`Error: Could not find or load main class i5.las2peer.tools.L2pNodeLauncher`: copied folders `lib` and `service`, generated from ant, to server. Ant is not installed, should be done with Jenkins.

`i5.las2peer.p2p.NodeException: Unable to open Netwock socket - is the port already in use?`
Checking with `netst -tlunp`: Port 8080 was in use. `ps aux | grep java` revealed that two las2peer-services are already running. So changed port from 8080 to 8081 in `{las2peer}/etc/properties` and `/src/config/config.php` and from 9011 to 9012 in `{las2peer}/bin/start_network.sh`.
Now it says `OpenID Connect Provider https://api.learning-layers.eu/o/oauth2 unreachable!`.
Want to try ant build. Have to ask for someone who knows how to do it.

For colouring see `LAS2peer/src/main/java/i5/las2peer/tools/ColoredOutput.java`

### 27.5.2015
Checked whether it could be related to the strong encryption problem but no, when the policy-files are missing, the error says `i5.las2peer.persistency.EncodingFailedException: crypto problems...`.

I asked Petru he said the oidc-provider can not be reached from the eiche nor from the buche-server. The service has to be deployed in the cloud, tomorrow I will get credentials.

So for now I try to open a port on my laptop. Test for connectivity:
```php
<?php
	var_dump(extension_loaded('curl'));
    $url = "http://134.61.36.234:8081/3dnrt";
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$res_exec = curl_exec($curl);

    if($res_exec == FALSE) {
        echo curl_error($curl);
    } else {
        echo curl_getinfo($curl, CURLINFO_HTTP_CODE).'.' '.$res_exec;
    }
    curl_close($curl);
```
Saved in `portTest.php`. `curl` is not installed, so sent request for installation to Reinhardt, with url http://askubuntu.com/questions/9293/how-do-i-install-curl-in-php5.

## 28.5.2015
Worked!

The login now works this way:
- Login via OIDC-button, other ways do not matter
- Redirect to registered page with url param `#access_token=23dssg-seg...` (no new request to the server)
- `ajax.post("../php/checkUserKnown.php", {access_token:token}, ...)` in the oidc-javascript-callback-function (`welcome.js`)
- In `checkUserKnown.php` on serverside:
    ```php
    // use las2peer-service for oidc-provider-communication and user-retrieval
	httpRequest("GET", $las2peerUrl.'/'.'user'.'?access_token='.$access_token);
	``` 
    ```php
    // cache access_token in session      
    session_start();
    $_SESSION['access_token'] = $access_token;
    ```
    Create user in database if not exists.

Then, every a restricted service is requested, check `access_token` with:
- Call `checkUserKnown.php` (using `$_SESSION['access_token]` instead of url-parameter)
- Check for HTTP-status-code `200`
- Optionally query database `openIdConnectSub` and check for `confirmed`

Meeting with Yogi. Eiche-cloud (oidc-provider) connection does not work (bug), complete server on cloud neither. We decided to provide a fake login and replace it with the las2peer-based login later on.

The login workflow will then work like this:

context|fake|later
---|---|---
oidc-callback, `ajax.post("../php/checkUserKnown.php,"` (`welcome.js` → `signin_callbacks.js`)|`access_token`,`sub`,`email`, `given_name`,`family_name`|`access_token`
setup session (`checkUserKnown.php`)|`access_token`,`sub`|`access_token`
get userprofile (`checkUserKnown.php`)|-|las2peer-request
create user databaseentry if not exists (`checkUserKnown.php`)|`sub`,`email`, `given_name`,`family_name`|`sub`,`email`, `given_name`,`family_name`

Register workflow:

context|fake|later
---|---|---
javascript-button (`login.php`), `ajax.post("../php/register.php",...)`|`$_SESSION['email']`|`$_SESSION['acess_token']`, las2peer-request
send email (`register.php`→`register_as_tutor.php`)|-|-

Login/Tutor-restricted services:
- upload model
- add course
- edit course (+ only creator)

They all `include 'login.php';`. `login.php` sets variable `$isTutor` and renders a message and button if `$isTutor` is set to `FALSE`.
"edit course" additionally `require 'tools.php'` with `function getCourseCreator($courseId)` and renders an individual message if `$isTutor` is `TRUE` and the user is not the creator.
Flow:

context|fake|later
---|---|---
cookie set?, (`login.php`)|`$_SESSION['access_token']`|`$_SESSION['access_token']`
values valid?, `(login.php)`|- (use `$_SESSION[...]`)|`$_SESSION['acess_token']`, las2peer-request
setting `$isTutor` (`login.php`)|databasequery `$_SESSION['sub']`|databasequery `$user->sub`
(edit course) check whether user created course (`getCourseCreator()`, `tools.php`)|databasequery `$_SESSION['sub']`|databasequery `$user->sub`

Today's debugging consisted mainly of not seeing the error of a not running database.

## 2.6.2015

`addcourse`/`editcourse` flow:

context|fake|later
---|---|---
User authorization (`login.php`)|see table above|see table above
`<form action= "../php/upload_script_course.php..."`|

## 9.6.2015

Forgotten element "lecturer mode":

Button "enable lecturermode", `toolbar.php`
**fake**
```php 
ob_start();
include '../views/login.php';
ob_end_clean(); 
if ($isTutor && (isset($_GET["widget"]) && $_GET["widget"] == "true"))
	// insert button
```
**later**
```php 
if (isTutor() && (isset($_GET["widget"]) && $_GET["widget"] == "true"))
	// insert button
```

