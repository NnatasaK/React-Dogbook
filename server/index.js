import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import express from "express";
import { connectDB } from "./ConnectDB.js";
import searchRoute from './routes/SearchRoute.js';
import userRoute from './routes/UserRoute.js';


const app = express();
const PORT = process.env.PORT || 8000;

//middleware
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes

app.use('/', searchRoute);
app.use('/', userRoute);



app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});



