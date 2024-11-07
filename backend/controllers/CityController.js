const axios = require('axios');
const cityModel = require('../models/CitySchema');
require('dotenv').config();

const addCity = async (req, res) => {
    try {
        const { type, location, status, impact } = req.body;

        if (!type || !location || !status || !impact) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const geoResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: process.env.GOOGLE_API_KEY
            }
        });

        //convert location to longitude and latitude
        if (geoResponse.data.status === 'OK') {
            const { lat, lng } = geoResponse.data.results[0].geometry.location;
            console.log(geoResponse.data);

            const city = new cityModel({
                type,
                location,
                status,
                impact,
                latitude: lat,
                longitude: lng
            });

            await city.save(); // Save to DB
            res.status(200).json(city);

        } else {
            res.status(400).json({ message: "Invalid location!" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getCities = async (req, res) => {
    try {

        const cities = await cityModel.find().sort({ createdAt: -1 });
        res.status(200).json(cities);


    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

const getCity = async (req, res) => {       //Really don't need a route and function for idividual cities or projects
    try {

        const cityId = req.params.cityId;
        const city = await cityModel.findById(cityId);

        res.status(200).json(city);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteProject = async (req, res) => {
    const cityId = req.params.cityId;
    try {
        cityModel.findByIdAndDelete(cityId)
        res.status(200).json({ message: "Project deleted!" });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { addCity, getCities, getCity, deleteProject };
