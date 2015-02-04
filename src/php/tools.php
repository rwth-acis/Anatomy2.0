<?php
/**
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
            $html .= "<li><img id='image-over$entry[id]' src='../../$entry[preview_url]' alt=$entry[name] name='image-over' width='150' height='150' style='margin-top:5px;' />
              <span class='text-content'><span>Name: $entry[name]<br>Size: ".$formatBytes($entry["size"])."<br> Category: $entry[classification]</span></span>
              <p id='text-over' style='margin-left:5px;'>$entry[name]</p>
              </li>";
            break;

        case 'modeldeletion':
            $html .= "<li><img id='image-over$entry[id]' name='image-over' src='../../$entry[preview_url]' alt=$entry[name] width='150' height='150' />
              <span class='text-content'><span>Name: $entry[name]<br>Size: ".$formatBytes($entry["size"])."<br> Category: $entry[classification]</span></span>
              <p id='text-over'>$entry[name]</p>
	            <div class='delete' id='$entry[id]'></div>
              </li>";
            break;
        
        // model, "normal" list
        default:
            $html .= "<li><a href='model_viewer.php?id=$entry[id]' id='a_img$entry[id]'><img id='image-over$entry[id]' name='image-over' src='../../$entry[preview_url]' alt=$entry[name] width='150' height='150' />
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
            <h3>$entry[name]</h3>
            </a></li>";
}
?>