const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  phoneUid: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  emailUid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    default: true
  },
  token: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;