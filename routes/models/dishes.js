const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl:{
        type : String,
        unique : true,
        required : true
    },
    price:{
        type : Number,
        required : true
    }

});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;