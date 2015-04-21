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
    