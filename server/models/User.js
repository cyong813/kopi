const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    bookmarks: {type: Array, required: true}
});

module.exports = mongoose.model('User', User);