import Users from "../models/users.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUsers = new Users({
            ...req.body,
            password: hash
        })

        await newUsers.save();
        res.status(201).send("User have been created successfully")
    } catch (err) {
        res.status(500).send("Somthing went wrong")
    }
}

export const login = async (req, res, next) => {
    try {

    } catch (err) {
        res.status(500).send("Somthing went wrong")
    }
}

export const logout = (req, res, next) => {

}