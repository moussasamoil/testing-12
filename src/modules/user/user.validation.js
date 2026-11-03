import Joi from "joi";
import { userRole } from "../../DB/models/user.js";


export const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(100).trim().required(),
    email:Joi.string().trim().email().required(),
    passwordHash:Joi.string().required(),
    role:Joi.string().valid(...Object.values(userRole)).default(userRole.receptionist),
    isActive:Joi.boolean().default(false)
}).required()

