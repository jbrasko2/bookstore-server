const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

mongoose.model('Book', bookSchema);
