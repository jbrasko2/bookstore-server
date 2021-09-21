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

router.get('/:bookId', async (req, res) => {
  const id = req.params.bookId
  const book = await Book.find({ _id: id})

  res.send(book)
})

router.post('/', async (req, res) => {
  const { title, year, author } = req.body

  if (!title || !year || !author) {
    return res.status(422).send({ error: 'You must provide a title, author and year' })
  }

  try {
    const book = new Book({ title, year, author })
    await book.save()
    res.send(book)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
})



module.exports = router
