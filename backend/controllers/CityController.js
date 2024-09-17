//City and location could be conjoined into one so this could be changed in api/v2

const { cityModel } = require('../models/CitySchema');

const addCity = async (req, res) => {
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
    try{

        //implement logic later 

    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
}

module.exports = { addCity, getCity };