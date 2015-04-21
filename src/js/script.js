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
 * @file script.js
 * Shows a progress bar when uploading a model in upload.php
 */
$(document).ready(function() {
//elements
var progressbox     = $('#progressbox');
var progressbar     = $('#progressbar');
var statustxt       = $('#statustxt');
var submitbutton    = $("#SubmitButton");
var myform          = $("#UploadForm");
var output          = $("#output");
var completed       = '0%';

        $(myform).ajaxForm({
            beforeSend: function() { //brfore sending form
                submitbutton.attr('disabled', ''); // disable upload button
                statustxt.empty();
                progressbox.slideDown(); //show progressbar
                progressbar.width(completed); //initial value 0% of progressbar
                statustxt.html(completed); //set status text
                statustxt.css('color','#000'); //initial color of status text
            },
            uploadProgress: function(event, position, total, percentComplete) { //on progress
                progressbar.width(percentComplete + '%') //update progressbar percent complete
                statustxt.html(percentComplete + '%'); //update status text
                if(percentComplete>50)
                    {
                        statustxt.css('color','#fff'); //change status text to white after 50%
                    }
                },
            complete: function(response) { // on complete
                output.html(response.responseText); //update element with received data
                // myform.resetForm();  // reset form
                submitbutton.removeAttr('disabled'); //enable submit button
                progressbox.slideUp(); // hide progressbar
            }
    });
});
