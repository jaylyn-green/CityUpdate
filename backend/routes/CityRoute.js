
const { addCity, getCity } = require('../controllers/CityController');
const router = require('express').Router();

router.post('/add-city', addCity)
    .get('/get-city', getCity)


module.exports = router;