const express = require('express')
const mongoose = require('mongoose')

const Author = mongoose.model('Author')

const router = express.Router()

module.exports = router