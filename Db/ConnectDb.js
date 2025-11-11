import mongoose from "mongoose";

export async function connectDB() {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection.asPromise();
        }
        return await mongoose.connect(process.env.MONGO);
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}
