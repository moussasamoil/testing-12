import mongoose from "mongoose";

export async function connection() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('connect to db successfully')
    } catch (err) {
        console.log(err);
    }
}