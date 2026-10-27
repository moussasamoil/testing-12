import { AppError } from "./appError.js";
import jwt from 'jsonwebtoken';

const jwt_secret_key = process.env.JWT_SECRET_KEY;

export const authorization = async (req, res, next) => {
    let bearerToken = req?.headers?.authorization;
    if (!bearerToken) {
        throw new AppError('token not found try login first', 403);
    }
    let token = bearerToken.split(" ")[1];
    if (!token) {
        throw new AppError('invalid token', 400);
    }
    let decode = await jwt.decode(token, jwt_secret_key);
    if (!decode) {
        throw new AppError('can not decode this token, invalid token', 400);
    }
    req.role=decode.role;
    next();
}