
// Script controlling the navigation info 

showcase.help = {}

showcase.help.modes = [
           {
             "name":"[E]xamine",
             "option":"examine",
             "shortcut":["e","E"],
             "mouseWheelScroll":"Zoom",
             "mouseLeft":"Rotate",
             "mouseRight":"Zoom"
           },
           {
             "name":"[W]alk",
             "option":"walk",
             "shortcut":["w","W"],
             "mouseLeft":"Move forward",
             "mouseRight":"Move backward",
           },
           {
             "name":"[F]ly",
             "option":"fly",
             "shortcut":["f","F"],
             "mouseLeft":"Move forward",
             "mouseRight":"Move backward",
           },
           {
             "name":"[H]elicopter",
             "option":"helicopter",
             "shortcut":["h", "H"],
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
             "name":"[L]ook at",
             "option":"lookAt",
             "shortcut":["l", "L"],
             "mouseLeft":"Move in",
             "mouseRight":"Move out",
           },
           {
             "name":"Tur[n]table",
             "option":"turntable",
             "shortcut":["n", "N"],
             "mouseWheelScroll":"Zoom",
             "mouseLeft":"Rotate",
             "mouseRight":"Zoom"
           },
           {
             "name":"[G]ame", 
             "option":"game",
             "shortcut":["g", "G"], 
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

showcase.help.showModeDetails = function (mode)
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
         $("#buttonTable").append("<tr><td><div class='key'>" + button.key + "</div></td><td>"+button.desc+"</td></tr>");
        });
     }
}

$(document).ready(function(){   
  //Add all modes to dropdown field
  $.each(showcase.help.modes, function(index, value) {   
       $('#viewModeSelect')
            .append($('<option>', { value : value.option })
            .text(value.name));
       
       if(index==0)
         showcase.help.showModeDetails(value);
  }); 

  //Listen for changed modes...
  $("#viewModeSelect").on("change", function() {
    var currentMode = this.value;
    //...activate new mode...
    $('#navType').attr("type", currentMode);

    //...and refresh hints
    $.each(showcase.help.modes, function(index, value) {  
      if(value.option == currentMode)
        showcase.help.showModeDetails(value);
    });
  });

  //Listen for pressed shortcuts...
  $(document).on("keypress", function(event) {
    var key = String.fromCharCode(event.which);
    
    //...and refresh hints
    $.each(showcase.help.modes, function(index, value) {  
      for (var i = 0; i < value.shortcut.length; i++) {
        if(value.shortcut[i] === key)
        {
          var num = showcase.help.getIndex(value.option);
          $('#viewModeSelect').val(num);
          $('#navType').attr("type", value.option);
          showcase.help.showModeDetails(value);
        }
      }
    });
    
    if(key === " ") {
      btnShowInfo();
    }
  });
});

showcase.help.getIndex = function (option) {
  
  for (i = 0; i < showcase.help.modes.length; i++) {
    if (showcase.help.modes[i].option == option) {
      return i;
    }
  }
}