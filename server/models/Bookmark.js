const mongoose = require('mongoose');

const Bookmark = new mongoose.Schema({
    item: String
});

mongoose.model('Bookmark', Bookmark);
mongoose.connect('mongodb://localhost/coffee');