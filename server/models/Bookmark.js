const mongoose = require('mongoose');

const Bookmark = new mongoose.Schema({
    item: String
});

module.exports = mongoose.model('Bookmark', Bookmark);