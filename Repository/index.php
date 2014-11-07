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
 <?php
  $verbindung = mysql_connect("localhost", "root","")
   or die ("keine Verbindung moeglich. 
   Benutzername oder Passwort sind falsch");
  mysql_select_db("3dmodelsdb") 
   or die ("Die Datenbank existiert nicht.");
 ?>

<h1>3D Models</h1>
<?php
 $abfrage = "SELECT url, urlname FROM model";
 $ergebnis = mysql_query($abfrage);
 while($row = mysql_fetch_object($ergebnis))
 {
  echo "$row->urlname: $row->url <br>";
  echo "<x3d width='600px' height='400px'>
 <scene>
<inline url=\"$row->url\" > </inline>
 </scene> 
</x3d>";
 }
?>

</body>
</html>