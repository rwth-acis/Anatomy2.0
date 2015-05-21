
// Script controlling the navigation info 
var modes = [
           {
             "name":"Examine",
             "option":"examine",
             "shortcut":"e",
             "mouseWheelScroll":"Zoom",
             "mouseLeft":"Rotate",
             "mouseRight":"Zoom"
           },
           {
             "name":"Walk",
             "option":"walk",
             "shortcut":"w",
             "mouseLeft":"Move forward",
             "mouseRight":"Move backward",
           },
           {
             "name":"Fly",
             "option":"fly",
             "shortcut":"f",
             "mouseLeft":"Move forward",
             "mouseRight":"Move backward",
           },
           {
             "name":"Helicopter",
             "option":"helicopter",
             "shortcut":"h",
             "mouseLeft":"Move forward",
             "buttons":
                 [
                  {"key":"8", "desc":"Look down"},
                  {"key":"9", "desc":"Look up"},
                  {"key":"6", "desc":"Move higher"},
                  {"key":"7", "desc":"Move lower"}
                 ]
           },
           {
             "name":"Look at",
             "option":"lookAt",
             "shortcut":"l",
             "mouseLeft":"Move in",
             "mouseRight":"Move out",
           },
           {
             "name":"Turntable",
             "option":"turntable",
             "shortcut":"n",
             "mouseWheelScroll":"Zoom",
             "mouseLeft":"Rotate",
             "mouseRight":"Zoom"
           },
           {
             "name":"Game", 
             "option":"game",
             "shortcut":"g", 
             "mouse":"Rotate view",
             "buttons":
             [
              {"key":"&uarr;", "desc":"Move forward"},
              {"key":"&darr;", "desc":"Move backwards"},
              {"key":"&larr;", "desc":"Strafe left"},
              {"key":"&rarr;", "desc":"Strafe right"}
             ]
           }
           ];
           
var canvas;             
var context;

function showModeDetails(mode)
{      
  //Show mouse operations
  $.each(["mouse", "mouseLeft", "mouseRight", "mouseWheelScroll", "mouseWheelPress"], function(index, mouse) {
    if(mode[mouse] != undefined)
    {
      $("#"+mouse).html(mode[mouse]);
      $("#"+mouse+"Row").show();
    }
    else
      $("#"+mouse+"Row").hide();
  });

  //Delete old keys and display new one if applicable
  $("#buttonTable").empty();     
  if(mode.buttons != undefined)
     {
       $.each(mode.buttons, function(buttonIndex, button) {
         $("#buttonTable").append("<tr><td><div class='key'>"+button.key + "</div></td><td>"+button.desc+"</td></tr>");
        });
     }
}

// Initialize navigation info
showModeDetails("Walk");

$(document).ready(function(){   
  //Add all modes to dropdown field
  $.each(modes, function(index, value) {   
       $('#viewModeSelect')
            .append($('<option>', { value : value.option })
            .text(value.name));
       
       if(index==0)
         showModeDetails(value);
  }); 

  //Listen for changed modes...
  $("#viewModeSelect").on("change", function() {
    var currentMode = this.value;
    //...activate new mode...
    document.getElementById('navType').setAttribute("type", currentMode);

    //...and refresh hints
    $.each(modes, function(index, value) {  
      if(value.option == currentMode)
        showModeDetails(value);
    });
  });

  //Listen for pressed shortcuts...
  $(document).on("keypress", function(event) {
    var key = String.fromCharCode(event.which);
    
    //...and refresh hints
    $.each(modes, function(index, value) {  
      if(value.shortcut == key)
      {
        $("#viewModeSelect option[value='"+value.option+"']").attr('selected',true);
        showModeDetails(value);
      }
    });
  });

  canvas = document.getElementById('turntableVis');
  context = canvas.getContext('2d');

  updateArc(0.2, 1.4);
});