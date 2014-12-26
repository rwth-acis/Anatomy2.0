/**  
 * Tests from menuToolbar.js: Checks, if all functionality implemented in the 
 * toolbar is working correctly
 */
describe('The toolbar', function() {

  var position = {x: 0, y: 0, z: 0};
  var orientation = [{x: 0, y: 0, z: 0}, 0];
  var event = {
    position: position, 
    orientation: orientation,
    target: window
  };
  
  beforeEach(function() {
    loadFixtures('btnSynchronize.html', 'viewModeSelect.html');
  });

  afterEach(function() {
    isSynchronized = true;
  });

  it('sets the viewer mode to "Examine" at the beginning', function() {
    expect($('#optionExamine').attr('selected')).toBeTruthy();
  });

  describe('un/synchronize button', function() {
    it('unsynchronizes the model when clicked', function() {
      spyOn(window, 'savePositionAndOrientation');
      spyOn(window, 'synchronizePositionAndOrientation');

      $('#btnSynchronize').click();
      expect(savePositionAndOrientation).toHaveBeenCalled();
      expect(synchronizePositionAndOrientation).not.toHaveBeenCalled();
      expect($('#btnSynchronize').html()).toEqual('Synchronize');
      expect(isSynchronized).not.toBeTruthy();
    }); 
    
    it('synchronizes the model when clicked again', function() {
      isSynchronized = false;
      spyOn(window, 'savePositionAndOrientation');
      spyOn(window, 'synchronizePositionAndOrientation');

      $('#btnSynchronize').click();
      expect(savePositionAndOrientation).not.toHaveBeenCalled();
      expect(synchronizePositionAndOrientation).toHaveBeenCalled();
      expect($('#btnSynchronize').html()).toEqual('Unsynchronize');
      expect(isSynchronized).toBeTruthy();
    }); 
  });

});