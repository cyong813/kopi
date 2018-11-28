var express = require('express');
var router = express.Router();
var DrinkBookmark = require('../models/DrinkBookmark');
var CafeBookmark = require('../models/CafeBookmark');
var Cafe = require('../models/Cafe');
var Drink = require('../models/Drink');

// ref: https://github.com/umairraslam/expense-manager-mern/blob/master/server/routes/routes.js

router.get('/', function(req, res){
  res.render('index');
});

router.route('/addCafeBookmark')
.post(function(req,res) {
    // check if bookmark is empty
    if (req.body.cafe_name != '') {
        var cafeBookmark = new CafeBookmark();
        cafeBookmark.cafe_name = req.body.cafe_name;
        
        // check for dup cafe bookmark
        CafeBookmark.findOne({cafe_name: req.body.cafe_name}, (err, result) => {
            if (result) {
                res.send('You bookmarked this already!')
            }
            else {
                // check if cafe exists in Cafe schema
                Cafe.findOne({cafe_name: req.body.cafe_name}, (err, result) => {
                    if (result) {
                        cafeBookmark.save(function(cerr) {
                            if (cerr) res.send(cerr);
                            res.send('Cafe successfully added!');
                        });
                    }
                    else {
                        res.send('Not a valid cafe.')
                    }
                });
            }
        });

    }
    else {
        res.send('Cannot add an empty bookmark. Please try again.');
    }
})

router.route('/addDrinkBookmark')
.post(function(req,res) {
    // check if bookmark is empty
    if (req.body.drink_name != '') {
        var drinkBookmark = new DrinkBookmark();
        drinkBookmark.drink_name = req.body.drink_name;
        
        // check for dup drink bookmark
        DrinkBookmark.findOne({drink_name: req.body.drink_name}, (err, result) => {
            if (result) {
                res.send('You bookmarked this already!')
            }
            else {
                // check if drink exists in Drink schema
                Drink.findOne({drink_name: req.body.drink_name}, (err, result) => {
                    if (result) {
                        drinkBookmark.save(function(derr) {
                            if (derr) res.send(derr);
                            res.send('Drink successfully added!');
                        });
                    }
                    else {
                        res.send('Not a valid drink.')
                    }
                });
            }
        });

    }
    else {
        res.send('Cannot add an empty bookmark. Please try again.');
    }
    // check if bookmark is a drink or cafe prior to adding?
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
    // find in drink or cafe bookmark, then delete
    DrinkBookmark.findOne({_id: id}, (err, result) => {
        if (result) {
            DrinkBookmark.find({_id: id}).deleteOne().exec(function(err, dbookmark) {
                if (err) res.send(err)
                if (dbookmark) {
                    res.send('Drink successfully removed!');
                }
            });
        }
    });
    CafeBookmark.findOne({_id: id}, (err, result) => {
        if (result) {
            CafeBookmark.find({_id: id}).deleteOne().exec(function(err, cbookmark) {
                if (err) res.send(err)
                if (cbookmark) {
                    res.send('Cafe successfully removed!');
                }
            });
        }
    });
});

router.get('/getAllDrinkBookmarks',function(req, res) {
    DrinkBookmark.find(function(err, dbookmarks) {
        if (err) res.send(err);
        res.json(dbookmarks);
    });
});

router.get('/getAllCafeBookmarks',function(req, res) {
    CafeBookmark.find(function(err, cbookmarks) {
        if (err) res.send(err);
        res.json(cbookmarks);
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