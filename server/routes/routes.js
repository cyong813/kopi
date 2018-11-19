var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Bookmark = require('../models/Bookmark');

router.get('/', function(req, res){
  res.render('index')
});

router.route('/add')
.post(function(req,res) {
    var bookmark = new Bookmark();
    bookmark.item = req.body.item;

    bookmark.save(function(err) {
        if (err) res.send(err);
        res.send('Bookmark successfully added!');
    });
})

router.get('/delete', function(req, res){
    var id = req.query.id;
    Bookmark.find({_id: id}).remove().exec(function(err, bookmark) {
        if (err) res.send(err)
        res.send('Bookmark successfully deleted!');
    })
});

router.get('/bookmarks',function(req, res) {
    Bookmark.find(function(err, bookmarks) {
        if (err) res.send(err);
        res.json(bookmarks);
    });
});

module.exports = router;