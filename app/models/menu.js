const mongoose = require('mongoose');

//created schema for menu

const menuSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  size: String,
});

//create model and exports
module.exports = mongoose.model('Menu', menuSchema);
