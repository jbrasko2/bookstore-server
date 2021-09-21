const express = require('express')
const mongoose = require('mongoose')

const Author = mongoose.model('Author')

const router = express.Router()

router.get('/authors', (req, res) => {
  res.send('Authors page')
})

router.post('/authors', (req, res) => {
  res.send(req.body)
})

module.exports = router