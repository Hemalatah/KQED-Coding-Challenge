var fs = require("fs");
var geocoder = require('geocoder');
var movieData = require('./sf-movie.json');
var async = require('async');


var movies = movieData.data.map(function (movie) {
  return {
    director: movie[14].toLowerCase(),
    title: movie[8].toLowerCase(),
    location: movie[10] && movie[10].toLowerCase()
  };
});

var asyncCallbacks = [];
movies.forEach(function(movie, index) {
	asyncCallbacks.push(function(callback){
		// actual geocoding happens
		geocoder.geocode(movies[index].location + " San Francisco, CA", function(err, data){
			// debugger to set the breakpoint after this line
			if(err) debugger;;
			if(!data.results[0]) debugger;
			movies[index].lat = data.results[0].geometry.location.lat;
			movies[index].lng = data.results[0].geometry.location.lng;

			// set timeout to avoid exceeding API rate limit
			setTimeout(function(){
				callback(null);
			},160);
		});
	});	
});

// write the geo_movie.json file with the geolocation found from above geocoding
async.series(asyncCallbacks, function(err, results){
	fs.writeFile('geo_movie.json', JSON.stringify(movies),  function(err) {
	   if (err) {
	       return console.error(err);
	   }
	});
});