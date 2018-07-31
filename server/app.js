// server 入口文件

const express = require('express');
const bodyParser = require('body-parser');
const cookiParser = require('cookie-parser');
const userRouter = require('./userRouter');
// 连接mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/room');
const Chat = require('./models/userModel').getModel('chat');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('sendMsg', function (data) {
    const {from, to, msg} = data;
    const chatid= [from, to].sort().join('_');
    Chat.create({chatid, from, to, content: msg}, function (err, doc) {
      console.log(doc);
      io.emit('recMsg', doc)
    })
  });
});

app.use(cookiParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
server.listen(5000, function () {
  console.log('listen at 5000');
});

