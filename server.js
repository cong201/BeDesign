import express from "express";
import mongoose from "mongoose";

const app = express();

try {
    await mongoose.connect('mongodb+srv://congl217201:congle@cluster0.guahucl.mongodb.net/?retryWrites=true&w=majority&dbname=design');
    console.log("Connected to MongoDB");
} catch (error) {
    handleError(error);
}

app.listen(5143, () => {
    console.log("Backend listening on port 5143");
})

