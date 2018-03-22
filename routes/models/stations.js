const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique : true,
        required: true
    },
    dishes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
});

var Stations = mongoose.model('Station', stationSchema);
module.exports = Stations;