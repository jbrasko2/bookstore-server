const mongoose = require('mongoose')
const Author = mongoose.model('Author')
const Book = mongoose.model('Book')

exports.authors_get_all = async (req, res) => {
  try {
    const authors = await Author.find()
    res.send(authors)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
}

exports.authors_get_one = async (req, res) => {
  const id = req.params.authorId

  try {
    const author = await Author.findById(id)
    res.send(author)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
}

exports.author_create = async (req, res) => {
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
}

exports.author_update = async (req, res) => {
  const id = req.params.authorId
  const { name, dob } = req.body

  if (!name || !dob) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and date of birth' })
  }

  try {
    const author = await Author.findById(id)
    author.name = name
    author.dob = dob
    await author.save()
    res.send(author)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
}

exports.author_delete = async (req, res) => {
  const id = req.params.authorId
  const author = await Author.findOne({ _id: id }).exec()
  const authorBooks = author.books
  authorBooks.map(book => {
    Book.findByIdAndDelete(book._id, function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        console.log('Deleted : ', docs)
      }
    })
  })

  try {
    Author.findByIdAndDelete(id, function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        console.log('Deleted : ', docs)
      }
    })
    res.send('Deleted')
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
}
