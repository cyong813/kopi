var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Bookmark = require('../models/Bookmark');
var Cafe = require('../models/Cafe');
var Drink = require('../models/Drink');

// https://github.com/umairraslam/expense-manager-mern/blob/master/server/routes/routes.js
router.get('/', function(req, res){
  res.render('index');
});

router.route('/addBookmark')
.post(function(req,res) {
    var bookmark = new Bookmark();
    bookmark.item = req.body.item;

    bookmark.save(function(err) {
        if (err) res.send(err);
        res.send('Bookmark successfully added!');
    });
})

router.route('/addCafe')
.post(function(req,res) {
    var cafe = new Cafe();
    cafe.cafe_name = req.body.name;

    cafe.save(function(err) {
        if (err) res.send(err);
        res.send('Cafe successfully added!');
    });
})

router.get('/deleteBookmark', function(req, res){
    var id = req.query.id;
    Bookmark.find({_id: id}).deleteOne().exec(function(err, bookmark) {
        if (err) res.send(err)
        res.send('Bookmark successfully deleted!');
    })
});

router.get('/getAllBookmarks',function(req, res) {
    Bookmark.find(function(err, bookmarks) {
        if (err) res.send(err);
        res.json(bookmarks);
    });
});

router.get('/getAllCafes',function(req, res) {
    Cafe.find(function(err, cafes) {
        if (err) res.send(err);
        res.json(cafes);
    });
});

router.get('/getAllDrinks',function(req, res) {
    Drink.find(function(err, drinks) {
        if (err) res.send(err);
        res.json(drinks);
    });
});

module.exports = router;