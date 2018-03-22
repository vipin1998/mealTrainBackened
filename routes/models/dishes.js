const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    id : {
        type: Number,
        required: true,
        unique : true
    },
    name: {
        type: String,
        required: true,
        unique : true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type : String,
        unique : true,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    featured : {
        type : Boolean,
        required : true
    },
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;