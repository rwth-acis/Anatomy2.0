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
 * Tests from init-subsite.js:
 */
describe('The subsite', function() {
  
  beforeEach(function() {
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
