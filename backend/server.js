import express from 'express';
import dotemv from "dotenv";
import {connectDB} from './config/db.js';

dotemv.config();

const app=express();

app.get("/products", (req, res)=>{
    
});

// console.log(process.env.MONGO_URI);

app.listen(5000,()=>{
    connectDB();
    console.log("server started at http://localhost:5000");
});

