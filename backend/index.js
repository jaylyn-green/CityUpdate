const express = require('express');
const cors = require('cors');
const { database } = require('./database/db.js');
const { readdirSync } = require('fs');
const CityRoute = require('./routes/CityRoute.js');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

app.use("/api/v1", CityRoute);

const port = process.env.PORT || 5050;

const server = () => {
    database();
    app.listen(port, () => {
        console.log("Listening on port:", port);
    });
};
server();
