const mongoose = require('mongoose');

const Drink = new mongoose.Schema({
    drink_name: String,
    drink_image: String
});

module.exports = mongoose.model('Drink', Drink); 