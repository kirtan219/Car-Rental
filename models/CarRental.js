const mongoose = require('mongoose');

// CarRental Schema
const CarRentalSchema = new mongoose.Schema({
    pickup_location: String,
    drop_location: String,
    pickup_date: String,
    return_date: String
});

module.exports = mongoose.model('CarRental', CarRentalSchema);
