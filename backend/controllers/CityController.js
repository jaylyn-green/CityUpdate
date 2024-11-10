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

            await city.save(); 
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



const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await cityModel.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found!" });
        }

        return res.status(200).json({ message: "Project deleted!" });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ message: "Server error!" });
    }
};

module.exports = { addCity, getCities, deleteProject };
