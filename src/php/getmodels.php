<?php
include 'db_connect.php';

$searchstr = $_GET['q'];
$query = "SELECT * FROM models WHERE name LIKE '%".$searchstr."%'";
$result = mysql_query($query);

$i = 1;
$html = '<div class="row">';
while($entry = mysql_fetch_object($result)) {
    if($i > 2 && $i % 2) {
      $html .= '</div><div class="row">';
    }
    // id and name used in overview-widget.js for highlighting
    $html .= "<div class='col-md-6 overview-entry' name='table-entry' id='table_entry$i'>";
    // id used to derive model id (from database) connected to clicked link
    $html .= "  <a href='model_viewer.php?id=$entry->id' id='a_img$i'>
        <img src='../../$entry->preview_url' alt=$entry->name class='img-responsive img-fit'>
        <h3>$entry->name</h3>
      </a>
      <p><b>Model Name:</b> $entry->name</p>
        <p><b>Category:</b> $entry->classification</p>
        <p><b>Size:</b> $entry->size</p>
        <p><b>Upload Date:</b> $entry->upload_date</p>
        <p><b>Description:</b> $entry->description</p>
    </div>";

    $i++;
}
$html .= '</div>';

echo $html;
?>