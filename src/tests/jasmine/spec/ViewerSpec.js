/**
 * Tests from viewer.js:
*/
describe("The viewer", function() {
    it("has and id of length 9", function(){
		expect(id).toBeDefined();
		expect(id.length).toEqual(9);
    });

    it("has not yet received a message from another viewer", function(){
		expect(sender).toEqual('');
    });

    it("receives a message from itself and does nothing", function(){
    	var intent = {
    		sender: widget
    	};
    	iwcCallback(intent);
		expect(sender).toEqual('');
	});

});

describe("Viewer when gadgets defined", function() {
	var gadgets =  gadgets || undefined;
	if(gadgets !== undefined) {
		
	    it("The widget should be added to the communication channel", function(){
			expect(iwcClient).toBeDefined();
	    });

	    
	}
});
