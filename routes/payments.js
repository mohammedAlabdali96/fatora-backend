const express = require('express')
const Payment = require('../models/Payment')
const Seller = require('../models/Seller')

const router = express.Router()

// Create payment proof (from buyer)
router.post('/payments', async (req, res) => {
  try {
    const { sellerId, buyerName, note, imageUrl } = req.body

    if (!sellerId || !imageUrl) {
      return res.status(400).json({ message: 'Seller and image are required.' })
    }

    const sellerExists = await Seller.findById(sellerId)
    if (!sellerExists) {
      return res.status(404).json({ message: 'Seller not found.' })
    }

    const payment = new Payment({
      sellerId,
      buyerName,
      note,
      imageUrl,
    })

    await payment.save()

    res.status(201).json({ message: 'Payment proof uploaded.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error.' })
  }
})

module.exports = router
