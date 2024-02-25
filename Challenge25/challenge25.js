const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/ProductDB")
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log(err)})

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true}
})
const Product = mongoose.model("products", productSchema)

function createProductNameIndex(){
    Product.collection.createIndex({ name: 1 })
    .then((result) => {
        console.log('Index on "name" field created successfully!')
    })
    .catch((err)=>{
        console.error('Error creating index:', err)
    })
}
createProductNameIndex()