const express = require('express')
const mongoose = require('mongoose')

const Book = mongoose.model('Book')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.send(books)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
})

router.post('/books', async (req, res) => {
  const { title, year } = req.body

  if (!title || !year) {
    return res.status(422).send({ error: 'You must provide a title and year' })
  }

  try {
    const book = new Book({ title, year, authorId: req.author._id })
    await book.save()
    res.send(book)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
})

module.exports = router
