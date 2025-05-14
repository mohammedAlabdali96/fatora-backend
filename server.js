const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', authRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () => console.log(`Server running ${process.env.PORT }`))
  })
  .catch((err) => console.error('MongoDB error:', err))
