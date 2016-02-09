/* 
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * 
 *  @file model-part-highlighting.php
 *  All functionality required to enable and disable highlighting parts of models
 *  when mousing over them. Clicking on a highlighted model part will make all 
 *  other parts transparent.
 */

showcase.highlighter = {};
showcase.highlighter.matNorm = $('');
showcase.highlighter.matOver = $('<Material emissiveColor="1 0.8 0.1" transparency=0.0 />');
showcase.highlighter.matOut = $('<Material emissiveColor="0 0 0" transparency=1.0 />');


// Highlighting turned off
showcase.highlighter.STATE_OFF = 0;
// Everything yellow
showcase.highlighter.STATE_INIT = 1;
// Normal selection
showcase.highlighter.STATE_WORK = 2;
// highlighting state-variable
showcase.highlighter.state = showcase.highlighter.STATE_OFF;

/**
 * Enables highlighting by adding event listener to model shapes
 * 
 * @return {undefined} 
 */
showcase.highlighter.startHighlighting = function() {
  
  showcase.highlighter.state = showcase.highlighter.STATE_INIT;
  var allSh = $ ('#model-nodes Shape');
  allSh.each( function () {
    this.isSelected = false;
    this.onclick = showcase.highlighter.funcClick (this, allSh);
    this.onmouseover = showcase.highlighter.funcOver (this);
    this.onmouseout = showcase.highlighter.funcOut (this);
    showcase.highlighter.setMaterial(this, showcase.highlighter.matOver);
  });
}

showcase.highlighter.toggleHighlighting = function() {
  if (showcase.highlighter.state !== showcase.highlighter.STATE_OFF) {
    showcase.highlighter.stopHighlighting();
  }
  else {
    showcase.highlighter.startHighlighting();
  }
}

/**
 * Disables highlighting by detaching all event listeners. Also removes all
 * changes made to shapes appearance
 */
showcase.highlighter.stopHighlighting = function() {
  
  var allSh = $ ('#model-nodes Shape');
  allSh.each( function () {
    this.onclick = undefined;
    this.onmouseover = undefined;
    this.onmouseout = undefined;
	 showcase.highlighter.setMaterial(this, showcase.highlighter.matNorm);
  });
  
  showcase.highlighter.state = showcase.highlighter.STATE_OFF;
};

/* add transparency-effect: */
/* http://www.x3dom.org/inline-html-reflection/ 
   inline/@nameSpaceName attribute is essential (s. above link)
   example is at http://x3dom.org/x3dom/example/x3dom_inlineReflection.xhtml */
/* pressing 'D' for x3dom-debug in every viewer */

showcase.highlighter.setMaterial = function (sh, mat) {
		// clone material as it will be removed from previous context
    	if( $(sh).find('Material').length ) {
    		$(sh).find('Material').replaceWith(mat.clone());
    	} else {
    		$(sh).find('Appearance').append(mat.clone());
    	}	
}

/**
 * Getter for a callback function for mouse over on model parts. Makes them 'glow'
 * 
 * @return {function} Callback function for mouse over
 */
showcase.highlighter.funcOver = function (sh) { 
  return function() { 
    if( !sh.isSelected && showcase.highlighter.state === showcase.highlighter.STATE_WORK) {
    	showcase.highlighter.setMaterial(sh, showcase.highlighter.matOver);
	 }
  } 
}

/**
 * Getter for a callback function for mouse out on model parts. Removes 'glow'
 * 
 * @return {function} Callback function for mouse out
 */
showcase.highlighter.funcOut = function (sh) { 
	return function () {
		 if( showcase.highlighter.state === showcase.highlighter.STATE_WORK ) {
		    if( !sh.isSelected ) {
		    	showcase.highlighter.setMaterial(sh, showcase.highlighter.matOut);
			 } else {
		    	showcase.highlighter.setMaterial(sh, showcase.highlighter.matNorm);
			 }
		 }
	}
}

/**
 * Getter for a callback function for mouse click on model parts. 
 * Makes all other model parts transparent
 * 
 * @return {function} Callback function for mouse click
 */
showcase.highlighter.funcClick = function (sh, allSh) {
	 return function() {
	 	 // only doubleclick
	 	 if (!sh.lastClicked) {
	 	 	sh.lastClicked = 0;
	    }
	 	 var now = new Date() .getTime();
	 	 if (now - sh.lastClicked < 320) {
		      sh.isSelected = !sh.isSelected;
		      if( sh.isSelected ) {
		      	showcase.highlighter.setMaterial(sh, showcase.highlighter.matNorm);
		      } else {
		      	showcase.highlighter.setMaterial(sh, showcase.highlighter.matOver);
		      }
		      
		      if( showcase.highlighter.state === showcase.highlighter.STATE_INIT ) {
		      	allSh.not($(sh)).each( function () {
		      		showcase.highlighter.setMaterial(this, showcase.highlighter.matOut);
		      	});
		      	showcase.highlighter.state = showcase.highlighter.STATE_WORK;
		      }
  		}
  		sh.lastClicked = now;
  	}
}

/**
 * Initializes model by adding a material to all nodes. Material is required for
 * highlighting effects. Will also enable x3dom lighting calculation.
 */
showcase.highlighter.initialize = function() {
  $ ('#model-nodes Shape').each(
	  function () {
	    showcase.highlighter.setMaterial(this, showcase.highlighter.matNorm);
  });
};

showcase.addEventListener('load', showcase.highlighter.initialize);
