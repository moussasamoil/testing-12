import mongoose from "mongoose";


const guestSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        minLength: 7,
        maxLength: 20,
        trim: true,
        match: [
            /^[0-9+\-()\s]+$/,
            'Phone number contains invalid characters'
        ]
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
        ]
    },
    nationality: {
        type: String,
        minLength: 2,
        maxLength: 60
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

}, {
    timestamps: true,
})

export const guestModel = mongoose.model('guest',guestSchema);

