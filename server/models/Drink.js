const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const Drink = new mongoose.Schema({
    drink_name: String
});

Drink.plugin(URLSlugs('drink_name'));

module.exports = mongoose.model('Drink', Drink); 