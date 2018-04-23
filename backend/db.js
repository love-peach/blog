var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var DB_URL = 'mongodb://localhost:27017/blog';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log(`Mongoose 已连接数据库 ${DB_URL}`);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log(`Mongoose 连接出错: ${err}`);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose 连接关闭');
});

module.exports = mongoose;
