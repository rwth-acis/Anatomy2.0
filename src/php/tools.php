<?php
/**
 * @file tools.php
 * File for some PHP helper functions that are generally useful
 */

/**
 * Creates the html table structure from the given result from the database
 * Used in courses.php and course.php
 * @param  resource $result Identifier for the result set from the database
 * @return string/html         HTML table containing the models which should be displayed
 */
function createTable($result, $type) {
    $columns = 2;               //number of columns
    $i = 1;
    $html = "<div class='row'>";

    foreach ($result as $entry) {
        if($i > $columns && $i % $columns) {
          $html .= "</div><div class='row'>";
        }
        // id and name used in overview-widget.js for highlighting
        $html .= "<div class='col-md-6 overview-entry' name='table-entry' id='table_entry$i'>";
        
        if(substr($type,0,1) == "m") {
            $html .= $type == 'model' ? getModelStructure($entry,$i,true) : getModelStructure($entry,$i,false);
        } else {
            $html .= getCourseStructure($entry,$i);
        }

        $i++;
    }

    $html .= '</div>';
    return $html;
}

/**
 * Creates the html structure of one model entry with the given data
 * @param  object $entry Model data from database
 * @param  number $i     Number of entry
 * @param  boolean $showLink     Let the image and name link to the viewer
 * @return string/html        HTML containing the model information
 */
function getModelStructure($entry, $i, $showLink) {
    // id used to derive model id (from database) connected to clicked link
    $html = $showLink ? "<a href='model_viewer.php?id=$entry[id]' id='a_img$i'>
                            <img src='../../$entry[preview_url]' alt=$entry[name] class='img-responsive img-fit'>
                            <h3>$entry[name]</h3>
                          </a>"
                       : "<img src='../../$entry[preview_url]' alt=$entry[name] id='$entry[id]' class='img-responsive img-fit'>
                          <h3>$entry[name]</h3>";
    return $html."<p><b>Model Name:</b> $entry[name]</p>
            <p><b>Category:</b> $entry[classification]</p>
            <p><b>Size:</b> $entry[size]</p>
            <p><b>Upload Date:</b> $entry[upload_date]</p>
            <p><b>Description:</b> $entry[description]</p>
        </div>";
}

/**
 * Creates the html structure of one course entry with the given data
 * @param  object $entry Course data from database
 * @param  number $i     Number of entry
 * @return string/html        HTML containing the course information
 */
function getCourseStructure($entry, $i) {
    // id used to derive course id (from database) connected to clicked link
    return "<a href='course.php?id=$entry[id]' id='a_img$i'>
            <img src=$entry[img_url] alt=$entry[name] class='img-responsive img-fit'>
            <h3>$entry[name]</h3>
            </a>
        </div>";
}
?>