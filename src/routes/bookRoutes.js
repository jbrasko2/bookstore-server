const express = require('express')
const mongoose = require('mongoose')

const Book = mongoose.model('Book')

const router = express.Router()

module.exports = router