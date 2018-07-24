const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  passwd: String,
  type: String
});
module.exports = mongoose.model('User', userSchema);