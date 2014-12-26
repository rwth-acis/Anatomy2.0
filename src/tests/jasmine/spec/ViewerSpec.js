/**  
 * Tests from viewer.js: Checks, if messages concerning the location of the 
 * model are sent and processed correctly. Tests also, if stopping/restarting 
 * model synchronization works.
 */
describe('The viewer', function() {

  var position = {x: 0, y: 0, z: 0};
  var orientation = [{x: 0, y: 0, z: 0}, 0];
  var event = {
    position: position, 
    orientation: orientation,
    target: window
  };
  
  beforeEach(function() {
    loadFixtures('debugText.html', 'viewerObject.html');
  });

  afterEach(function() {
    isEmbeddedInRole = false;
    processingMessage = false;
    isSynchronized = true;
    canSend = true;
  });

  it('receives a message that it needs to update the camera\'s viewpoint',
      function() {
        var extras = {position: position, orientation: orientation};
        spyOn(window, 'printPositionAndOrientation').and.callThrough();

        receiveViewpointMsg(extras);
        expect(printPositionAndOrientation).toHaveBeenCalledWith('Received', 
            {x: 0, y: 0, z: 0}, [{x: 0, y: 0, z: 0}, 0]);
        expect($('#viewport').attr('position')).toEqual('0.0000 0.0000 0.0000');
        expect($('#viewport').attr('orientation')).toEqual('0.0000 0.0000 ' + 
            '0.0000 0.0000');
        expect(reenableViewpointListeningTimeout).toBeDefined();
  }); 
  
  it('wants to send position and orientation but is not embedded in ROLE',
      function() {
        spyOn(roleWrapper, 'postMessage');

        sendPositionAndOrientation(position, orientation);
        expect(roleWrapper.postMessage).not.toHaveBeenCalled();
  });

  it('sends position and orientation when it is embedded in ROLE', function() {
    isEmbeddedInRole = true;
    spyOn(roleWrapper, 'postMessage');

    sendPositionAndOrientation(position, orientation);
    expect(roleWrapper.postMessage).toHaveBeenCalledWith(
        'ViewpointUpdate {"position":{"x":0,"y":0,"z":0},"' +
        'orientation":[{"x":0,"y":0,"z":0},0]}', '*');
  });

  it('does not send its position and orientation when it is currently ' +
      'processing another message', function() {
    processingMessage = true;
    spyOn(window, 'sendPositionAndOrientation');
    spyOn(window, 'printPositionAndOrientation');

    viewpointChanged(event);
    expect(sendPositionAndOrientation).not.toHaveBeenCalled();
    expect(printPositionAndOrientation).not.toHaveBeenCalled();
  });

  it('does not send its position and orientation when it is currently ' +
      'not synchronized with other widgets', function() {
    isSynchronized = false;
    spyOn(window, 'sendPositionAndOrientation');
    spyOn(window, 'printPositionAndOrientation');

    viewpointChanged(event);
    expect(sendPositionAndOrientation).not.toHaveBeenCalled();
    expect(printPositionAndOrientation).not.toHaveBeenCalled();
  });

  it('does not send its position and orientation when it has sent the ' + 
     'information recently', function() {
    canSend = false;
    spyOn(window, 'sendPositionAndOrientation');
    spyOn(window, 'printPositionAndOrientation');

    viewpointChanged(event);
    expect($('#debugText')).toHaveText('Bypassing send!');
    expect(sendPositionAndOrientation).not.toHaveBeenCalled();
    expect(printPositionAndOrientation).not.toHaveBeenCalled();
  });

  it('does send its position and orientation when it is not processing ' +
      'another message, is synchronized with other widgets and a certain time' + 
      ' has passed', function() {
    spyOn(window, 'sendPositionAndOrientation');
    spyOn(window, 'printPositionAndOrientation');
    jasmine.clock().install();

    viewpointChanged(event);
    expect(sendPositionAndOrientation).toHaveBeenCalledWith(
        {x: 0, y: 0, z: 0}, [{x: 0, y: 0, z: 0}, 0]);
    expect(printPositionAndOrientation).toHaveBeenCalledWith('Updated',
        {x: 0, y: 0, z: 0}, [{x: 0, y: 0, z: 0}, 0]);

    // New message can be sent 101 ms after the last message at the earliest
    expect(canSend).not.toBeTruthy();
    jasmine.clock().tick(101);
    expect($('#debugText')).toHaveText('Can send again!');
    expect(canSend).toBeTruthy();
    jasmine.clock().uninstall();
  });

  it('updates the model\'s location with the last one sent from another widget',
      function() {
        posAndOrient = {position: position, orientation: orientation};
        spyOn(window, 'printPositionAndOrientation').and.callThrough();
        spyOn(document.getElementById('viewport'), 'setAttribute');
        jasmine.clock().install();

        synchronizePositionAndOrientation();
        expect(printPositionAndOrientation).toHaveBeenCalledWith(
            'Re-synchronize', {x: 0, y: 0, z: 0}, [{x: 0, y: 0, z: 0}, 0]);
        expect(posAndOrient).toBeUndefined();
        expect(document.getElementById('viewport').setAttribute.calls.count())
            .toEqual(2);

        // Check that the updates are only sent 100 ms after the 
        // resynchronization to avoid 'ping-pong'
        expect(processingMessage).toBeTruthy();
        jasmine.clock().tick(101);
        expect(processingMessage).not.toBeTruthy();
        jasmine.clock().uninstall();

  });
});