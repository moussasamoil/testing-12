import { Types } from "mongoose"


export const objectIdValidator = (value,helper)=>{
    if(!Types.ObjectId.isValid(value)){
        return helper.message('invalid object id')
    }
    return value
}