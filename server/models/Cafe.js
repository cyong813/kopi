const mongoose = require('mongoose');

// for some reason mlab can't identify letter f in collection???
const Cave = new mongoose.Schema({
    cafe_name: String,
    cafe_image: String,
    address: String,
    phone: String,
    website: String,
    hours: Array,
    price: String,
    categories: Array, // American, French, Bar, Etc.
    coordinates: Object,
    drinks: [ {drink_name: {type: String, ref: 'Drink'}} ],
    filters: [
        "credit_card",
        "cash_only",
        "good_for_working",
        { price: {type: String} },
        "restroom",
        "wifi"
    ]
});

module.exports = mongoose.model('Cafe', Cave);