const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    buyerName: { type: String },
    note: { type: String },
    imageUrl: { type: String, required: true }, // for now base64 or a direct link
  },
  { timestamps: true }
)

module.exports = mongoose.model('Payment', PaymentSchema)
