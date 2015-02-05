/**  
 * Tests from search.js: Checks, if the search is working correctly
 */
describe('The search', function() {

  beforeEach(function() {
    loadFixtures('search.html', 'tableContainer.html');
  });

  afterEach(function() {

  });

  it('is evoked by some user input', function() {
    spyOn(window, "showModels");

    $('#search').val("hello");
    $('#search').trigger('input');
    expect(showModels).toHaveBeenCalledWith("hello");
  });

  it('sends the user input to a script on the server', function() {
    spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
    spyOn(XMLHttpRequest.prototype, 'send');

    showModels("hello");
    expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith("POST","../php/getmodels.php",true);
    expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
  });

  it('does not display any information if the script is not found', function() {
    showModels("hello");
    expect($("#table-container")[0]).toBeEmpty();
  });


}); 
    