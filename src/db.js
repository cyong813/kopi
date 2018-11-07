const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    password: String,
    bookmarks: Array
});

mongoose.model('Sound', Sound); // register so mongoose knows about it

mongoose.connect('mongodb://localhost/coffee');