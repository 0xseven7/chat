const express = require('express');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 16;


const Router = express.Router();
const User = require('./models/userModel').getModel('user');

Router.get('/info', function (req, res) {
  const {userid} = req.cookies;
  if (!userid) {
    return res.json({code: 1})
  }
  User.findById(userid, function (err, data) {
    if (err) {
      return res.json({code: 1, msg: '服务器内部错误'})
    }
    if (data) {
      return res.json({code: 0, data: data})
    }
  })
 });

/**
 * 注册逻辑
 * URI: /user/register
 */
Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body;
  User.findOne({user}, function (err, data) {
    if (data) {
      return res.json({code: 1, msg: '用户名重复'});
    }

    bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
      bcrypt.hash(pwd, salt, function (err, hash) {
        // Store hash in your password DB.
        const userModel = new User({user, type, pwd: hash});
        userModel.save(function (err, data) {
          if (err) {
            return res.json({code: 1, msg: '后端出错'});
          }
          const {user, type, _id} = data;
          res.cookie('userid', _id);
          res.json({code: 0, data: {user, type, _id}});
        })
      });
    });
  });
});
/**
 * 登录逻辑
 * URI: /user/login
 */
Router.post('/login', function (req, res) {
  const {user, pwd, type} = req.body;
  User.findOne({user}, function (err, data) {
      if (err) {
        return res.json({code: 1, msg: '后端出错'});
      }
      if (data) {
        bcrypt.compare(pwd, data.pwd, function (err, checked) {
          if (err) {
            return res.json({code: 1, msg: '后端出错'});
          }
          if (checked === true) {
            res.cookie('userid', data);
            return res.json({code: 0, data: data});
          }
        });
      } else {
        return res.json({code: 1, msg: '用户不存在'});

      }
    })
  });
  Router.get('/list', function (req, res) {
    User.find({}, function (err, data) {
      res.json(data);
    });
  });
  module.exports = Router;

