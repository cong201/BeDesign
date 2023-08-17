import Users from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";

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
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await Users.findOne({ username: req.body.username })

        if (!user) next(createError(404, "User not found!"))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) {
            return next(createError(500, "Wrong password or username!"))
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
        next(err)
    }
}

export const logout = (req, res, next) => {
    res.clearCookies("accessToken", {
        sameSite: "none",
        secure: true
    }).status(200).send("User logged out")
}