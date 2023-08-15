import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

const app = express();
dotenv.config()

try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

app.listen(5143, () => {
    console.log("Backend listening on port 5143");
})

