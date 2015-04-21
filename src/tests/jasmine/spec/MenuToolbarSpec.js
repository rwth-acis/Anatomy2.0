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
    loadFixtures('btnInfo.html', 'btnSynchronize.html', 'viewModeSelect.html', 
        'metadataOverlay.html', 'viewerObject.html');
  });

  afterEach(function() {
    isSynchronized = true;
  });

  describe('un/synchronize button', function() {
    it('unsynchronizes the viewer widget when clicked', function() {
      spyOn(window, 'savePositionAndOrientation');
      spyOn(window, 'synchronizePositionAndOrientation');
      spyOn(window, 'saveInfoState');
      spyOn(window, 'synchronizeInfoState');

      $('#btnSynchronize').click();
      expect(savePositionAndOrientation).toHaveBeenCalled();
      expect(synchronizePositionAndOrientation).not.toHaveBeenCalled();
      expect(saveInfoState).toHaveBeenCalled();
      expect(synchronizeInfoState).not.toHaveBeenCalled();
      expect($('#btnSynchronize').html()).toEqual('Synchronize');
      expect(isSynchronized).not.toBeTruthy();
    }); 
    
    it('synchronizes the viewer widget when clicked again', function() {
      isSynchronized = false;
      spyOn(window, 'savePositionAndOrientation');
      spyOn(window, 'synchronizePositionAndOrientation');
      spyOn(window, 'saveInfoState');
      spyOn(window, 'synchronizeInfoState');

      $('#btnSynchronize').click();
      expect(savePositionAndOrientation).not.toHaveBeenCalled();
      expect(synchronizePositionAndOrientation).toHaveBeenCalled();
      expect(saveInfoState).not.toHaveBeenCalled();
      expect(synchronizeInfoState).toHaveBeenCalled();
      expect($('#btnSynchronize').html()).toEqual('Unsynchronize');
      expect(isSynchronized).toBeTruthy();
    }); 
  });
  
});