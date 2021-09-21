require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authorRoutes = require('./routes/authorRoutes')
const bookRoutes = require('./routes/bookRoutes')

const app = express()
app.use(authorRoutes)
app.use(bookRoutes)

const mongoUri = process.env.DB_CONNECTION

mongoose.connect(mongoUri)
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
})
mongoose.connection.on('error', err => {
  console.log('Error connection to mongo', err)
})

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(3000, () => {
  console.log('Listening on Port 3000')
})