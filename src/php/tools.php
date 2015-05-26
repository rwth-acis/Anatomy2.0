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
?>
