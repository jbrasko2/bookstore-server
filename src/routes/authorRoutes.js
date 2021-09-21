const express = require('express')
const mongoose = require('mongoose')

const Author = mongoose.model('Author')

const router = express.Router()

router.get('/authors', (req, res) => {
  res.send('Authors page')
})

router.post('/authors', async (req, res) => {
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

module.exports = router
