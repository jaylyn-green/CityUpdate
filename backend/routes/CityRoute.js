
const { addCity, getCities, deleteProject } = require('../controllers/CityController');
const router = require('express').Router();

router.post('/add-city', addCity)
    .get('/get-cities', getCities)
    // .get('/get-city/:cityId', getCity)
    .delete('/delete-project/:id', deleteProject)


module.exports = router;