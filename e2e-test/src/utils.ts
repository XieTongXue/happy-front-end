import monent from "moment"
import fs from "fs"
import * as types from "./interface"
/**
 * 等待
 * @param time 等待时间
 */
export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time * 1000)
  })
}

/**
 * 获取地址上的某一个参数
 * @param url 地址
 * @param name 参数名
 */
export const getParams = (url: string, name: string): string => {
  var urlArr: Array<string> = url.split("?")
  if (urlArr.length < 2) {
    return null
  }
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  var r = urlArr[1].match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

export const log = function (text: string) {
  console.log(`${monent().format("HH:mm:ss")}  ${text}`)
}


export const readImage = function (name: string): Promise<types.ajaxImgRes> {
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

/**
 * 获取邮件内容文本
 * @param resArr 测试结果对象数组
 */
export const getResHtml = function (resArr: Array<types.resObj>): string {
  let html: string = ""
  resArr.map((item) => {
    html += `<h2>${item.name}</h2>${item.res == 1 ? `<h4>测试结果：<span style="green">通过</span></h4>` : `<h4>测试结果：<span style="color:red">不通过</span></h4>`}<h4>测试时间：${
      item.time
    }</h4><h4>测试描述：${item.resContent || ""}</h4><h4>详细描述：${item.resDetail || ""}</h4><h4>测试内容地址：${item.url}</h4>${
      item.imgName ? `<p><img style="width:50%" src="http://localhost:2333/image?name=${item.imgName}"/></p>` : ""
    }<br/><br/>`
  })
  return html
}

/**
 * 获取截图名称
 * @param time 测试时间
 */
export const getResImageName = function (time: string) {
  return `${monent().format("YYYY_MM_DD")}_${time}`
}
