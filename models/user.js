const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
 'username': {
  type: String,
  required: true
 },
 'password': {
  type: String,
  required: true
 },
 'cart': [{
   type: String,
   required: true
  }],

})



const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;