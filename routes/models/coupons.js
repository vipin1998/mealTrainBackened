const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique : true
    },
    min_amount: {
        type: Number,
        required: true
    },
    valid:{
        type : Boolean,
        required : true
    },
    discount : {
        type : Number,
        required : true
    }

});

var Coupons = mongoose.model('Coupon', couponSchema);

module.exports = Coupons;