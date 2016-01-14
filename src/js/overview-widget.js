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

/*
    Two-directional data-binding for selected model
    It is like:
    |                                                             
    |  _____________    click               ____________          ____________              
    | |             |  ------------------> |            |  ----> |            |                                               
    | | Model-items |                      | View-Model |        | Yjs-object |                                          
    | |             |  update → highlight  | (in mo-vi) |        |            | 
    | |_____________|  <-----------------  |____________| <----- |____________|
    |                                        |                               
    |                                        |                               
    |                                        | update 3D-View                                
    |                                       _↓_____                                
    |                                      |       |                      
    |                                      | x3d   |                               
    |                                      |_______|                                  
    |                                                                        
*/
    
$(document).ready( function () {
    
    var items = $('.img-list').find('a')

    // remove links
    items.attr('href', 'javascript:void(0)')

    // add modelId property
    items.map( function () {
            $(this).prop( 'modelId', parseInt($(this).attr('id').substr(5)) )
        })

    // showcase → gallery
    window.addEventListener('message', function (msg) {
        if (msg.data.command == 'selectModel') {
            // highlight selected model
            $('.img-list').find('img').removeClass('highlight-model')
            $('.img-list').find('a').filter(function(){
                    return $(this).prop('modelId') == msg.data.modelId
                })
                .find('img').addClass('highlight-model')            
        }
    }, false)

    // gallery → showcase
    // add click-handler
    items.on('click', function () {
            window.parent.postMessage( {
                command: 'selectModel', 
                modelId: $(this).prop('modelId')
            }, '*' )
        })  
})
        
        
        
        
        
        
        
        
        
        
        
        
        
    
