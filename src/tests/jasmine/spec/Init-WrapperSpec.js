/**
 * Tests from init-wrapper.js:
 */
describe('The wrapper', function() {
  
  var intent;
  beforeEach(function() {
    intent = getDefaultIntent();
  });

  beforeAll(function() {
    iwcClient = new iwc.Client();
    contentWindow = window;
  });

  afterAll(function() {
    iwcClient = null;
    contentWindow = null;
  });

  it('has and id of length 9', function() {
  	expect(id).toBeDefined();
  	expect(id.length).toEqual(9);
  });

  // Check correct behaviour of iwcCallback
  it('does not update the viewpoint if the received message comes from itself', 
      function() {
	      subscribeTo("testTopic")
	      intent.extras.topic = "testTopic";

        spyOn(contentWindow, 'postMessage');

        iwcCallback(intent);
        expect(contentWindow.postMessage).not.toHaveBeenCalled();
  });

  it('handles messages with an undefined or unknown topic', function() {
    var tmp = widget;
    widget = 'widget';
    spyOn(console, 'log');

    iwcCallback(intent);
    intent.extras.topic = 'SubsiteLoaded';
    iwcCallback(intent);
    expect(console.log.calls.count()).toEqual(1);

    widget = tmp;
  });

  // iwcCallback and receivedViewpointChanged
  it('passes the received viewpoint to the iframe', function() {
    var contentWindow = window;
    var tmp = widget;
    widget = 'widget';
    intent.extras = {
        topic: 'ViewpointUpdate', 
        position: {x:0, y:0, z:0},
        orientation: [{x:0,y:0,z:0},0]
    };
    spyOn(contentWindow, 'postMessage');

    iwcCallback(intent);
    expect(contentWindow.postMessage).toHaveBeenCalledWith('ViewpointUpdate ' +
        '{"topic":"ViewpointUpdate","position":{"x":0,"y":0,"z":0},"' +
        'orientation":[{"x":0,"y":0,"z":0},0]}', '*');
    
    widget = tmp;
  });

  // publishMessage
  it('warns the user if the message to be published is invalid', function() {
    var intent = {};
    spyOn(iwc.util, 'validateIntent');
    spyOn(window, 'alert');

    publishMessage(intent);
    expect(alert).toHaveBeenCalled();
  });

  it('publishes a valid message', function() {
    spyOn(iwcClient, 'publish');

    publishMessage(intent);
    expect(iwcClient.publish).toHaveBeenCalled();
  });

  // getDefaultIntent
  it('creates a valid default intent', function() {
    var tmp = widget;
    widget = 'widget';
    var intent = getDefaultIntent();

    expect(iwc.util.validateIntent(intent)).toBeTruthy();
    expect(intent.sender).toBe(widget);

    widget = tmp;
  });

  //receiveSubsiteMessage

  //publishViewpointChanged

});
