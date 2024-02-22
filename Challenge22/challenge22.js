const express = require("express")
const mongoose = require("mongoose")
const Product = require("./productModel")

mongoose.connect("mongodb://127.0.0.1:27017/ProductDB")
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log("MongoDB connection Error: ", err)})

const app = express()
const port = 3000
async function createProduct(productDetails){
    const product = Product(productDetails)
    await product.save()
}
app.get("/products/add", async (req, res)=>{
    const name = req.query.name
    const price = req.query.price
    const quantity = req.query.quantity
    try{
        const productDetails = {name: name, price: price, quantity: quantity}
        await createProduct(productDetails)
        res.status(200).json({message: "Created product successfully!", productDetails: productDetails})
    }catch(err){
        res.status(400).json({message: "Error occurred during product creation!", Error:err.message})
    }
})
async function getAllProducts(){
    return await Product.find()
}
app.get("/products", async (req, res)=>{
    try{
        const result = await getAllProducts()
        res.status(200).json({Products: result})
    }catch(err){
        res.status(400).json({message: "Error occurred during fetching data!", Error:err.message})
    }
})
async function updateProduct(id, productDetails){
    return await Product.findByIdAndUpdate(id, productDetails)
}
app.get("/products/update", async (req,res)=>{
    try{
        const id = req.query.id
        const name = req.query.name
        const price = req.query.price
        const quantity = req.query.quantity
        await updateProduct({"_id": id}, {name: name, price: price, quantity: quantity})
        res.status(200).json({message: "Product details updated successfully"})
    }catch(err){
        res.status(400).json({message: "Error occurred during product updation!", Error:err.message})
    }
})
async function deleteProduct(id){
    return await Product.findByIdAndDelete({"_id": id})
}
app.get("/products/delete", async (req, res)=>{
    try{
        const id = req.query.id
        await deleteProduct(id)
        res.status(200).json({message: "Product deleted successfully"})
    }catch(err){
        res.status(400).json({message: "Error occurred during product deletion!", Error:err.message})
    }
})
app.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}`)
})