const mongoose = require('mongoose');

const DrinkBookmark = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    drink_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Drink'},
    drink_name: {type: String, ref: 'Drink'}
});

module.exports = mongoose.model('DrinkBookmark', DrinkBookmark);