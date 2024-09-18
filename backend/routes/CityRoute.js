
const { addCity, getCities, getCity } = require('../controllers/CityController');
const router = require('express').Router();

router.post('/add-city', addCity)
    .get('/get-cities', getCities)
    .get('/get-city/:cityId', getCity)


module.exports = router;