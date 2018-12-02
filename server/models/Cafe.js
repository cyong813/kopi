const mongoose = require('mongoose');

// for some reason mlab can't identify letter f in collection???
const Cave = new mongoose.Schema({
    cafe_name: String,
    address: String,
    phone: String,
    website: String,
    hours: Array,
    categories: Array,
    coordinates: Object,
    drinks: Array
});

module.exports = mongoose.model('Cafe', Cave);