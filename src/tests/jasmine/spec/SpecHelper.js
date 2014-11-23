//Example for compare helper:

function getNumberParameters(obj){
    //get number of properties in QueryString
    var size = 0
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)){
	    if(key != ""){
		size++;
	    }
	}
    }
    return size;
}

// beforeEach(function () {
//   jasmine.addMatchers({
//     toBePlaying: function () {
//       return {
//         compare: function (actual, expected) {
//           var player = actual;

//           return {
//             pass: player.currentlyPlayingSong === expected && player.isPlaying
//           }
//         }
//       };
//     }
//   });
// });
