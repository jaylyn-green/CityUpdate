import cors from 'cors';
import { database } from './database/db.js';
import express from 'express';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());


dotenv.config();  // Explicitly load environment variables


const port = process.env.PORT || 5050;

const server = () => {
    database();
    app.listen(port, () => {
        console.log("Listening on port:", port);
    });
};
server();



