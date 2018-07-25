const  express = require('express');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 16;


const Router = express.Router();
const User = require('./models/userModel').getModel('user');

Router.get('/info', function (req, res) {
   res.json({code: 1})
});
Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body;
  User.findOne({user}, function (err, data) {
    if (data) {
      return res.json({code:1, msg: '用户名重复'})
    }
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
      bcrypt.hash(pwd, salt, function(err, hash) {
        // Store hash in your password DB.
        User.create({user, pwd:hash, type}, function (err, data) {
          if (err) {
            return res.json({code: 1, msg: '后端出错'})
          }
          res.json({code: 0})
        })
      });
    });
  });
});
Router.get('/list', function (req ,res) {
  User.find({}, function (err, data) {
     res.json(data)
  });
});
module.exports = Router;

