import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import orderRoute from "./routes/order.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import conservationRoute from "./routes/conservation.route.js";

const app = express();
dotenv.config()

try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

app.use(express.json())
app.use(cookieParser())

app.use("/api/users", usersRoute)
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/conservation", conservationRoute)
app.use("/api/order", orderRoute)
app.use("/api/message", messageRoute)
app.use("/api/review", reviewRoute)

app.listen(5143, () => {
    console.log("Backend listening on port 5143");
})

