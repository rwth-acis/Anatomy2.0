<!DOCTYPE html>
<html>
  <head>
    <title>Collaborative 3D Model Viewer</title>
    <meta charset='utf-8'/>
    <script type='text/javascript' src='http://www.x3dom.org/download/x3dom.js'> </script>
    <link type='text/css' rel='stylesheet' href='http://www.x3dom.org/download/x3dom.css'> </link> 
  </head>

  <body>
    <h1>Model Repository</h1>

    <table border="2" cellpadding="10">
      <tr>
        <th>Name</th>
        <th>Preview</th>
      </tr>
      
      <?php
        include '../php/db_connect.php';
        $query  = "SELECT * FROM models";
        $result = mysql_query($query);
        while($entry = mysql_fetch_object($result))
        {
          echo "
      <tr>
        <td>
          <a href=\"inspector.php?id=$entry->id\">
            $entry->name
          </a>
        </td>
        <td>
          <img src=\"../$entry->preview_url\" style=\"width:100px;height:100px\">
        </td>
      </tr>\n";
        }

      ?>
    </table>
  
  </body>

</html>
