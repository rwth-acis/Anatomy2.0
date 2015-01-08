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

  beforeAll(function() {
    spyOn(console, 'info');
    spyOn(console, 'log');
    spyOn(window, 'log').and.callFake(function() {
      return;
    });
    result = null;
  });

  afterEach(function() {
    isEmbeddedInRole = false;
    processingMessage = false;
    canSend = false;
    posAndOrient = undefined;
    isSynchronized = true;
  });

  it('receives a message that the camera\'s viewpoint of another model\'s ' + 
     'needs to be updated',
      function() {
        var extras = {
            position: posMat, 
            orientation: rotMat, 
            selectedModel: "model1"
        };
        spyOn(window, 'setView');

        onRemoteUpdate(extras);
        expect(setView).not.toHaveBeenCalled();
  }); 

  it('receives a message that it needs to update the camera\'s viewpoint',
      function() {
        var extras = {position: posMat, orientation: rotMat, selectedModel: ""};
	x3dRoot = {runtime: "something"};
        spyOn(window, 'setView');

        onRemoteUpdate(extras);
        expect(setView).toHaveBeenCalled();
  }); 
  
  it('wants to send position and orientation but is not embedded in ROLE',
      function() {
        spyOn(roleWrapper, 'postMessage');

        onLocalUpdate();
        expect(roleWrapper.postMessage).not.toHaveBeenCalled();
  });

  it('sends position and orientation when it is embedded in ROLE',
      function() {
        isEmbeddedInRole = true;
	isSynchronized = true;
	processingMessage = false;
	canSend = true;
        spyOn(roleWrapper, 'postMessage');
	var baseTime = new Date(2013, 9, 23);
	jasmine.clock().mockDate(baseTime);

        // Allows to check if/how often the method is called but it does not get
        // executed. Return a test value instead
        spyOn(window, 'getView').and.returnValue(view);

        onLocalUpdate();
        expect(getView).toHaveBeenCalled();
        expect(roleWrapper.postMessage).toHaveBeenCalledWith('ViewpointUpdate' + 
            ' {"posMat":{"_00":1,"_01":0,"_02":0,"_03":1,"_10":0,"_11":1,' + 
            '"_12":0,"_13":-0.5,"_20":0,"_21":0,"_22":1,"_23":0,"_30":0,' + 
            '"_31":0,"_32":0,"_33":1},' +
            '"rotMat":{"_00":1,"_01":0,"_02":0,"_03":0,"_10":0,"_11":1,' + 
            '"_12":0,"_13":0,"_20":0,"_21":0,"_22":1,"_23":0,"_30":0,"_31":0,' +
            '"_32":0,"_33":1},' +
	    '"timestamp":"2013-10-22T22:00:00.000Z",' +
            '"selectedModel":""}', '*');
  });

  it('does not send its position and orientation when it is currently ' +
      'processing another message',
      function() {
        processingMessage = true;

        viewpointChanged(event);
        expect(log).toHaveBeenCalledWith("Bypassing send!");
  });

  it('does not send its position and orientation when it is currently ' +
      'not synchronized with the other widget(s)',
      function() {
        isSynchronized = false;
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
        spyOn(window, 'getView').and.returnValue(view);
        spyOn(window, 'onLocalUpdate');
        
        viewpointChanged(event);
	  
        expect(onLocalUpdate).toBeDefined();
  });

  it('saves the current location of the model when unsynchronized', function() {
    expect(window.posAndOrient).toBeUndefined();
    spyOn(window, 'getView').and.returnValue(view);
    
    savePositionAndOrientation();
    expect(window.posAndOrient).toEqual(view);
  });

  it('does not change the model\'s current location when no other model sent ' +
     'its location', 
    function() {
      spyOn(window, 'setView');
      
      synchronizePositionAndOrientation();
      expect(setView).not.toHaveBeenCalled();
      expect(posAndOrient).toBeUndefined();
  });

  it('applies the current location of the other model(s) when re-synchronized', 
    function() {
      posAndOrient = view;
      spyOn(window, 'setView');
      
      synchronizePositionAndOrientation();
      expect(setView).toHaveBeenCalledWith(
          new x3dom.fields.SFMatrix4f(1, 0, 0, 1, 
                                      0, 1, 0, -0.5, 
                                      0, 0, 1, 0, 
                                      0, 0, 0, 1),
          x3dom.fields.SFMatrix4f.identity()
      );
      expect(posAndOrient).toBeUndefined();
  });
});
