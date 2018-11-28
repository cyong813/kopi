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
                res.status(401).send({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successfully created a new user.'});
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
.post(passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
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
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
})

router.route('/addDrinkBookmark')
.post(passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
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
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }    
})

router.get('/deleteBookmark', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
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
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
});

router.get('/getAllDrinkBookmarks', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        DrinkBookmark.find(function(err, dbookmarks) {
            if (err) res.send(err);
            res.json(dbookmarks);
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
});

router.get('/getAllCafeBookmarks', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        CafeBookmark.find(function(err, cbookmarks) {
            if (err) res.send(err);
            res.json(cbookmarks);
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
});

router.get('/getAllCafes', passport.authenticate('jwt', { session: false}), function(req, res) {
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

router.get('/getAllDrinks', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Drink.find(function(err, drinks) {
            if (err) res.send(err);
            res.json(drinks);
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
});

getToken = function (headers) {
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