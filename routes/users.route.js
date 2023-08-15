import express from "express";
import { deleteUser } from "../controller/users.controller.js";

const router = express.Router();

router.get("/register", deleteUser)
router.get("/login",)

export default router