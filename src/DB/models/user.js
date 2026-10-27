import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const slotNumber = Number(process.env.SALT_ROUNDS??7)
export const userRole = {
    admin: "admin",
    manager: "manager",
    receptionist: "receptionist"
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'number is required'],
        trim: true,
        minLength: 3,
        maxLength: 80,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
        ],
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: userRole,
        default: userRole.receptionist,
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified('passwordHash')) {
        return
    }
    this.passwordHash = await bcrypt.hash(this.passwordHash, slotNumber)
})

async function hashPasswordOnUpdate() {
    const update = this.getUpdate();
    if (!update) {
        return
    }
    if (update.passwordHash) {
        update.passwordHash = await bcrypt.hash(update.passwordHash, slotNumber)
    }
    if (update.$set?.passwordHash) {
        update.$set.passwordHash = await bcrypt.hash(update.$set.passwordHash, slotNumber)
    }
}

userSchema.pre("findOneAndUpdate", hashPasswordOnUpdate);
userSchema.pre("updateOne", hashPasswordOnUpdate);
userSchema.pre("updateMany", hashPasswordOnUpdate);

export const userModel = mongoose.model('user', userSchema);
