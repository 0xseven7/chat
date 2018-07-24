const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/room');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  age: Number,
  sex: String
});
const User = mongoose.model('User', userSchema);
const app = express();

app.get('/', function (req, res) {
  res.send('<h1>hello world</h1>');
});
app.get('/data', function (req, res) {
  User.findOne({username: 'zhangchenxu'}, function (err, data) {
    if (err) {
      return console.log(err);
    }
    res.json(data);
  });
});
app.listen(5000, function () {
  console.log('listen at 5000');
});

