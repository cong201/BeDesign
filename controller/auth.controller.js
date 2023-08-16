import Users from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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
        const user = await Users.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).send("User not found!")
        }

        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) {
            return res.status(400).send("Wrong password or username!")
        }

        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller
            },
            process.env.JWT_KEY
        )

        const { password, ...info } = user._doc
        res.cookie("accessToken", token, {
            httpOnly: true
        })
            .status(200).send(info)
    } catch (err) {
        res.status(500).send("Somthing went wrong")
    }
}

export const logout = (req, res, next) => {

}