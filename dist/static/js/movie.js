$(document).ready(function(){
	
	// list of google map markers
	var markers = [];

	var infowindow;

	var searchByMovie = true;

	var resultsContainer = $('[data-container=results]');

	var titleParam = $('[data-query-param="title_name"]');

	// generate info window template
	function createInfoWindowContent(director, title, location) {
		var contentString = 
			'<div class = "text-capitalize">'+ "Movie: " + title + ', </div>' + 
			'<div class = "text-capitalize">'+ "Directed By: " + director + ', </div>' + 
			'<div class = "text-capitalize">'+ "Location: " + location + ", San Francisco, CA" + '.</div>';
		return contentString;
	}

	// add markers and info windows in the map
	function addMarker(result, option) {
		infowindow = new google.maps.InfoWindow();

		var marker = new google.maps.Marker({
		    position: {
		    	lat: result.lat,
		    	lng: result.lng
		    },
		    map: map,
		    title: option === "director" ? result.director : result.title
		});

		markers.push(marker);

		marker.addListener('click', function() {
			infowindow.setContent('');
			infowindow.close(infowindow);
		    infowindow.setContent(createInfoWindowContent(result.director, 
		   		result.title, result.location));
			infowindow.open(map, marker);
		 });

		// close the infowindow when clicked anywhere else
		map.addListener('click', function(){
		    infowindow.close(infowindow);
		    infowindow.marker = null;
		});

		// Recenter map upon window resize
		google.maps.event.addDomListener(window, 'resize', function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, 'resize');
			map.setCenter(center);
		});

		//set infowindow
		map.panTo(marker.position);
		//pan down infowindow by 200px to keep whole infowindow on screen
		map.panBy(0, -100);
	}

	function loadMap() {
		var src = "{{#each titles}}" + 
	      		  "<li><a class = 'text-capitalize' href='#''>{{this}}</a></li>" +
	      		  "{{/each}}";

		var resultsTemplate = Handlebars.compile(src);
		$.ajax({
			url: '/json/titles',
			data: {
				name: 'a'
			},
			method: 'GET',
			success: function (jsonResponse) {
				var tableHtml = resultsTemplate({
					titles: jsonResponse.titles
				});
				resultsContainer.html(tableHtml)
				resultsContainer.show();

				markers.forEach(function (marker) {
					marker.setMap(null);
				});
				markers = [];
				
				if(jsonResponse.data && jsonResponse.data.length > 0) {
					jsonResponse.data.forEach(function (result){
						addMarker(result, "title");
					});	
				} else {
					resultsContainer.hide();
				}
			},
			error: function (err) {
				//TODO
			}
		});
	};

	$.when().then( function() {
		// make sure all the already opened infowindow are closed
		console.log(infowindow);
		if (infowindow) {
			infowindow.close(infowindow);
		}
		loadMap();
	});

	// refresh the saerch button
	$(".remove").on('click', function() {
		$('input').val('');
		loadMap();
	});


	//event trigger for search by title and call titles public api
	titleParam.keyup(function(event) {

		var src = "{{#each titles}}" + 
	      		  "<li><a class = 'text-capitalize' href='#''>{{this}}</a></li>" +
	      		  "{{/each}}";

		var resultsTemplate = Handlebars.compile(src);
		$.ajax({
			url: '/json/titles',
			data: {
				name: titleParam.val()
			},
			method: 'GET',
			success: function (jsonResponse) {
				var tableHtml = resultsTemplate({
					titles: jsonResponse.titles
				});
				resultsContainer.html(tableHtml)
				resultsContainer.show();

				markers.forEach(function (marker) {
					marker.setMap(null);
				});
				markers = [];
				
				if(jsonResponse.data && jsonResponse.data.length > 0) {
					jsonResponse.data.forEach(function (result){
						addMarker(result, "title");
					});	
				} else {
					resultsContainer.hide();
				}
			},
			error: function (err) {
				//TODO
			}
		});
	});	

	//Display selected auto complete pins
	resultsContainer.on('click', 'li', function (event) {
		var title = $(event.target).text();
		titleParam.val(title);
		markers.forEach(function (marker) {
			if (marker.title !== title) {
				marker.setMap(null);
			}
		resultsContainer.hide();
		});
	}); 
});