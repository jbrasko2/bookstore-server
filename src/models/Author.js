const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  books: [{ type: Object, ref: 'Book' }],
});

mongoose.model('Author', authorSchema);
