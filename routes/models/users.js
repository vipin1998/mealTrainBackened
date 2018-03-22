const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sex:{
        type : String,
        enum : ["Male" , "Female" , "Other"],
        required : true
    },
    phone : 
    {
        type : String,
        unique : true,
        required : true
    },
    password : 
    {
        type: String,
        required: true,
    },
    Cart : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }],
    email : 
    {
        type : String,
        unique : true,
        sparse : true
    },
    fb : 
    {
        fb_id : {
            type : String,
            unique : true,
            sparse : true
        },
        image_url : {
            type : String,
            unique : true,
            sparse : true
        }
    }
});

var Users = mongoose.model('User', userSchema);
module.exports = Users;