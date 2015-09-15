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
 *  TODO
 */

var modelHighlighter = {};

modelHighlighter.showHighlighting = false;

modelHighlighter.initialize = function() {
  
  if (modelHighlighter.showHighlighting === false) {
    console.log('Model Highlighter: Highlighting disabled. Set \'modelHighlighter.showHighlighting = true\' in case you like to enable highlighting.')
  }
  else {
    var modelNodesGroup = document.getElementById('model-nodes');
    var allSh = modelNodesGroup.getElementsByTagName('Shape'); 
    for (var i = 0, length = allSh.length; i < length; i++) {
      var sh = allSh[i];
      var app = sh .getElementsByTagName('Appearance')[0];
      if(app === undefined) {
        app = document.createElement('Appearance');
        sh.appendChild(app);
      }
      if (!app.getElementsByTagName('Material')[0]) {
        app.appendChild( document.createElement('Material') );
      }
      sh.isSelected = false;
      sh.onclick = modelHighlighter.funcClick (sh, allSh);
      sh.onmouseover = modelHighlighter.funcOver (sh);
      sh.onmouseout = modelHighlighter.funcOut (sh);
    };
  }
}

modelHighlighter.stopHighlighting = function() {
  
  var modelNodesGroup = document.getElementById('model-nodes');
  var allSh = modelNodesGroup.getElementsByTagName('Shape'); 
  for (var i = 0, length = allSh.length; i < length; i++) {
    var sh = allSh[i];
    sh.onclick = undefined;
    sh.onmouseover = undefined;
    sh.onmouseout = undefined;
    // Remove yellow mouse over color
    modelHighlighter.setMaterialAttribute(sh,'emissiveColor','0 0 0'); 
    // Remove transparency
    modelHighlighter.setMaterialAttribute(sh,'transparency','0.0');
  };
  
  modelHighlighter.showHighlighting = false;
};

/* add transparency-effect: */
/* http://www.x3dom.org/inline-html-reflection/ 
   inline/@nameSpaceName attribute is essential (s. above link)
   example is at http://x3dom.org/x3dom/example/x3dom_inlineReflection.xhtml */
/* pressing 'D' for x3dom-debug in every viewer */
modelHighlighter.setMaterialAttribute = function(sh, attr, val) {
  sh.getElementsByTagName('Appearance')[0]
    .getElementsByTagName('Material')[0]
    .setAttribute(attr,val); 
}
modelHighlighter.funcOver = function (sh) { 
  return function() { 
    modelHighlighter.setMaterialAttribute(sh,'emissiveColor','1 0.8 0.1'); 
  } 
}

modelHighlighter.funcOut = function (sh) { 
  return function() { 
    modelHighlighter.setMaterialAttribute(sh,'emissiveColor','0 0 0'); 
  } 
}

modelHighlighter.funcClick = function (sh, allSh) {
  return function() {
    other = Array.filter(allSh, x => x != sh);
    if( other.length > 0 ) {
      sh.isSelected = !sh.isSelected;
      if( sh.isSelected ) {
        modelHighlighter.setMaterialAttribute(sh,'transparency','0.0');
        Array.forEach( other, 
          x => {modelHighlighter.setMaterialAttribute(x,'transparency','0.9'); x.isSelected=false} 
        );
      } else {
        modelHighlighter.setMaterialAttribute(sh,'transparency','0.0');
        Array.forEach( other, 
          x => {modelHighlighter.setMaterialAttribute(x,'transparency','0.0')} 
        );
      }
    }
  } 
}
