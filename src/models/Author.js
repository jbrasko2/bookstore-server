const mongoose = require('mongoose')

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
})

mongoose.model('Author', authorSchema)
