const mongoose = require('mongoose');

const Drink = new mongoose.Schema({
    drink_name: String,
    drink_id: {type: mongoose.Schema.Types.ObjectId}
});

mongoose.model('Drink', Drink); 

mongoose.connect('mongodb://localhost/coffee');