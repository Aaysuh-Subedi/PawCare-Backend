import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export async function connectdb() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully Connected to the Database");
    } catch (error) {
        console.error("Failed to load Database:", error);
        process.exit(1); 
    }
}