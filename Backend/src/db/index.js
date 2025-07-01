import mongoose from "mongoose";    

const db_url = process.env.MONGODB_URL;

if (!db_url) {
    console.log("DB url not found");
    process.exit(1);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(db_url, {
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;