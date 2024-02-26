const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/ProductDB")
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log(err)})

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true}
})
const Product = mongoose.model("prods", productSchema)

async function getProductStatistics(){
    try{
        const result = await Product.aggregate([
            {
                "$group":{
                    _id: null,
                    total_products: {"$sum": 1},
                    average_price: {"$avg": "$price"},
                    highest_quantity: {"$max":"$quantity"}
                }
            }
        ])
        console.log("Result: ", result[0])
    }catch(err){
        console.log(err)
    }
}
getProductStatistics()