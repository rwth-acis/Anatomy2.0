/**
 * Tests from init-subsite.js:
 */
describe('The subsite', function() {
  
  beforeEach(function() {
    spyOn(window, 'receiveViewpointMsg');
    spyOn(console, 'info');
    spyOn(console, 'log');
    result = null;
  });

  // Reset variable(s)
  afterEach(function() {
    isEmbeddedInRole = false;
  });

  it('receives a message that was subscribed before', function() {
    subscribeIWC("testTopic", function(extras){result=extras.content});
    
    var msg = {content: 'butterbrot'};
    var event = {data: 'testTopic ' + JSON.stringify(msg)};
    
    receiveMessage(event);
    
    expect(result).toBe("butterbrot");
  });

  it('handles unsubscribed messages', function() {
    subscribeIWC("testTopic", function(extras){result=extras.content});

    var msg = {content: 'wurstbrot'};
    var event = {data: 'wurstTopic ' + JSON.stringify(msg)};
    receiveMessage(event);

    expect(isEmbeddedInRole).not.toBeTruthy();
    expect(result).toBe(null);
    expect(console.log).toHaveBeenCalledWith('Subsite: received unknown ' + 
        'message', 'wurstTopic {"content":"wurstbrot"}');
  });

  it('handles empty messages', function() {
    var event = {data: ''};

    receiveMessage(event);
    expect(isEmbeddedInRole).not.toBeTruthy();
    expect(console.log).toHaveBeenCalledWith('Subsite: received unknown ' + 
        'message', '');
  });

});
