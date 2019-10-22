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

// Useful Functions
function containsAll(arr1, arr2) {
    return arr2.map(function (ele) { 
        return arr1.indexOf(ele);
    }).indexOf(-1) == -1;
};

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

router.get('/', function(req, res){
    res.render('index');
});

router.route('/bookmark')
    .delete(passport.authenticate('jwt', { session: false }), function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            const id = req.query.id;
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
    })

    .post(passport.authenticate('jwt', { session: false }), function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            // check for drink name and cafe name
            if ('drink_name' in req.body) {
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
            else if ('cafe_name' in req.body) {
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

    // GET all bookmarks
    // Params: type (cafe, drink)
    .get(passport.authenticate('jwt', { session: false }), function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            const type = req.query.type;
            if (type) {
                if (type === 'drink') {
                    DrinkBookmark.find({user_id: req.user._id}, function(err, dbookmarks) {
                        if (err) res.send(err);
                        res.json(dbookmarks);
                    });
                }
                else if (type === 'cafe') {
                    CafeBookmark.find({user_id: req.user._id}, function(err, cbookmarks) {
                        if (err) res.send(err);
                        res.json(cbookmarks);
                    });
                }
            }
        }
        else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    });

// GET all cafes (or all cafe locations, names, etc.)
// Params: pos, names
router.get('/cafe', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        // user params
        if (req.query.category) {
            let categoryList = req.query.category.split(',');
            if ( containsAll(categoryList, ['names','pos','id']) ) {
                Cafe.find({}, {cafe_name: 1, position: 1, _id: 1}, function(err, cafes) {
                    if (err) res.send(err);
                    res.json(cafes);
                });
            }
            else if ( containsAll(categoryList, ['names','id']) ) {
                if (req.query.sort) {
                    if (req.query.sort === 'names_asc') {
                        Cafe.find({}, {cafe_name: 1, _id: 1}, function(err, cafes) {
                            if (err) res.send(err);
                            res.json(cafes);
                        }).sort( { cafe_name: 1 } );
                    }
                }
                else {
                    Cafe.find({}, {cafe_name: 1, _id: 1}, function(err, cafes) {
                        if (err) res.send(err);
                        res.json(cafes);
                    });
                }
            }
            else if ( containsAll(categoryList, ['names']) ) {
                Cafe.find({}, {cafe_name: 1, _id: 0}, function(err, cafes) {
                    if (err) res.send(err);
                    res.json(cafes);
                });
            }
            else if ( containsAll(categoryList, ['pos']) ) {
                Cafe.find({}, {position: 1, _id: 0}, function(err, cafes) {
                    if (err) res.send(err);
                    res.json(cafes);
                });
            }
        }
        else { // get everything
            Cafe.find(function(err, cafes) {
                if (err) res.send(err);
                res.json(cafes);
            });
        }
    }    
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/filter', passport.authenticate('jwt', { session: false }), function(req,res) {
    var token = getToken(req.headers);
    if (token) {
        if (req.query.filters) {
            let parsedFilters = req.query.filters.split(',');
            let userQuery = '';
            if (req.query.find_query) {
                userQuery = req.query.find_query;
            }
            if (req.query.sort) {
                if (req.query.sort === 'names_asc') {
                    Cafe.find({ filters: {$all: parsedFilters}, cafe_name: {'$regex': userQuery, '$options': 'i' } }, (err, filteredCafes) => {
                        if (err) res.send(err);
                        else {
                            res.json({filteredCafes});
                        }
                    }).sort( {cafe_name: 1} );    
                }
            }
            else {
                Cafe.find({ filters: {$all: parsedFilters}, cafe_name: {'$regex': userQuery, '$options': 'i' } }, (err, filteredCafes) => {
                    if (err) res.send(err);
                    else {
                        res.json({filteredCafes});
                    }
                });
            }
        }
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/search', passport.authenticate('jwt', { session: false }), function(req,res) {
    var token = getToken(req.headers);
    if (token) {
        if (req.query.filters && req.query.find_query) {
            if (req.query.filters.length > 0 && req.query.find_query.length > 0) {
                const parsedFilters = req.query.filters.split(',');
                if (req.query.sort) {
                    if (req.query.sort === 'names_asc') {
                        Cafe.find({ filters: {$all: parsedFilters}, cafe_name: {'$regex': userQuery, '$options': 'i' } }, (err, searchedCafes) => {
                            if (err) res.send(err);
                            else {
                                res.json({searchedCafes});
                            }
                        }).sort( {cafe_name: 1} );    
                    }
                }
                else {
                    Cafe.find({ filters: {$all: parsedFilters}, cafe_name: {'$regex': userQuery, '$options': 'i' } }, (err, searchedCafes) => {
                        if (err) res.send(err);
                        else {
                            res.json({searchedCafes});
                        }
                    });
                }
            }
        }
        else if (req.query.find_query) {
            if (req.query.find_query.length > 0) {
                if (req.query.sort) {
                    if (req.query.sort === 'names_asc') {
                        Cafe.find({ cafe_name: {'$regex': userQuery, '$options': 'i' } }, (err, searchedCafes) => {
                            if (err) res.send(err);
                            else {
                                res.json({searchedCafes});
                            }
                        }).sort( {cafe_name: 1} );    
                    }
                }
                else {
                    Cafe.find({ cafe_name: {'$regex': userQuery, '$options': 'i' } }, (err, searchedCafes) => {
                        if (err) res.send(err);
                        else {
                            res.json({searchedCafes});
                        }
                    });
                }
            }
        }
        else if (req.query.filters) {
            if (req.query.filters.length > 0) {
                const parsedFilters = req.query.filters.split(',');
                if (req.query.sort) {
                    if (req.query.sort === 'names_asc') {
                        Cafe.find({ filters: {$all: parsedFilters} }, (err, searchedCafes) => {
                            if (err) res.send(err);
                            else {
                                res.json({searchedCafes});
                            }
                        }).sort( {cafe_name: 1} );    
                    }
                }
                else {
                    Cafe.find({ filters: {$all: parsedFilters} }, (err, searchedCafes) => {
                        if (err) res.send(err);
                        else {
                            res.json({searchedCafes});
                        }
                    });
                }
            }
        }
        else { // fallback by retrieving cafes

        }
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/cafes/:cafe_name', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Cafe.findOne({ cafe_name : req.params.cafe_name }, (err, cafe) => {
            if (err) res.send(err);
            CafeBookmark.findOne({ cafe_name: req.params.cafe_name }, (err, bkmk) => {
                if (err) res.send(err);
                res.json({cafe, bkmk}); // returns cafe info and bookmark!
            });
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    } 
});

router.get('/drink', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        // user params
        if (req.query.category) {
            let categoryList = req.query.category.split(',');
            if ( containsAll(categoryList, ['names','id']) ) {
                if (req.query.sort) {
                    if (req.query.sort === 'names_asc') {
                        Drink.find({}, { drink_name: 1, _id: 1 }, function(err, drinks) {
                            if (err) res.send(err);
                            res.json(drinks);
                        }).sort({ drink_name: 1 });
                    }
                }
                else {
                    Drink.find({}, { drink_name: 1, _id: 1 }, function(err, drinks) {
                        if (err) res.send(err);
                        res.json(drinks);
                    });
                }
            }
            else if ( containsAll(categoryList, ['names']) ) {
                if (req.query.sort) {
                    if (req.query.sort === 'asc') {
                        Drink.find({}, { drink_name: 1, _id: 0 }, function(err, drinks) {
                            if (err) res.send(err);
                            res.json(drinks);
                        }).sort({ drink_name: 1 });
                    }
                }
                else {
                    Drink.find({}, { drink_name: 1, _id: 0 }, function(err, drinks) {
                        if (err) res.send(err);
                        res.json(drinks);
                    });
                }
            }
        }
        else {
            if (req.query.sort) {
                if (req.query.sort === 'names_asc') {
                    Drink.find({}, function(err, drinks) {
                        if (err) res.send(err);
                        res.json(drinks);
                    }).sort({ drink_name: 1 });
                }
            }
            else { // get everything
                Drink.find(function(err, drinks) {
                    if (err) res.send(err);
                    res.json(drinks);
                });
            }
        }
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
});

router.get('/drinks/:drink_name', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Drink.findOne({ drink_name : req.params.drink_name }, (err, result) => {
            if (err) res.send(err);
            // Find cafes associated with this drink
            Cafe.find({ drinks: {$elemMatch: {drink_name: result.drink_name}} }, function(err, cafes) {
                if (err) res.send(err);
                DrinkBookmark.findOne({ drink_name: req.params.drink_name }, (err, bkmk) => {
                    if (err) res.send(err);
                    res.json({cafes, bkmk}); // returns cafes and bookmark!
                });
            })
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    } 
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