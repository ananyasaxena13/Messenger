import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Messenger");
        console.log('Database connected');
    }
    catch(e) {
        console.log(e);
    }
}

export default connectDb;