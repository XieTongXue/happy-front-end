import axios from 'axios'

var blogApi = {}

var instance = axios.create({
  baseURL: '/api',
  transformResponse: [function (data) {
    return data
  }],
  withCredentials: true,
  responseType: 'json',
  validateStatus: function (status) {
    return status >= 200 && status < 300
  }
})

// 用户注册
blogApi.register = function (params) {
  return instance.post('/register', params)
}

// 用户登录
blogApi.login = function (params) {
  return instance.post('/login', params)
}

// 发表博客
blogApi.setBlog = function (params) {
  return instance.post('/setBlog', params)
}

blogApi.getBlogs = function () {
  return instance.post('/getBlogs')
}

export default blogApi
