const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({

    name: {         //name of city
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    type: {     //type of work e.g "Roadwork", "Construction", etc...
        type: String,
        required: true
    },
    location:{      //street name or address
        type: String,
        required: true
    },
    status: {            //Ongoing, Upcoming etc...
        type: String,
    },
    impact: {            //High imapact , low, etc...
        type: String,
        required: true
    },


}, { timestamps: true });

const cityModel = mongoose.model("City", CitySchema);

module.exports = { cityModel };