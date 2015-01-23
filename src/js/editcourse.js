//This is the function that closes the pop-up
function endBlackout(){
  document.getElementById("blackout").style.display = "none";
  document.getElementById("modelbox").style.display = "none";

  // Reset width and put box in the center of the window 
  document.getElementById("modelbox").style.width = 0;
  document.getElementById("modelbox").style.left = "50%";
}

//This is the function that starts the pop-up
function startBlackout(){
  var modelbox = document.getElementById("modelbox");
  document.getElementById("blackout").style.display = "block";
  modelbox.style.display = "block";
  expand(modelbox);
}

//Sets the buttons to trigger the blackout on clicks
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("addcourse").addEventListener("click", startBlackout);  // open if btn is pressed
  document.getElementById("blackout").addEventListener("click", endBlackout);     // close if click outside of popup
  document.getElementById("closebox").addEventListener("click", endBlackout);     // close if close btn clicked
});


function expand(target){
  var pxPerStep = 50;
  var width = target.offsetWidth;
  var left = target.offsetLeft;
  var windowWidth = window.outerWidth;

  var loopTimer = setInterval(function() {
    // We want a width of 80% of the window
    if(width+pxPerStep < 0.8*windowWidth){
        width += pxPerStep;
        left -= pxPerStep/2
        target.style.width = width+"px";
        target.style.left = left+"px";
    } else {
        var diff = 0.8*windowWidth-width;
        target.style.width = width+diff+"px";
        target.style.left = left-diff/2+"px";
        clearInterval(loopTimer);
    }
  },10);
}
