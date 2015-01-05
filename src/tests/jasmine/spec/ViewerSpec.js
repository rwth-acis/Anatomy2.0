/**  
 * Tests from viewer.js: Checks, if messages concerning the location of the 
 * model are sent and processed correctly. Tests also, if stopping/restarting 
 * model synchronization works.
 */
describe('The viewer', function() {
    
  var posMat = new x3dom.fields.SFMatrix4f(1, 0, 0, 1, 
                                       0, 1, 0, -0.5, 
                                       0, 0, 1, 0, 
                                       0, 0, 0, 1);
  var rotMat = x3dom.fields.SFMatrix4f.identity();
  var view = {posMat: posMat, rotMat: rotMat};
  var event = {target: window};

  afterAll(function() {
    isEmbeddedInRole = false;
    canSend = false;
  });

  // Does not work because of access to elements that aren't available on site
  it('receives a message that it needs to update the camera\'s viewpoint',
      function() {
        var extras = {position: posMat, orientation: rotMat};
        spyOn(window, 'setView');

        receiveViewpointMsg(extras);
        expect(setView).toHaveBeenCalled();
  }); 
  
  it('wants to send position and orientation but is not embedded in ROLE',
      function() {
        isEmbeddedInRole = false;
        spyOn(roleWrapper, 'postMessage');

        sendPositionAndOrientation();
        expect(roleWrapper.postMessage).not.toHaveBeenCalled();
  });

  it('sends position and orientation when it is embedded in ROLE',
      function() {
        isEmbeddedInRole = true;
        spyOn(roleWrapper, 'postMessage');

        // Allows to check if/how often the method is called but it does not get
        // executed. Return a test value instead
        spyOn(window, 'getView').and.returnValue(view);

        sendPositionAndOrientation();
        expect(getView).toHaveBeenCalled();
        expect(roleWrapper.postMessage).toHaveBeenCalledWith('ViewpointUpdate' + 
            ' {"posMat":{"_00":1,"_01":0,"_02":0,"_03":1,"_10":0,"_11":1,' + 
            '"_12":0,"_13":-0.5,"_20":0,"_21":0,"_22":1,"_23":0,"_30":0,' + 
            '"_31":0,"_32":0,"_33":1},' +
            '"rotMat":{"_00":1,"_01":0,"_02":0,"_03":0,"_10":0,"_11":1,' + 
            '"_12":0,"_13":0,"_20":0,"_21":0,"_22":1,"_23":0,"_30":0,"_31":0,' +
            '"_32":0,"_33":1}}', '*');
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
	      canSend = true;
        spyOn(window, 'sendPositionAndOrientation');
        spyOn(window, 'printPositionAndOrientation');
        spyOn(window, 'getView').and.returnValue(view);
        spyOn(console, 'info');

        viewpointChanged(event);
        expect(sendPositionAndOrientation).toHaveBeenCalled();
        //expect(printPositionAndOrientation).toHaveBeenCalledWith('Updated',
        //    {x: 0, y: 0, z: 0}, [{x: 0, y: 0, z: 0}, 0]);
        expect(getView).toHaveBeenCalled();

        var intent = console.info.calls.argsFor(0)[1];
        expect(intent.extras.posMat).toEqual(posMat);
        expect(intent.extras.rotMat).toEqual(rotMat);

  });

});
