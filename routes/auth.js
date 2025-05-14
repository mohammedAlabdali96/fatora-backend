const express = require('express')
const bcrypt = require('bcryptjs')
const Seller = require('../models/Seller')

const router = express.Router()

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

module.exports = router
