const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
    name: {type: String, required: True},
    location: String,
    phone: String,

});

module.exports = mongoose.model('Pharmacy', pharmacySchema);