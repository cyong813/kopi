const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    bookmarks: {type: Array, required: true}
});

mongoose.model('User', User);