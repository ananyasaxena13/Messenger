import mongoose from "mongoose";

const connectDb = async (databaseURL) => {
    try {
        await mongoose.connect(databaseURL)
        console.log('Database connected');
    }
    catch(e) {
        console.log(e)
    }
}

export default connectDb;