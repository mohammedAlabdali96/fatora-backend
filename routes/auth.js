const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Seller = require('../models/Seller')

const router = express.Router()

// --- REGISTER ---
router.post('/register', async (req, res) => {
  try {
    const { name, phone, password } = req.body

    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    const existing = await Seller.findOne({ phone })
    if (existing) {
      return res.status(400).json({ message: 'Phone already registered.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const seller = new Seller({ name, phone, passwordHash })
    await seller.save()

    res.status(201).json({ message: 'Registered successfully.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error.' })
  }
})

// --- LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body

    if (!phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    const seller = await Seller.findOne({ phone })
    if (!seller) {
      return res.status(400).json({ message: 'Phone not registered.' })
    }

    const isMatch = await bcrypt.compare(password, seller.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const token = jwt.sign(
      { id: seller._id, phone: seller.phone },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2d' }
    )

    res.status(200).json({
      message: 'Login successful.',
      token,
      seller: {
        id: seller._id,
        name: seller.name,
        phone: seller.phone
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error.' })
  }
})

module.exports = router
