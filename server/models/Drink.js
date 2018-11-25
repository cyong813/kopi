const mongoose = require('mongoose');

const Drink = new mongoose.Schema({
    drink_name: String
});

module.exports = mongoose.model('Drink', Drink); 