var mongoose = require('mongoose');
var Mongoose=mongoose.connect('mongodb://127.0.0.1:27017/testManage', { useNewUrlParser: true });
module.exports = Mongoose;