/**
 * Tests from init-subsite.js:
 */
describe('The subsite', function() {
  
  beforeEach(function() {
    spyOn(window, 'receiveViewpointMsg');
    spyOn(console, 'info');
  });

  // Reset variable(s)
  afterEach(function() {
    isEmbeddedInRole = false;
  });

  it('receives a message that it is embedded in ROLE', function() {
    var event = {data: 'EmbeddedInRole This is embedded in ROLE'};
        
    expect(isEmbeddedInRole).not.toBeTruthy();
    receiveMessage(event);
    
    expect(isEmbeddedInRole).toBeTruthy();
    expect(window.receiveViewpointMsg).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
  });

  it('receives a message that the camera\'s viewpoint needs to be updated',
      function() {
        var event = {data: 'ViewpointUpdate 1'};
        receiveMessage(event);

        expect(isEmbeddedInRole).not.toBeTruthy();
        expect(window.receiveViewpointMsg).toHaveBeenCalledWith(1);
        expect(console.info).not.toHaveBeenCalled();
  });

  it('handles messages with an unknown topic', function() {
    var event = {data: 'test'};
    receiveMessage(event);

    expect(isEmbeddedInRole).not.toBeTruthy();
    expect(window.receiveViewpointMsg).not.toHaveBeenCalled();
    expect(console.info).toHaveBeenCalledWith('Subsite: received unknown ' + 
        'message', 'test');
  });

  it('handles empty messages', function() {
    var event = {data: ''};

    receiveMessage(event);
    expect(isEmbeddedInRole).not.toBeTruthy();
    expect(window.receiveViewpointMsg).not.toHaveBeenCalled();
    expect(console.info).toHaveBeenCalledWith('Subsite: received unknown ' + 
        'message', '');
  });

});