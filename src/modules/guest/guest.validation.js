import Joi from "joi";
import { objectIdValidator } from "../../utils/custom.validators.js";



export const addGuestSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).trim().required(),
    phone: Joi.string().min(7).max(20).required(),
    email: Joi.string().trim().lowercase().email().required(),
    nationality: Joi.string().trim().min(2).max(20),
    createdBy:Joi.string().custom(objectIdValidator).required()
}).required()