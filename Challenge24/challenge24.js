const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/ProductDB")
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log(err)})

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
})
const Product = mongoose.model("products", productSchema)
const app = express()
const port = 3000
app.use(express.json())

async function createProductRoute(req, res){   
    try{ 
        const product = new Product(req.body)
        await product.save()
        res.status(200).json({message: "Producted created!", details: product})
    }catch(err){  res.status(err.status).json({message: err.message}) }
}
app.post("/api/products", createProductRoute)

async function getAllProductsRoute(req, res){
    try{
        const products = await Product.find()
        res.status(200).json({ProductDetails: products})
    }catch(err){ res.status(err.status).json({message: err.message}) }
}
app.get("/api/products", getAllProductsRoute)

async function updateProductRoute(req,res){
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: "Updated Product details", ProductDetails: product})
    }catch(err){ res.status(err.status).json({message: err.message}) }
}
app.put("/api/products/:id", updateProductRoute)

async function deleteProductRoute(req, res){
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({messgae: "Deleted product details!", ProductDetails: product})
    }catch(err){ res.status(err.status).json({message: err.message}) }
}
app.delete("/api/products/:id", deleteProductRoute)

app.listen(port, ()=>{
    console.log(`Server started at https://localhost:${port}`)
})