import mongoose from "mongoose";

export const paymentMethods = ['cash', 'card', 'transfer']

const paymentSchema = new mongoose.Schema({
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservation',
        required: true,
        immutable: true
    },
    amount: {
        type: Number,
        min: 1,
        required: true,
        immutable: true,
        validate: {
            validator: Number.isInteger,
            message: props => `${props.value} must be a positive integer`
        }
    },
    method: {
        type: String,
        enum: paymentMethods,
        required: true,
        immutable: true,
    },
    reference: {
        type: String,
        trim: true,
        required: function () {
            return this.method === 'card' || this.method === 'transfer';
        },
        immutable: true,
    },
    receivedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true,
        immutable: true,
    },
    paidAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    }
}, { timestamps: true });

export const paymentModel = mongoose.model('payment',paymentSchema)