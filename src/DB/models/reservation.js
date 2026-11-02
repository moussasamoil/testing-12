import mongoose from "mongoose";
import { roomModel } from "./room.js";
import { AppError } from "../../utils/appError.js";

export const reservationStatus = ['confirmed', 'checked_in', 'checked_out', 'cancelled']

const reservationSchema = new mongoose.Schema({
    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guest',
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    numberOfGuests: {
        type: Number,
        min: 1,
        required: true,
    },
    nightlyRateSnapshot: {
        type: Number,
        required: true,
        min: 1
    },
    totalAmount: {
        type: Number,
        min: 0,
        required: true
    },
    status: {
        type: String,
        enum: reservationStatus,
        default: reservationStatus.at(0)
    },
    checkedInAt: {
        type: Date,
        default: null
    },
    checkedOutAt: {
        type: Date,
        default: null
    },
    cancelledAt: {
        type: Date,
        default: null
    },
    cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cancelReason: {
        type: String,
        minLength: 3,
        maxLength: 500
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }
}, { timestamps: true })

reservationSchema.pre("validate", async function () {
    const room = await roomModel.findById(this.roomId);
    if (!room) {
        new AppError('Room not found', 400);
    }
    if (this.numberOfGuests > room.capacity) {
        new AppError(
            `Number of guests cannot exceed room capacity of ${room.capacity}`
            , 400);
    }
    if (this.checkOutDate <= this.checkInDate) {
        new AppError('Check-out date must be after check-in date', 400);
    }
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const numberOfNights = (this.checkOutDate.getTime() - this.checkInDate.getTime()) / millisecondsPerDay;
    this.nightlyRateSnapshot = room.nightlyRate;
    this.totalAmount = numberOfNights * room.nightlyRate;
})

export const reservationModel = mongoose.model('reservation',reservationSchema)