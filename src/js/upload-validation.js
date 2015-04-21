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
 * @file upload-validation.js
 * Uses parsley to check input of upload page
 */

$(document).ready(function () {
  $('#UploadForm').parsley().subscribe('parsley:form:validate', function (formInstance) {

  // if one of these blocks is not failing do not prevent submission
  // we use here group validation with option force (validate even non required fields)
  if (formInstance.isValid('block1', true) || formInstance.isValid('block2', true)) {
    $('.invalid-form-error-message').html('');
    return;
  }
  // else stop form submission
  formInstance.submitEvent.preventDefault();

  // and display a gentle message
  $('.invalid-form-error-message')
    .html("You must correctly fill the fields of at least one of these two blocks!")
    .addClass("filled");
  return;
  });
});