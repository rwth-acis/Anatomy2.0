/**
*
*
* Shows: special features for models
* Requires:
**/

modelSpecialFeatures = {}
modelSpecialFeatures.inlinespace = 'inlinespace__'

modelSpecialFeatures.onLoaded = function () {
	console.log("x3d loaded");
	var skin_shape = $('x3d Shape#'+modelSpecialFeatures.inlinespace+'headskin_2');
	if(skin_shape.length) {
			$('#viewer_object').prepend(
				$('<div/>').css('width','100px').css('margin','0 auto').slider({
					min: 0,
					max: 100,
					value: 100,
					slide: function (event,ui) { 
						if(ui.value == 100) {
							modelHighlighter.setMaterial(skin_shape, $(''));
						} else {
							modelHighlighter.setMaterial(skin_shape, $('<Material/>').attr('transparency', (100-ui.value)/100));
						}
					}
				})
			);
	}
};

modelViewer.addEventListener('load', modelSpecialFeatures.onLoaded);

$(document).ready( function () {
});

