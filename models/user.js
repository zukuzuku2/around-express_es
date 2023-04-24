const mongoose = require('mongoose');
const { linkValidator } = require('../utils/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linkValidator.test(v),
      message: 'No es una URL valida',
    },
  },
});
module.exports = mongoose.model('user', userSchema);
