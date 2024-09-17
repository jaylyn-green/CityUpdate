import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Explicitly load environment variables

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

export { database };
