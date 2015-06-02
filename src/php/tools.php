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
 *
 * @file tools.php
 * File for some PHP helper functions that are generally useful
 */

/**
 * Creates the html table structure from the given result from the database
 * Used in courses.php, course.php, overview.php and getmodels.php
 * @param  resource $result Identifier for the result set from the database
 * @return string/html         HTML table containing the models which should be displayed
 */
function createTable($result, $type) {
    $html = '<ul class="img-list">';
    
    foreach ($result as $entry) {
        if(substr($type,0,1) == "m") {
            $html .= getModelStructure($entry,$type);
        } else if(substr($type,0,1) == "s") {
          $html .= getSubjectStructure($entry);
        } else {
            $html .= getCourseStructure($entry);
        }
    }

    $html .= '</ul>';
    return $html;
}

/**
 * Creates the html structure of one model entry with the given data
 * @param  object $entry Model data from database
 * @param  string $type     Modify the entry according to the purpose (normal, selection, deletion)
 * @return string/html        HTML containing the model information
 */
function getModelStructure($entry, $type) {

    $formatBytes = function ($bytes, $precision = 2) { 
				$units = array('B', 'KB', 'MB', 'GB', 'TB'); 
        
				$bytes = max($bytes, 0); 
				$pow = floor(($bytes ? log($bytes) : 0) / log(1024)); 
        $pow = min($pow, count($units) - 1); 
				$bytes /= pow(1024, $pow);
    
				return round($bytes, $precision) . ' ' . $units[$pow]; 
	 };

    $html = "";
    switch ($type) {
        case 'modelselection':
            $html .= "<li><img id='image-over$entry[id]' src='../../$entry[preview_url]' alt=$entry[name] name='image-over' width='160' height='160' style='margin-top:5px;' />
              <span class='text-content'><span>Name: $entry[name]<br>Size: ".$formatBytes($entry["size"])."<br> Category: $entry[classification]</span></span>
              <p id='text-over' style='margin-left:5px;'>$entry[name]</p>
              </li>";
            break;

        case 'modeldeletion':
            $html .= "<li><img id='image-over$entry[id]' name='image-over' src='../../$entry[preview_url]' alt=$entry[name] width='160' height='160' />
              <span class='text-content'><span>Name: $entry[name]<br>Size: ".$formatBytes($entry["size"])."<br> Category: $entry[classification]</span></span>
              <p id='text-over'>$entry[name]</p>
	            <div class='delete' id='$entry[id]'></div>
              </li>";
            break;

        // model, "normal" list
        default:
            $html .= "<li><a href='model_viewer.php?id=$entry[id]' id='a_img$entry[id]'><img id='image-over$entry[id]' name='image-over' src='../../$entry[preview_url]' alt=$entry[name] width='160' height='160' />
              <span class='text-content'><span>Name: $entry[name]<br>Size: ".$formatBytes($entry["size"])."<br> Category: $entry[classification]</span></span></a>
              <p id='text-over'>$entry[name]</p>
              </li>";
            break;

    }

    return $html;
}

/**
 * Creates the html structure of one course entry with the given data
 * @param  object $entry Course data from database
 * @return string/html        HTML containing the course information
 */
function getCourseStructure($entry) {
    $html = "";
    // Decide if we are in ROLE space
    if(isset($_GET['widget']) && $_GET['widget'] == 'true') {$html = "&widget=true";}

    // id used to derive course id (from database) connected to clicked link
    return "<li><a href='course.php?id=$entry[id]".$html."' id='a_img$entry[id]'>
            <img src=$entry[img_url] alt=$entry[name] class='img-responsive img-fit'>
            <p style='font-weight: bold;'>$entry[name]</p>
            </a></li>";
}

/**
 * Creates the html structure of one subject entry with the given data
 * @param  object $entry Subject data from database
 * @return string/html        HTML containing the course information
 */
function getSubjectStructure($entry) {
    $html = "";
    // Decide if we are in ROLE space
    if(isset($_GET['widget']) && $_GET['widget'] == 'true') {$html = "&widget=true";}

    // id used to derive course id (from database) connected to clicked link
    return "<li><a href='course_list.php?id=$entry[id]".$html."' id='a_img$entry[id]'>
            <img src=$entry[img_url] alt=$entry[name] class='img-responsive img-fit'>
            <p style='font-weight: bold;'>$entry[name]</p>
            </a></li>";
}

// Method: POST, PUT, GET etc
// Data: array("param" => "value") ==> index.php?param=value
// copy-pasted from
// http://stackoverflow.com/questions/9802788/call-a-rest-api-in-php/9802854#9802854
function httpRequest($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
    // curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    // curl_setopt($curl, CURLOPT_USERPWD, "username:password");

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $res_exec = curl_exec($curl);
    // To avoid warnings:
    if (!isset($result)) 
       $result = new stdClass();
       
    if($res_exec == FALSE) {
    	$result->bOk = FALSE;
    	$result->sMsg = curl_error($curl);
    } else {
    	$result->bOk = TRUE;
    	$result->sMsg = $res_exec;
    	$result->iStatus = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    }

    curl_close($curl);

    return $result;
}


/**
 * Requests a user-profile from the las2peer-login-service.
 * @param  string The token that is send to the OIDC-provider
 * @return struct {'bOk':boolean, 'sMsg':string}, sMsg is userprofile in JSON on success and errormessage on fail
 */
function getUserProfile($access_token) {
	$result = new stdClass();
	$result->success = false;
	$result->message = '';
	
	$oidc_request = httpRequest("GET", $las2peerUrl.'/'.'user'.'?access_token='.$access_token);
	
	if($oidc_request->bOk == FALSE or $oidc_request->iStatus !== 200) {
		$result->bOk = false;
		$result->sMsg = $oidc_request->sMsg;
	} else {
		error_log('3dnrt/user call unsuccessfull: '.$oidc_request->sMsg);
		$result->bOk = true;
		$result->message = $oidc_request->sMsg;
	}
		
	return $result;
}

/**
 * @return [bErr:bool, bIsConfirmed:bool, sMsg:string]
 */
function checkUserConfirmed($sub) {

	$result = new stdClass();

	try {
	   require '../php/db_connect.php';
	} catch (Exception $e) {
		$result->bErr = true;
		$result->bIsConfirmed = false;
		$result->sMsg = $e->getMessage();
		
		return $result;
	}

   $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
   
   $sqlSelect = "SELECT confirmed FROM users WHERE openIdConnectSub='".$sub."'";
   $sth = $db->prepare($sqlSelect);
   $sth->execute();
   $user = $sth->fetch();
   
   // If $user is empty, the user is not known
   if(!$user) {
   	$result->bErr = false;
   	$result->bIsConfirmed = false;
   	$result->sMsg = "User has no databaseentry.";
   } else {
   	$result->bErr = false;
   	$result->bIsConfirmed = ($user['confirmed'] == 1);
   	$result->sMsg = "Value queried from database.";
   }
   
   return $result;
}
