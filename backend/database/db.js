const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();  

const uri = process.env.MONGO_URI;

const database = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(uri);
        console.log("Database connected!");
    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
}

module.exports = { database };
