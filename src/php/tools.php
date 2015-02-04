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
    $columns = 2;               //number of columns
    $i = 1;
    $html = '<ul class="img-list">';

    foreach ($result as $entry) {
        // Highlighting commented to test layout
        // // id and name used in overview-widget.js for highlighting
        // $html .= "<div class='col-md-6 overview-entry' name='table-entry' id='table_entry$i'>";
        
        if(substr($type,0,1) == "m") {
            $html .= getModelStructure($entry,$i,$type);
        } else {
            $html .= getCourseStructure($entry,$i);
        }

        // $html .= "</div>";
        $i++;
    }

    $html .= '</ul>';
    return $html;
}

/**
 * Creates the html structure of one model entry with the given data
 * @param  object $entry Model data from database
 * @param  number $i     Number of entry
 * @param  string $type     Modify the entry according to the purpose (normal, selection, deletion)
 * @return string/html        HTML containing the model information
 */
function getModelStructure($entry, $i, $type) {
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
        case 'model':
            $html .= 
          "<li><a href='model_viewer.php?id=$entry[id]' id='a_img$i'><img id='image-over' src='../../$entry[preview_url]' alt=$entry[name] width='150' height='150' />
              <span class='text-content'><span>Name: $entry[name]<br>Size: ".$formatBytes($entry[size])."<br> Category: $entry[classification]</span></span></a>
              <p id='text-over'>$entry[name]</p>
              </li>";
	    break;
        
        case 'modelselection':
	    //id nicht mehr image-over
            $html .= "<li><img src='../../$entry[preview_url]' alt=$entry[name] width='150' height='150' />
              <span class='text-content'><span id='$entry[id]'>Name: $entry[name]<br>Size: $entry[size]<br> Category: $entry[classification]</span></span>
              <p id='text-over'>$entry[name]</p>
              </li>";
            break;

        default:
            $html .= 
          "<li><a href='model_viewer.php?id=$entry[id]' id='a_img$i'><img id='image-over' src='../../$entry[preview_url]' alt=$entry[name] width='150' height='150' />
              <span class='text-content'><span>Name: $entry[name]<br>Size: $entry[size]<br> Category: $entry[classification]</span></span></a>
              <p id='text-over'>$entry[name]</p>
	      <div class='delete' id='$entry[id]'></div>
              </li>";
            break;
    }

    return $html;
}

/**
 * Creates the html structure of one course entry with the given data
 * @param  object $entry Course data from database
 * @param  number $i     Number of entry
 * @return string/html        HTML containing the course information
 */
function getCourseStructure($entry, $i) {
    $html = "";
    // Decide if we are in ROLE space
    if(isset($_GET['widget']) && $_GET['widget'] == 'true') {$html = "&widget=true";}

    // id used to derive course id (from database) connected to clicked link
    return "<li><a href='course.php?id=$entry[id]".$html."' id='a_img$i'>
            <img src=$entry[img_url] alt=$entry[name] class='img-responsive img-fit'>
            <h3>$entry[name]</h3>
            </a></li>";
}
?>