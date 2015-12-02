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

var modelHighlighter = {};
modelHighlighter.matNorm = $('');
modelHighlighter.matOver = $('<Material emissiveColor="1 0.8 0.1" transparency=0.0 />');
modelHighlighter.matOut = $('<Material emissiveColor="0 0 0" transparency=1.0 />');


// Highlighting turned off
modelHighlighter.STATE_OFF = 0;
// Everything yellow
modelHighlighter.STATE_INIT = 1;
// Normal selection
modelHighlighter.STATE_WORK = 2;
// highlighting state-variable
modelHighlighter.state = modelHighlighter.STATE_OFF;

/**
 * Enables highlighting by adding event listener to model shapes
 * 
 * @return {undefined} 
 */
modelHighlighter.startHighlighting = function() {
  
  modelHighlighter.state = modelHighlighter.STATE_INIT;
  var allSh = $ ('#model-nodes Shape');
  allSh.each( function () {
    this.isSelected = false;
    this.onclick = modelHighlighter.funcClick (this, allSh);
    this.onmouseover = modelHighlighter.funcOver (this);
    this.onmouseout = modelHighlighter.funcOut (this);
    modelHighlighter.setMaterial(this, modelHighlighter.matOver);
  });
}

modelHighlighter.toggleHighlighting = function() {
  if (modelHighlighter.state !== modelHighlighter.STATE_OFF) {
    modelHighlighter.stopHighlighting();
  }
  else {
    modelHighlighter.startHighlighting();
  }
}

/**
 * Disables highlighting by detaching all event listeners. Also removes all
 * changes made to shapes appearance
 */
modelHighlighter.stopHighlighting = function() {
  
  var allSh = $ ('#model-nodes Shape');
  allSh.each( function () {
    this.onclick = undefined;
    this.onmouseover = undefined;
    this.onmouseout = undefined;
	 modelHighlighter.setMaterial(this, modelHighlighter.matNorm);
  });
  
  modelHighlighter.state = modelHighlighter.STATE_OFF;
};

/* add transparency-effect: */
/* http://www.x3dom.org/inline-html-reflection/ 
   inline/@nameSpaceName attribute is essential (s. above link)
   example is at http://x3dom.org/x3dom/example/x3dom_inlineReflection.xhtml */
/* pressing 'D' for x3dom-debug in every viewer */

modelHighlighter.setMaterial = function (sh, mat) {
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
modelHighlighter.funcOver = function (sh) { 
  return function() { 
    if( !sh.isSelected && modelHighlighter.state === modelHighlighter.STATE_WORK) {
    	modelHighlighter.setMaterial(sh, modelHighlighter.matOver);
	 }
  } 
}

/**
 * Getter for a callback function for mouse out on model parts. Removes 'glow'
 * 
 * @return {function} Callback function for mouse out
 */
modelHighlighter.funcOut = function (sh) { 
	return function () {
		 if( modelHighlighter.state === modelHighlighter.STATE_WORK ) {
		    if( !sh.isSelected ) {
		    	modelHighlighter.setMaterial(sh, modelHighlighter.matOut);
			 } else {
		    	modelHighlighter.setMaterial(sh, modelHighlighter.matNorm);
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
modelHighlighter.funcClick = function (sh, allSh) {
	 return function() {
	 	 // only doubleclick
	 	 if (!sh.lastClicked) {
	 	 	sh.lastClicked = 0;
	    }
	 	 var now = new Date() .getTime();
	 	 if (now - sh.lastClicked < 320) {
		      sh.isSelected = !sh.isSelected;
		      if( sh.isSelected ) {
		      	modelHighlighter.setMaterial(sh, modelHighlighter.matNorm);
		      } else {
		      	modelHighlighter.setMaterial(sh, modelHighlighter.matOver);
		      }
		      
		      if( modelHighlighter.state === modelHighlighter.STATE_INIT ) {
		      	allSh.not($(sh)).each( function () {
		      		modelHighlighter.setMaterial(this, modelHighlighter.matOut);
		      	});
		      	modelHighlighter.state = modelHighlighter.STATE_WORK;
		      }
  		}
  		sh.lastClicked = now;
  	}
}

/**
 * Initializes model by adding a material to all nodes. Material is required for
 * highlighting effects. Will also enable x3dom lighting calculation.
 */
modelHighlighter.initialize = function() {
  $ ('#model-nodes Shape').each(
	  function () {
	    modelHighlighter.setMaterial(this, modelHighlighter.matNorm);
  });
};

modelViewer.addEventListener('load', modelHighlighter.initialize);
