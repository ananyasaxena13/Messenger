import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://mtrbhagyodayame:8JP1F3AqEk4DSInj@cluster0.1xqvllg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Database connected');
    }
    catch(e) {
        console.log(e);
    }
}

export default connectDb;