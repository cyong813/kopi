const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    password: String,
    bookmarks: Array
});

const Bookmark = new mongoose.Schema({
    username: String,
    cafes: Array,
    drinks: Array
});

const Cafe = new mongoose.Schema({
    cafe_name: String,
    cafe_id: Integer,
    address: String,
    phone: String,
    website: String,
    hours: Array,
    categories: Array,
    coordinates: Array,
    drinks: Array
});

const Drink = new mongoose.Schema({
    drink_name: String,
    drink_id: Integer
});

mongoose.model('User', User); 
mongoose.model('Bookmark', Bookmark); 
mongoose.model('Cafe', Cafe);
mongoose.model('Drink', Drink); 

mongoose.connect('mongodb://localhost/coffee');