var express = require('express');
var router = express.Router();
var passport = require('passport');
var settings = require('../../config/settings');
require('../../config/passport')(passport);
var jwt = require('jsonwebtoken');
var User = require("../models/User");
var DrinkBookmark = require('../models/DrinkBookmark');
var CafeBookmark = require('../models/CafeBookmark');
var Cafe = require('../models/Cafe');
var Drink = require('../models/Drink');
var ObjectId = require('mongodb').ObjectID;

// ref: https://www.djamware.com/post/5a90c37980aca7059c14297a/securing-mern-stack-web-application-using-passport
router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(401).send({success: false, msg: 'Please enter your username and/or password.'});
    } 
    else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

router.post('/login', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } 
        else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), settings.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } 
                else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Incorrect password.'});
                }
            });
        }
    });
});

// ref: https://github.com/umairraslam/expense-manager-mern/blob/master/server/routes/routes.js

router.get('/', function(req, res){
    res.render('index');
});

router.route('/addCafeBookmark')
.post(passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        // check if bookmark is empty
        if (req.body.cafe_name != '') {
            var cafeBookmark = new CafeBookmark();
            cafeBookmark.user_id = req.user._id;
            cafeBookmark.cafe_name = req.body.cafe_name;
            
            // check for dup cafe bookmark
            CafeBookmark.findOne({user_id: req.user._id, cafe_name: req.body.cafe_name}, (err, result) => {
                if (result) {
                    res.send('You bookmarked this already!');
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
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
})

router.route('/addDrinkBookmark')
.post(passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        // check if bookmark is empty
        if (req.body.drink_name != '') {
            var drinkBookmark = new DrinkBookmark();
            drinkBookmark.user_id = req.user._id;
            drinkBookmark.drink_name = req.body.drink_name;
            
            // check for dup drink bookmark
            DrinkBookmark.findOne({user_id: req.user._id, drink_name: req.body.drink_name}, (err, result) => {
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
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }    
})

router.get('/deleteBookmark', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var id = req.query.id;
        // find in drink or cafe bookmark, then delete
        DrinkBookmark.findOne({user_id: req.user._id, _id: id}, (err, result) => {
            if (result) {
                DrinkBookmark.find({_id: id}).deleteOne().exec(function(err, dbookmark) {
                    if (err) res.send(err)
                    if (dbookmark) {
                        res.send('Drink successfully removed!');
                    }
                });
            }
        });
        CafeBookmark.findOne({user_id: req.user._id, _id: id}, (err, result) => {
            if (result) {
                CafeBookmark.find({user_id: req.user._id, _id: id}).deleteOne().exec(function(err, cbookmark) {
                    if (err) res.send(err)
                    if (cbookmark) {
                        res.send('Cafe successfully removed!');
                    }
                });
            }
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
});

router.get('/api/getAllDrinkBookmarks', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        DrinkBookmark.find({user_id: req.user._id}, function(err, dbookmarks) {
            if (err) res.send(err);
            res.json(dbookmarks);
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/api/getAllCafeBookmarks', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        CafeBookmark.find({user_id: req.user._id}, function(err, cbookmarks) {
            if (err) res.send(err);
            res.json(cbookmarks);
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
});

router.get('/getAllCafes', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Cafe.find(function(err, cafes) {
            if (err) res.send(err);
            res.json(cafes);
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
});

router.get('/api/filteredCafes/', function(req,res) {
    // var token = getToken(req.headers);
    // if (token) {
        if (req.query.query) {
            let parsedFilters = req.query.query.split(',');

            Cafe.find({ filters: {$all: parsedFilters} }, (err, filteredCafes) => {
                if (err) res.send(err);
                else {
                    res.json({filteredCafes});
                }
            });
        }
    // }
    // else {
    //     return res.status(403).send({success: false, msg: 'Unauthorized.'});
    // }
});

router.get('/api/cafe/:cafe_name', function(req, res) {
    // TEMP REMOVED PASSPORT AUTH FOR SAKE OF TESTING
    //var token = getToken(req,headers);
    //if (token) {
        Cafe.findOne({ cafe_name : req.params.cafe_name }, (err, cafe) => {
            if (err) res.send(err);
            CafeBookmark.findOne({ cafe_name: req.params.cafe_name }, (err, bkmk) => {
                if (err) res.send(err);
                res.json({cafe, bkmk}); // returns cafe info and bookmark!
            });
        });
    //}
});

router.get('/getAllCafesPos', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Cafe.find({}, {position: 1, _id: 0}, function(err, cafes) {
            if (err) res.send(err);
            res.json(cafes);
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
});

router.get('/getAllCafeNames', function(req, res) {
    // TEMP REMOVED PASSPORT AUTH FOR SAKE OF TESTING
    // var token = getToken(req.headers);
    // if (token) {
        Cafe.find({}, {cafe_name: 1, _id: 0}, function(err, cafes) {
            if (err) res.send(err);
            res.json(cafes);
        });
    // }
    // else {
    //     return res.status(403).send({success: false, msg: 'Unauthorized.'});
    // }  
});

router.get('/getAllDrinks', function(req, res) {
    // TEMP REMOVED PASSPORT AUTH FOR SAKE OF TESTING
    //var token = getToken(req.headers);
    //if (token) {
        Drink.find(function(err, drinks) {
            if (err) res.send(err);
            res.json(drinks);
        });
    //}
    // else {
    //     return res.status(403).send({success: false, msg: 'Unauthorized.'});
    // }  
});

router.get('/api/drink/:drink_name', function(req, res) {
    // TEMP REMOVED PASSPORT AUTH FOR SAKE OF TESTING
    //var token = getToken(req,headers);
    //if (token) {
        Drink.findOne({ drink_name : req.params.drink_name }, (err, result) => {
            //console.log(req.params.drink_name)
            if (err) res.send(err);
            // Find cafes associated with this drink
            Cafe.find({ drinks: {$elemMatch: {drink_name: result.drink_name}} }, function(err, cafes) {
                if (err) res.send(err);
                DrinkBookmark.findOne({ drink_name: req.params.drink_name }, (err, bkmk) => {
                    if (err) res.send(err);
                    //console.log(bkmk);
                    res.json({cafes, bkmk}); // returns cafes and bookmark!
                });
            })
        });
    //}
});

getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } 
        else {
            return null;
        }
    } 
    else {
        return null;
    }
};

module.exports = router;