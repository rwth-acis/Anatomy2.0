/**
 * Tests from init-subsite.js:
 */
describe('The subsite', function() {
    
  afterEach(function () {
    isEmbeddedInRole = false;
  });

  it('receives a message that it is embedded in ROLE', function() {
    var event = {data: 'EmbeddedInRole This is embedded in ROLE'};
        
    expect(isEmbeddedInRole).not.toBeTruthy();
    receiveMessage(event);
    expect(isEmbeddedInRole).toBeTruthy();
  });

  it('receives a message that the camera\'s viewpoint needs to be updated',
      function() {
        var event = {data: 'ViewpointUpdate 1'};
        spyOn(window, 'receiveViewpointMsg');

        receiveMessage(event);
        expect(isEmbeddedInRole).not.toBeTruthy();
        expect(window.receiveViewpointMsg).toHaveBeenCalledWith(1);
  });

  it('handles messages with an unknown topic', function() {
    var event = {data: 'bla blub'};
    spyOn(console, 'info');

    receiveMessage(event);
    expect(isEmbeddedInRole).not.toBeTruthy();
    expect(console.info).toHaveBeenCalledWith('Subsite: received unknown ' + 
        'message', 'bla blub');
  });

  it('handles empty messages', function() {
    var event = {data: ''};
    spyOn(console, 'info');

    receiveMessage(event);
    expect(isEmbeddedInRole).not.toBeTruthy();
    expect(console.info).toHaveBeenCalledWith('Subsite: received unknown ' + 
        'message', '');
  });

});