const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/ProductDB")
.then(()=>{ console.log("Connected to MongoDB") })
.catch((err)=>{ console.log(err) }) 
const categorySchema = new mongoose.Schema({
    name: String,
    description: String
})
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    category: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'}
})
const Category = mongoose.model('Category', categorySchema)
const Product = mongoose.model('productWithCategory', productSchema)
async function getProductsPopulatedWithCategory(){
    try{
        const result = await Product.find({}).populate('category').exec()
        console.log("Products after populating with category: ", result)
    }catch(err){ console.log(err)}
}
async function main() {
    try {
      const category = new Category({ name: 'Food', description: 'Food products' });
      await category.save();
  
      const product = new Product({ name: 'Chips', description: 'A snack', price: 10, category: category._id });
      await product.save();
  
      const productsWithCategory = await getProductsPopulatedWithCategory();
      console.log(productsWithCategory);
    } catch (error) { console.error('Error:', error); }
  }
main();