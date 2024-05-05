import Mongoose from "mongoose";

export const connectDB = async () => {
    try {
        Mongoose.set('strictQuery', false);
        const connection = await Mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_name });
        console.log(`Database Connected ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


process.on('SIGINT', async () => {
    try {
        await Mongoose.connection.close();
        console.log("MongoDB connection closed");
        process.exit(0)
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
    }

})
