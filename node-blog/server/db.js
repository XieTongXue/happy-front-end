const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));

// 定义模式accountSchema
const accountSchema = mongoose.Schema({
  username: String,
  password: String
});

// 定义模式blogSchema

const blogShema = mongoose.Schema({
  title: String, 
  content: String
})

// 定义模型Models
const Models = {
  Account: mongoose.model('Account', accountSchema),
  Blog: mongoose.model('Blog', blogShema)
}


module.exports = Models;