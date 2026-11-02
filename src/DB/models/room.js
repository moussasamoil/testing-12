import mongoose from "mongoose";

export const roomType = ['single', 'double', 'suite'];
export const roomStatus = ['active', 'maintenance']

const rooSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    type: {
        type: String,
        enum: roomType,
        default: roomType.at(0)
    },
    capacity: {
        type: Number,
        min: 1,
        max: 6,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: `${value}, must be an integer number`
        }
    },
    nightlyRate: {
        type: Number,
        min: 1,
        required: true
    },
    floor: {
        type: Number,
        min: 0,
        max: 50,
        validate: {
            validator: Number.isInteger,
            message: `${value}, must be an integer number`
        }
    },
    amenities:{
        type:[String],
        default:[]
    },
    status:{
        type:String,
        enum:roomStatus,
        default:roomStatus.at(0)
    }
},{timestamps:true});

export const roomModel= mongoose.model('room',rooSchema);