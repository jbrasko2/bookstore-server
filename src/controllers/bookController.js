const mongoose = require('mongoose')
const Book = mongoose.model('Book')
const Author = mongoose.model('Author')

exports.books_get_all = async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'name')
    res.send(books)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
}

exports.books_get_one = async (req, res) => {
  const id = req.params.bookId
  const book = await Book.findById(id).populate('author', 'name')

  res.send(book)
}

exports.book_create = async (req, res) => {
  const { title, year, authorName } = req.body
  let author = await Author.findOne({ name: authorName })

  if (!title || !year || !authorName) {
    return res
      .status(422)
      .send({ error: 'You must provide a title, author and year' })
  }

  if (!author) {
    author = new Author({ name: authorName, dob: Date.now() })
    await author.save()
  }

  try {
    const book = new Book({ title, year, author: author._id })
    await book.save()
    await Author.findByIdAndUpdate(
      author,
      { $push: { books: book } },
      { new: true, useFindAndModify: false }
    )
    res.send(book)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
}

exports.book_update = async (req, res) => {
  const id = req.params.bookId
  const { title, year, authorName } = req.body
  const author = await Author.findOne({ name: authorName })

  if (!title || !year || !authorName) {
    return res
      .status(422)
      .send({ error: 'You must provide a title, author and year' })
  }

  if (!author) {
    const newAuthor = new Author({ name: authorName, dob: Date.now() })
    await newAuthor.save()
    try {
      const book = await Book.findById(id)
      book.title = title
      book.year = year
      book.author = {
        _id: newAuthor._id,
        name: newAuthor.name,
      }
      await book.save()
      await Author.findByIdAndUpdate(
        newAuthor._id,
        { $push: { books: book } },
        { new: true, useFindAndModify: false }
      )
      res.send(book)
    } catch (err) {
      res.status(422).send({ error: err.message })
    }
  } else {
    try {
      const book = await Book.findById(id)
      book.title = title
      book.year = year
      book.author = {
        _id: author._id,
        name: author.name,
      }
      await book.save()
      await Author.findByIdAndUpdate(author._id, {
        $pull: { books: { _id: book._id } },
      })
      await Author.findByIdAndUpdate(
        author._id,
        { $push: { books: book } },
        { new: true, useFindAndModify: false }
      )
      res.send(book)
    } catch (err) {
      res.status(422).send({ error: err.message })
    }
  }
}

exports.book_delete = (req, res) => {
  const id = req.params.bookId

  try {
    Book.findByIdAndDelete(id)
    res.send('Deleted')
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
}
