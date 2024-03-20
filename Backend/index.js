import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes.js'
import connectDb from './mongoDB/connectDb.js';

const app = express();

app.use('/api/auth', authRoutes);
app.use(express.json());

dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(3000, () => {
    connectDb("mongodb://localhost:27017/messenger");
    console.log('Server is running on port 3000');
})    