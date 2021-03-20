import http from "http"
import child_process from "child_process"
import request from "request"
import * as utils from "./utils"
import url from "url"
import * as types from "./interface"

http.createServer(async (request: any, response: any) => {
  let urlInfo = url.parse(request.url)
  console.log('开始测试')
  if (urlInfo.pathname === '/test') {
    let test_process = child_process.fork("./dist/index.js")
    test_process.on("message", (res: types.exitObj) => {
      if (res.order === 'exit') {
        utils.log('结束测试进程')
        process.exit()
      }
    })
  }
}).listen(2332)
console.log("Test Server running at http://localhost:2332/")

request("http://localhost:2332/test")
