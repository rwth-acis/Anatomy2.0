/**
*
*
* Shows: special features for models
* Requires:
**/

modelSpecials = {}
modelSpecials.inlinespace = 'inlinespace__'

modelSpecials.onLoaded = function () {
	var skin_shape = $('x3d Shape#'+modelSpecials.inlinespace+'headskin_1');
	if(skin_shape.length) {
			$('#tool-list').append($('<li class="navbar-li"/>').append($('<input id="skin-fade-slider"/>')).append($('<b>Fade skin</b>').css('margin', '15px')))
			$('#skin-fade-slider').slider({
									  min: 0
									 ,max: 100
									 ,step: 1
									 ,value: 100
									 })
									 .on('slide', function () { 
									 	var val = $('#skin-fade-slider').slider('getValue')
										if(val == 100) {
											modelHighlighter.setMaterial(skin_shape, $(''));
										} else {
											modelHighlighter.setMaterial(skin_shape, $('<Material/>').attr('transparency', (100-val)/100));
										}
									})
	}
};

modelViewer.addEventListener('load', modelSpecials.onLoaded);

$(document).ready( function () {
});

