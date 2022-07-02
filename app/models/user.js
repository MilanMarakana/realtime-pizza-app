const mongoose = require('mongoose');

//created schema for menu

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
  },
  { timestamps: true }
);

//create model and exports
module.exports = mongoose.model('User', userSchema);
