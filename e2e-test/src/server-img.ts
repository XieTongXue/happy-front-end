import http from "http"
import * as utils from "./utils"
import url from "url"
import fs from "fs"
import * as types from "./interface"

const readImage = function (name: string): Promise<types.ajaxImgRes> {
  return new Promise((resolve) => {
    if (!name) {
      resolve({
        res: 0,
        data: "图片不存在",
      })
    }
    fs.readFile(`./log/${name}.jpeg`, function (err: any, data: any) {
      if (err) {
        resolve({
          res: 0,
          data: err,
        })
      } else {
        resolve({
          res: 1,
          data: data,
        })
      }
    })
  })
}

http.createServer(async (request: any, response: any) => {
    let urlInfo = url.parse(request.url)

    let returnRes: types.ajaxRes = {
      type: "application/json",
      data: '',
    }
    console.log(urlInfo.pathname)
    if (urlInfo.pathname === '/image') { 
        let res: types.ajaxImgRes = await readImage(utils.getParams(urlInfo.search, 'name'))
        if (res.res) {
            returnRes.type = "image/jpeg"
            returnRes.data = res.data
        } else {
            returnRes.data = JSON.stringify({
            res: 0,
            msg: res.data,
          })
        }
    }
    response.writeHead(200, { "Content-Type": returnRes.type })
    response.end(returnRes.data)
}).listen(2333)
console.log("Img Server running at http://localhost:2333/")
