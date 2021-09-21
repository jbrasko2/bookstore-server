const express = require('express')
const mongoose = require('mongoose')

const Author = mongoose.model('Author')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const authors = await Author.find()
    res.send(authors)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
})

router.get('/:authorId', async (req, res) => {
  const id = req.params.authorId
  const author = await Author.find({ _id: id})

  res.send(author)
})

router.post('/', async (req, res) => {
  const { name, dob } = req.body

  if (!name || !dob) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and date of birth' })
  }

  try {
    const author = new Author({ name, dob })
    await author.save()
    res.send(author)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
})

router.patch('/:authorId', async (req, res) => {
  const id = req.params.authorId
  const author = await Author.find({ _id: id})
  
  res.send(`Updating ${author}`)
})

router.patch('/:authorId', async (req, res) => {
  const id = req.params.authorId
  const author = await Author.find({ _id: id})
  
  res.send(`Deleting ${author}`)
})

module.exports = router
