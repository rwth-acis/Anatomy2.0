/**
*
*
* Shows: special features for models
* Requires:
**/

showcase.specials = {}
showcase.specials.inlinespace = 'inlinespace__'

showcase.specials.onLoaded = function () {
	var skin_shape = $('x3d Shape#'+showcase.specials.inlinespace+'headskin_1');
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
											showcase.highlighter.setMaterial(skin_shape, $(''));
										} else {
											showcase.highlighter.setMaterial(skin_shape, $('<Material/>').attr('transparency', (100-val)/100));
										}
									})
	}

	// reverse material-deletion from highlighting
	var no_texture_shape = $('x3d Shape#'+showcase.specials.inlinespace+'no_texture')
	if(no_texture_shape.length) {
		no_texture_shape.first().prepend('<Appearance><Material></Material></Appearance>')
	}
};

showcase.addEventListener('load', showcase.specials.onLoaded);