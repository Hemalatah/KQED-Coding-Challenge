var express = require('express');
var router = express.Router();
var movies = require('../geo_movie.json');
var memoHash = {};

router.get('/', function(req, res, next) {
    res.render('index', { title: 'SF Movies' });
});

router.get('/json/director', function(req, res) {
    if(!req.query.name) return res.json({});

    var directorParam = (req.query.name) ? req.query.name.toLowerCase() : '';

    var uniqueList = {};
    var filteredMovieArray = movies
    .filter(function (movieObj) {
        if(movieObj.director.indexOf(directorParam) === 0 && Object.keys(uniqueList).length <=10) {
        uniqueList[movieObj.director] = true; 
        return true;
        }
    });

    res.json({
    directors: Object.keys(uniqueList),
    data: filteredMovieArray
    });
});

router.get('/json/titles', function(req, res) {
    if(!req.query.name) return res.json({});

    var titleName = (req.query.name) ? req.query.name.toLowerCase() : '';
    console.log(titleName);

    var uniqueList = {};
    var filteredMovieArray = movies
    .filter(function (movieObj) {
        if (movieObj.title.indexOf(titleName) === 0 && Object.keys(uniqueList).length <=10){
        uniqueList[movieObj.title] = true;
        return true;
        }
    });
    
    res.json({
    titles: Object.keys(uniqueList),
    data: filteredMovieArray
    });
    console.log(res.headersSent);
});

module.exports = router;