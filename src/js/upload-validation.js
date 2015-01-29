/**
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