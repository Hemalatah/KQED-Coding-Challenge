var assert = require('assert');
var supertest = require("supertest");
var should = require("should");
var app = require('../app.js');
var request = require('supertest')(app);

// UNIT test begin

describe("Home page test",function(){

  // should return 200 for homepage
  // given the data as 'a'

  it("should return home query parameter",function(done){

    // calling home page api
    request
    .get("/")
    .expect(200)
    .end(function (err, res) {
    	res.status.should.equal(200);
    	done();
    }) 
  });
});


describe("Search movie name API test - no match test",function(){


  it("should return true",function(done){

    // calling movie title api
    request
    .get("/api/titles?name=@!#")
    .type('json')
    .set('Accept', 'application/json')
    .set('Connection', 'keep-alive')
    .expect(200)
    .expect("Content-Type",/json/)
    .end(function(err, res){
    	res.status.should.equal(200);
    	assert.deepEqual(res.body, {"titles":[],"data":[]})
    	done();
    });
  });
});


describe("Search title name API test - unique movie name",function(){


  it("should return true",function(done){
    request
    .get("/api/titles?name=vertigo")
    .type('json')
    .set('Accept', 'application/json')
    .set('Connection', 'keep-alive')
    .expect(200)
    .expect("Content-Type",/json/)
    .end(function(err, res){
    	res.status.should.equal(200);
		assert.deepEqual(res.body.titles, [ 'vertigo' ]);
    	done();
    });
  });
});

describe("Search director name API test - data",function(){


  it("should return true",function(done){
    request
    .get("/api/titles?name=vertigo")
    .type('json')
    .set('Accept', 'application/json')
    .set('Connection', 'keep-alive')
    .expect(200)
    .expect("Content-Type",/json/)
    .end(function(err, res){
    	res.status.should.equal(200);
		assert.deepEqual(res.body.data, [{"director":"alfred hitchcock","title":"vertigo","location":"york hotel (940 sutter street)","lat":37.7885964,"lng":-122.4160149},
			{"director":"alfred hitchcock","title":"vertigo","location":"palace of fine arts (3301 lyon street)","lat":37.8028993,"lng":-122.4487738},{
				"director":"alfred hitchcock","title":"vertigo","location":"san francisco drydock (20th and illinois streets)","lat":37.7567826,"lng":-122.3872055},
				{"director":"alfred hitchcock","title":"vertigo","location":"park hill sanatorium (351 buena vista avenue east)","lat":37.766883,"lng":-122.439604},
				{"director":"alfred hitchcock","title":"vertigo","location":"mission san juan bautista (2nd & mariposa streets)","lat":37.76364299999999,"lng":-122.4005248},
				{"director":"alfred hitchcock","title":"vertigo","location":"mission delores (3321 16th street, mision district)","lat":37.7643856,"lng":-122.4275673},
				{"director":"alfred hitchcock","title":"vertigo","location":"gough & eddy streets (western addition)","lat":37.7824876,"lng":-122.4241111},
				{"director":"alfred hitchcock","title":"vertigo","location":"fort point (presidio, golden gate national recreation area)","lat":37.7749295,"lng":-122.4194155},
				{"director":"alfred hitchcock","title":"vertigo","location":"fairmont hotel (950 mason street, nob hill)","lat":37.7924959,"lng":-122.4100354},
				{"director":"alfred hitchcock","title":"vertigo","location":"ernie's restaurant (847 montgomery street)","lat":37.7969655,"lng":-122.4036577},
				{"director":"alfred hitchcock","title":"vertigo","location":"conservatory of flowers (golden gate park)","lat":37.772614,"lng":-122.460253},
				{"director":"alfred hitchcock","title":"vertigo","location":"claude lane at bush street","lat":37.7907052,"lng":-122.4044457},
				{"director":"alfred hitchcock","title":"vertigo","location":"california palace of the legion of honor (34th avenue & clement, lincoln park)","lat":37.7749295,"lng":-122.4194155},
				{"director":"alfred hitchcock","title":"vertigo","location":"brocklebank apartments (1000 mason street)","lat":37.793093,"lng":-122.4105585},
				{"director":"alfred hitchcock","title":"vertigo","location":"900 lombard street","lat":37.8024756,"lng":-122.4166335},
				{"director":"alfred hitchcock","title":"vertigo","location":"1007 gough street","lat":37.7825465,"lng":-122.4241446}]);
    	done();
    });
  });
});
