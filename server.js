const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const paymentRoutes = require('./routes/payments')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', paymentRoutes)


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))    
  })
  .catch((err) => console.error('MongoDB error:', err))
