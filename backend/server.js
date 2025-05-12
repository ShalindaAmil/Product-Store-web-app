import express from 'express';
import dotenv from "dotenv";
import {connectDB} from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app=express();
app.use(express.json()); //allow us to accept JSON data in the req.body

// for get all products
app.get("/api/products",async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json({success:true,data: products});
    } catch (error) {
        console.log("Error in Creating Products : ",error.message);
        res.status(500).json({success:false,message:"Server error"});
    }
});

// for add new products
app.post("/api/products", async(req, res)=>{
   const product=req.body; //user will send this data
   
   if(!product.name || !product.price || !product.image){
    return res.status(400).json({success:false,message:"Please provide all fields"});
   }
   const newProduct=new Product(product)

   try {
    await newProduct.save();    
    res.status(201).json({success:true, data:newProduct});
   } catch (error) {
    res.status(500).json({success:false,message:"Server Error"});
   }
});

// for update product
app.put("/api/products/:id",async(req,res)=>{
    const {id}=req.params;
    const product=req.body;
    if(mongoose.Types.ObjectId.isValis(id)){
        return res.status(404).json({success:false,message:"Invalid product Id"});
    }
    try {
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedProduct});
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"});
    }
});

// for delete product
app.delete("/api/products/:id", async(req, res)=>{
    const {id}=req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"});
    } catch (error) {
        console.log("Error in deleting product :",error.message);
        res.status(404).json({success:false,message:"Product not found"});
    }
});

app.listen(5000,()=>{
    connectDB();
    console.log("server started at http://localhost:5000");
});

