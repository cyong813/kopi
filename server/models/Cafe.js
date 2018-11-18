const mongoose = require('mongoose');

const Cafe = new mongoose.Schema({
    cafe_name: String,
    cafe_id: {type: mongoose.Schema.Types.ObjectId},
    address: String,
    phone: String,
    website: String,
    hours: Array,
    categories: Array,
    coordinates: Array,
    drinks: Array
});

mongoose.model('Cafe', Cafe);

mongoose.connect('mongodb://localhost/coffee');