const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    type: {     // Type of work e.g "Roadwork", "Construction", etc...
        type: String,
    },
    location: { // Street name or address
        type: String,
        required: true,
        minLength: 3,
    },
    status: {   // Ongoing, Upcoming etc...
        type: String,
    },
    impact: {   // High impact, low, etc...
        type: String,
        required: true
    },
    latitude: { // Geocoded latitude 
        type: Number,
    },
    longitude: { // Geocoded longitude
        type: Number,
    },
}, { timestamps: true });

const cityModel = mongoose.model("City", CitySchema);

module.exports = cityModel;
