/**
 * Sends an AJAX request to the server to get the models which match the search
 * string
 * Used in menu.php
 * @param  {string} str Search string entered by the user
 */
function showModels(str) {
  if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
  }/* else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }*/

  // Send request to run the script to the server 
  xmlhttp.open("GET","../php/getmodels.php?q="+str,true);
  xmlhttp.send();

  // Display the result which is sent by the script on the server after 
  // it is finished
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          document.getElementById("table-container").innerHTML = xmlhttp.responseText;
      }
  }
}