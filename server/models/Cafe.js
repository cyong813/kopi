const mongoose = require('mongoose');

const Cave = new mongoose.Schema({
    cafe_name: String,
    address: String,
    phone: String,
    website: String,
    hours: Array,
    categories: Array,
    coordinates: Array,
    drinks: Array
});

module.exports = mongoose.model('Cafe', Cave);