const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Seller', SellerSchema)
