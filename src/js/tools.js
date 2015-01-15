/**
 * @file tools.js
 * File for some java script helper functions that are generally useful
 */

/**
 * Wrapper for getting the location url (necessary to test with given input data, see spyon in Jasmine)
 */
get_location = {
    /**
     * Get the url string
     * @return url as string
     */
    search: function(){
	return window.location.search;
    }
}

/**
 * Get the query string to access url parameters
 * @return object containing all query variables
 */
function getQueryString() {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = get_location.search().substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
}

///initialized QueryString by default
var QueryString = getQueryString();

/**
 * Gets the URL parameter value for a given name
 *@param name Name of a URL parameter
 */
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

/**
 * Used in menuToolbar.js
 * @return true, if the page is a widget in ROLE. false, otherwise
 */
function isInRole() {
  return getURLParameter("widget") === "true";
}
