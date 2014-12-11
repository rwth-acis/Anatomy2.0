/**
 * Tests from tools.js:
*/
describe("Tools", function() {
    it("QuerryString should be computed if the site is loaded and empty if there are no passed arguments", function(){
	expect(getNumberParameters(QueryString)).toEqual(0);
    });

    it("QuerryString should have the right property if the URI ends with &m=knight.x3d", function(){
	//replace get_location.search() with a function that return the specified value
	spyOn(get_location, "search").and.returnValue("?m=knight.x3d");
	QueryString = getQueryString();
	
	expect(getNumberParameters(QueryString)).toEqual(1);
	expect(QueryString.m).toEqual("knight.x3d");
    });

    it("QuerryString should put multiple values of the same parameter into an array", function(){
	//replace get_location.search() with a function that return the specified value
	spyOn(get_location, "search").and.returnValue("?m=knight.x3d&m=balls.x3d");
	QueryString = getQueryString();
	
	expect(getNumberParameters(QueryString)).toEqual(1);
	expect(QueryString.m[0]).toEqual("knight.x3d");
	expect(QueryString.m[1]).toEqual("balls.x3d");
    });

    it("QuerryString should be able to process multiple parameters", function(){
	//replace get_location.search() with a function that return the specified value
	spyOn(get_location, "search").and.returnValue("?m=knight.x3d&n=balls.x3d");
	QueryString = getQueryString();
	
	expect(getNumberParameters(QueryString)).toEqual(2);
	expect(QueryString.m).toEqual("knight.x3d");
	expect(QueryString.n).toEqual("balls.x3d");
    });
});
