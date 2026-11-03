import { AppError } from "./appError.js";
import jwt from 'jsonwebtoken';

const jwt_secret_key = process.env.JWT_SECRET_KEY;

export const authorization = (...allowedRoles) => {
    return async (req, res, next) => {
        let bearerToken = req?.headers?.authorization;
        if (!bearerToken) {
            throw new AppError('token not found try login first', 403);
        }
        let token = bearerToken.split(" ")[1];
        if (!token) {
            throw new AppError('invalid token', 400);
        }
        let decoded;
        try {
            decoded = jwt.verify(token,jwt_secret_key);
        } catch (error) {
            throw new AppError("Invalid or expired token.", 401);
        } 
      
        if (!decoded.role) {
            throw new AppError("User is not authenticated.", 401);
        }
        if (!allowedRoles.includes(decoded.role)) {
            throw new AppError("You are not authorized to access this resource.", 403);
        }
        req.user = decoded;
        req.role = decoded.role;
        next();
    }
}
