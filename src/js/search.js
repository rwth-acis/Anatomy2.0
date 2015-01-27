/**
 * Sends an AJAX request to the server to get the models which match the search
 * string
 * Used in menu.php
 * @param  {string} str Search string entered by the user
 */
function showModels(str) {
  ajax.post("../php/getmodels.php", {q: str}, function(response) {
    document.getElementsByClassName("container")[3].innerHTML = response;
  });
}