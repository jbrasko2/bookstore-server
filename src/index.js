require('dotenv').config();
require('./models/Author');
require('./models/Book');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

const mongoUri = process.env.DB_CONNECTION;

mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.log('Error connection to mongo', err);
});

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/books', async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on Port 3000');
});
