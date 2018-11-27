const mongoose = require('mongoose');

const CaveBookmark = new mongoose.Schema({
    cafe_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Cave'},
    cafe_name: {type: String, ref: 'Cave'}
});

module.exports = mongoose.model('CafeBookmark', CaveBookmark);