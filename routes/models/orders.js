const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    trainNo: {
        type: Number,
        required: true,
    },
    pnr:{
        type : String,
        required : true
    },
    station : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price : {
        type : Number
    },
    dishes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }],
    coupon : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon'
    }
},  {
    timestamps: true
});

var Orders = mongoose.model('Order', orderSchema);
module.exports = Orders;