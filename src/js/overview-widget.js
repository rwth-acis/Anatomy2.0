/**
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file overview-widget.js
 *  Additional js functions if the overview is loaded as separate widget
 */


/**
 * change normal overview page to separate widget page
 */
$(document).read( function () {
    
    /*
        Two-directional data-binding for selected model
        It is like:
        |                                  _______________________     
        |  _____________    click          |    ____________     |    ____________              
        | |             |  ------------------> |            |    --> |            |                                               
        | | Model-items |                      | View-Model |        | Yjs-object |                                          
        | |             |  update → highlight  |            |        |            | 
        | |_____________|  <-----------------  |____________| <----- |____________|
        |                                                                        
        |                                                                        
    */
    
    // The Y-object creation takes a fair amount of time, blocking the UI
	Y({
	  db: {
	    name: 'memory'
	  },
	  connector: {
	    name: 'websockets-client',
	    room: 'Anatomy2.07',
	    types: ['Array', 'Text'],
	  },
     sourceDir: location.pathname + '/../../external'
	}).then(function (yconfig) {
        
        var y = yconfig.root

        var selectedModelViewModel = {selectedModel : ko.observable(-1)}

        ko.bindingHandlers.selectedModel = {
            init: function(element, valueAccessor) {
                var items = $(element).find('a')

                // remove links
                items.attr('href', 'javascript:void(0)')

                // add modelId property
                items.map( function () {
                        $(this).prop( 'modelId', parseInt($(this).attr('id').substr(5)) )
                    })

                // add click-handler
                items.on('click', function () {
                        var selectedId = $(this).prop('modelId')
                        valueAccessor().selectedModel( selectedId )
                        y.set('selected_model', selectedId)
                    })

                y.observePath(['selected_model'], function (events) {
                    selectedModelViewModel.selectedModel( y.get('selected_model') )
                })
            },
            update: function(element, valueAccessor) {
                // highlight selected model
                $(element).find('img').removeClass('highlight-model')
                $(element).find('a').filter(function(){
                        return $(this).prop('modelId') == valueAccessor().selectedModel() 
                    })
                    .find('img').addClass('highlight-model')
            }
        }
        $('.img-list').attr('data-bind', "selectedModel: $root")
        ko.applyBindings(selectedModelViewModel, $('.img-list')[0])    
    
    })
})

