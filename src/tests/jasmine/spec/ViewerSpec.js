/**  
 * Tests from viewer.js: 
 */
describe('The viewer', function() {
    
  var position = {x: 0, y: 0, z: 0};
  var orientation = [{x: 0, y: 0, z: 0}, 0];
  var event = {
    position: position, 
    orientation: orientation,
    target: window
  };
  
  afterAll(function() {
    isEmbeddedInRole = false;
  });

  // Does not work because of access to elements that aren't available on site
  xit('receives a message that it needs to update the camera\'s viewpoint',
      function() {
        var extras = {position: position, orientation: orientation};
        spyOn(window, 'printPositionAndOrientation');

        receiveViewpointMsg(extras);
        expect(printPositionAndOrientation).toHaveBeenCalledWith('Received', 
            {x: 0, y: 0, z: 0}, [{x: 0, y: 0, z: 0}, 0]);
        expect(reenableViewpointListeningTimeout).toBeDefined();
  }); 
  
  it('wants to send position and orientation but is not embedded in ROLE',
      function() {
        isEmbeddedInRole = false;
        spyOn(roleWrapper, 'postMessage');

        sendPositionAndOrientation(position, orientation);
        expect(roleWrapper.postMessage).not.toHaveBeenCalled();
  });

  it('sends position and orientation when it is embedded in ROLE',
      function() {
        isEmbeddedInRole = true;
        spyOn(roleWrapper, 'postMessage');

        sendPositionAndOrientation(position, orientation);
        expect(roleWrapper.postMessage).toHaveBeenCalledWith(
            'ViewpointUpdate {"position":{"x":0,"y":0,"z":0},"' +
            'orientation":[{"x":0,"y":0,"z":0},0]}', '*');
  });

  it('does not send its position and orientation when it is currently ' +
      'processing another message',
      function() {
        processingMessage = true;
        spyOn(window, 'sendPositionAndOrientation');
        spyOn(window, 'printPositionAndOrientation');

        viewpointChanged(event);
        expect(sendPositionAndOrientation).not.toHaveBeenCalled();
        expect(printPositionAndOrientation).not.toHaveBeenCalled();
  });

  it('does send its position and orientation when it is not processing ' +
      'another message',
      function() {
        processingMessage = false;
        spyOn(window, 'sendPositionAndOrientation');
        spyOn(window, 'printPositionAndOrientation');

        viewpointChanged(event);
        expect(sendPositionAndOrientation).toHaveBeenCalledWith(
            {x: 0, y: 0, z: 0}, [{x: 0, y: 0, z: 0}, 0]);
        expect(printPositionAndOrientation).toHaveBeenCalledWith('Updated',
            {x: 0, y: 0, z: 0}, [{x: 0, y: 0, z: 0}, 0]);
  });

});