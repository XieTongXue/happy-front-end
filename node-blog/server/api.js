const models = require('./db')
const express = require('express')
const router = express.Router()

// 注册接口
router.post('/api/register',(req, res) => {
  let account = new models.Account({
    username : req.body.username,
    password : req.body.password
  })
  // 保存账号数据进mongoDB
  account.save((err,data) => {
    if (err) {
      res.send(err)
    } else {
      res.send('注册成功')
    }
  })
})

// 登录接口
router.post('/api/login', (req, res) => {
  let account = {
    username: req.body.username,
    password: req.body.password
  }
  // 通过模型去查找数据库
  models.Account.findOne(account, (err, data) => {
    if (!data) {
      res.send({result: 0})
    } else {
      res.send(Object.assign({}, {result: 1}, account))
    }
  })
})

// 获取博客
router.post('/api/getBlogs', (req, res) => {
  models.Blog.find((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// 添加博客
router.post('/api/setBlog', (req, res) => {
  let blog = new models.Blog({
    title: req.body.title,
    content: req.body.content
  })
  // 保存博客到数据库
  blog.save((err,data) => {
    if (err) {
      res.send(err)
    } else {
      res.send('成功发表博客')
    }
  })
})

module.exports = router