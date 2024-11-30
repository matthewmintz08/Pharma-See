const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    name: { type:String, required: true},
    dose: String,
    form: String,
    price: Number,
    dateFilled: Date,
});

module.exports = mongoose.model('Medication', medicationSchema);