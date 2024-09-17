const { cityModel } = require('../models/CitySchema');

const addCity = async (res, req) => {
    try {
        const { name, type, location, status, impact } = req.body;

        if (!name || !type || !location || !status || !impact) {
            res.status(400).json({ message: "All fields are reauired!" });
        }

        const city = new cityModel({ name, type, location, status, impact });

        await city.save();      //save to DB
        res.status(200).json({ name, type, location, status, impact })

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getCity = async (req, res) => {
    res.status(200).json({message: 'hello'})
}

module.exports = { addCity, getCity };