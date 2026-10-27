import { userModel } from "../../DB/models/user.js";
import jwt from 'jsonwebtoken'
import { AppError } from "../../utils/appError.js";
import bcrypt from 'bcrypt'

const jwt_secret_key = process.env.JWT_SECRET_KEY;

export const signUp = async (req, res) => {
    let { name, role, passwordHash, email } = req.body;
    await userModel.create({ name, role, email, passwordHash });
    res.status(201).json({ message: 'create user successfully' });
}


export const signIn = async (req, res) => {
    let { email, password } = req.body;
    let checkUser = await userModel.findOne({ email });
    if (!checkUser) {
        throw new AppError('user email not found try sign up first', 404)
    }
    let comparePass = await bcrypt.compare(password, checkUser.passwordHash);
    if (!comparePass) {
        throw new AppError('wrong password try again', 404)
    }
    console.log(jwt_secret_key);
    let token = await jwt.sign({ id: checkUser._id, role: checkUser.role, email: checkUser.email }, jwt_secret_key);
    res.status(200).json({ message: "login successfully", token })
}

export const getUsers = async (req, res) => {
    let users = await userModel.find().select(['-passwordHash','-name']);
    res.status(200).json({ message: "get users successfully", users })
}