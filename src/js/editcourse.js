var selectedModels = {};
var course = QueryString.id;            // the edited course's id

//This is the function that closes the pop-up
function endBlackout() {
  var list = document.getElementsByClassName("img-responsive");
  for(var i=0;i<list.length;i++) {
    list[i].removeEventListener("click", toggleSelectModel);
  }
  selectedModels = {};
  
  document.getElementById("blackout").style.display = "none";
  document.getElementById("modelbox").style.display = "none";

  // Reset width and put box in the center of the window 
  document.getElementById("modelbox").style.width = 0;
  document.getElementById("modelbox").style.left = "50%";
}

//This is the function that starts the pop-up
function startBlackout() {
  var modelbox = document.getElementById("modelbox");
  document.getElementById("blackout").style.display = "block";
  getModels();
}

/**
 * Sends an AJAX request to the server to get the models of the course
 */
function getModels() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
  } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // Send request with data to run the script on the server 
  xmlhttp.open("POST","../php/getcoursemodels.php");
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("course="+course);

  // Display the result which is sent by the script on the server after 
  // it is finished
  xmlhttp.onreadystatechange = function() {
      // Check if the data transfer has been completed the connection to the server
      // is successful (HTTP status code 200 OK)
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        modelbox.style.display = "block";
        expand(modelbox);
        // Display all models associated with the course
        document.getElementById("modelselection").innerHTML = xmlhttp.responseText;
        // Add event listener to each model
        var list = document.getElementsByClassName("img-responsive");
        for(var i=0;i<list.length;i++) {
            list[i].addEventListener("click", toggleSelectModel);
        }
      }
  }
}

/**
 * Sends an AJAX request to the server to save the models which were selected
 */
function addModels() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
  } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // Send request with data to run the script on the server 
  xmlhttp.open("POST","../php/addmodels.php");
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("course="+course+"&models="+JSON.stringify(selectedModels));

  // Display the result which is sent by the script on the server after 
  // it is finished
  xmlhttp.onreadystatechange = function() {
      // Check if the data transfer has been completed the connection to the server
      // is successful (HTTP status code 200 OK)
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // Display all models associated with the course
        document.getElementById("model_table").innerHTML = xmlhttp.responseText;
        // Add event listener to each model
        addDeleteListener();
        endBlackout();
      }
  }
}

/**
 * Sends an AJAX request to the server to delete the model which was clicked
 * from the course
 */
function deleteModel(event) {
  var xmlhttp;
  console.log(event.target.id);
  if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
  } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // Send request with data to run the script on the server 
  xmlhttp.open("POST","../php/deletemodel.php");
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("course="+course+"&model="+event.target.id);

  // Display the result which is sent by the script on the server after 
  // it is finished
  xmlhttp.onreadystatechange = function() {
      // Check if the data transfer has been completed the connection to the server
      // is successful (HTTP status code 200 OK)
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // Display all models associated with the course
        document.getElementById("model_table").innerHTML = xmlhttp.responseText;
        // Add event listener to each model
        addDeleteListener();
      }
  }
}

//Sets the buttons to trigger the blackout on clicks
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("openbox").addEventListener("click", startBlackout);  // open if btn is pressed
  document.getElementById("blackout").addEventListener("click", endBlackout);     // close if click outside of popup
  document.getElementById("closebox").addEventListener("click", endBlackout);     // close if close btn clicked
  document.getElementById("addmodels").addEventListener("click", addModels);     // close and add models if button clicked
  addDeleteListener();
});

/**
 * Adds the event listener deleteModel to each displayed model
 */
function addDeleteListener() {
  var list = document.getElementsByClassName("delete");
  for(var i=0;i<list.length;i++) {
    list[i].addEventListener("click", deleteModel);
  }
}

function expand(element) {
  var pxPerStep = 50;
  var width = element.offsetWidth;
  var left = element.offsetLeft;
  var windowWidth = window.outerWidth;

  var loopTimer = setInterval(function() {
    // We want a width of 80% of the window
    if(width+pxPerStep < 0.8*windowWidth){
        width += pxPerStep;
        left -= pxPerStep/2
        element.style.width = width+"px";
        element.style.left = left+"px";
    } else {
        var diff = 0.8*windowWidth-width;
        element.style.width = width+diff+"px";
        element.style.left = left-diff/2+"px";
        clearInterval(loopTimer);
    }
  },10);
}

/**
 * Selects the clicked element or removes it from the list
 * @param  {event} event The click event
 */
function toggleSelectModel(event) {
    var element = event.target;
  // Look if the clicked element is already selected
  if(selectedModels[element.id]) {
    delete selectedModels[element.id];

    // Remove highlight
    var index = (' ' + element.className + ' ').indexOf(' div-highlight ');
    element.className = element.className.substr(0,index-1);
  } else { 
    selectedModels[element.id] = element.id; 

    // Highlight model
    element.className += ' div-highlight'; 
  }
}
