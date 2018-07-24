// server 入口文件

const express = require('express');
const bodyParser = require('body-parser');
const cookiParser = require('cookie-parser');
const userRouter = require('./userRouter');
// 连接mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/room');

const app = express();


app.use(cookiParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.listen(5000, function () {
  console.log('listen at 5000');
});

