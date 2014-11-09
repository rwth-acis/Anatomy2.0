<!DOCTYPE html>
<html>
  <head>
    <title> 3D Models</title>
    <meta charset='utf-8'/>
    <meta name='description' content='TODO'/>
    <script type='text/javascript' src='http://www.x3dom.org/download/x3dom.js'> </script>
    <link rel='stylesheet' type='text/css' href='http://www.x3dom.org/download/x3dom.css'></link> 
  </head>
  <body>
    <!-- connect to database -->
    <?php
       $verbindung = mysql_connect("localhost", "root","")
       or die ("keine Verbindung moeglich. 
		Benutzername oder Passwort sind falsch");
       mysql_select_db("3dmodelsdb") 
       or die ("Die Datenbank existiert nicht.");
       ?>

    <h1>Collaborative 3D Model Viewing</h1>
    <h2>Select a model:</h2>
    <table border="2" cellpadding="10">
      <tr>
	<th>Model Name</th>
	<th>Preview</th>
      </tr>
      <!-- Get entries from the database and create a table row for each one -->
      <?php
	 $abfrage = "SELECT url, urlname FROM model";
	 $ergebnis = mysql_query($abfrage);
	 while($row = mysql_fetch_object($ergebnis))
	 {
	 echo "<tr><td><a href=\"../Sandbox/WebViewer/views/model_viewer.html?m=$row->url\">$row->urlname </a></td>";
	 echo "<td><x3d width='100px' height='100px'>
	       <scene>
		 <inline url=\"models/$row->url\" > </inline>
	       </scene> 
               </x3d></td></tr>";
      }
      ?>
    </table>

  </body>
</html>
