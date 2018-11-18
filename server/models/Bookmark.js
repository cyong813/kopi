const mongoose = require('mongoose');

const Bookmark = new mongoose.Schema({
    username: {type: String, ref: 'User'},
    cafes: Array,
    drinks: Array
});
mongoose.model('Bookmark', Bookmark);

mongoose.connect('mongodb://localhost/coffee');