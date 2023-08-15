import express from "express";
import { deleteUser } from "../controller/users.controller.js";

const router = express.Router();

router.get("/test", deleteUser)

export default router