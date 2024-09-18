//City and location could be conjoined into one so this could be changed in api/v2

const cityModel = require('../models/CitySchema');

const addCity = async (req, res) => {
    try {
        const { type, location, status, impact } = req.body;

        if (!type || !location || !status || !impact) {
            res.status(400).json({ message: "All fields are reauired!" });
        }

        const city = new cityModel({ type, location, status, impact });

        await city.save();      //save to DB
        res.status(200).json({ type, location, status, impact })

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getCities = async (req, res) => {
    try {

        //Should i grab all and display all current cities on front page then have a search bar or a way to filter through?
        const cities = await cityModel.find().sort({ createdAt: -1 });
        res.status(200).json(cities);


    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

const getCity = async (req,res) => {
    try{
        
        const cityId = req.params.cityId;
        const city = await cityModel.findById(cityId);
        
        res.status(200).json(city);

    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { addCity, getCities, getCity };