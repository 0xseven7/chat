// server 入口文件
const express = require('express');
const bodyParser = require('body-parser');
const cookiParser = require('cookie-parser');
const userRouter = require('./userRouter');
const path = require('path');
// 连接mongodb
const mongoose = require('mongoose');
const url = "mongodb://zcx1:fuckmongo@149.28.9.185:27017/chat";
// const url = "mongodb://127.0.0.1:27017/chat";
mongoose.connect(url, { useNewUrlParser: true });
const Chat = require('./models/userModel').getModel('chat');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
	socket.on('sendMsg', function(data) {
		const {
			from,
			to,
			msg
		} = data;
		const chatId = [from, to].sort().join('_');
		console.log(chatId);
		Chat.create({
			chatId,
			from,
			to,
			content: msg,
			create_time: new Date().getTime()
		}, function(err, doc) {
			io.emit('recMsg', doc)
		})
	});
});
app.use(cookiParser());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use(function(req, res, next) {
	if (req.url.startsWith('/user/') || req.url.startsWith('/static')) {
		return next();
	}
	return res.sendFile(path.resolve(__dirname, '../build/index.html'))
});
app.use('/', express.static(path.resolve('__dirname','../build')));

server.listen(5000, function() {
	console.log('listen at 5000');
});