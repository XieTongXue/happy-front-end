import puppeteer from "puppeteer"
// import testConfig from "./config.json"
import child_process from "child_process"
import * as utils from "./utils"
import process from "process"
import * as types from "./interface"
import moment from "moment"
let listenRequestTimer: any = null
let count: number = 0
let globalObj: types.requestGlobalObj = {
  requestCount: 0,
}
const updateRequestCount = (): void => {
  globalObj.requestCount += 1
}

let testConfig: Array<types.testConfig> = []

const excTest = async () => {
  let testIndex: number = 1 // 任务列表id
  let noError: boolean = true // 测试结果
  let testTime = moment().format("HH_mm_ss") 
  let targetAjaxArr = testConfig[testIndex].ajax
  /**
   * 测试过程中发现错误后统一处理函数
   * @param content 错误内容
   * @param detail 错误详情
   */
  const testErr = async function (data: types.errContent) {
    noError = false
    if (data.detail.toString) {
      data.detail = data.detail.toString()
    }
    let res: types.resObj = {
      res: 0,
      url: testConfig[testIndex].url,
      name: testConfig[testIndex].name,
      resContent: data.content,
      resDetail: data.detail.substr(0, 100),
      time: testTime,
      listIndex: testIndex,
      imgName: utils.getResImageName(testTime),
    }
    await page.screenshot({
      path: `./log/${utils.getResImageName(testTime)}.jpeg`,
      type: "jpeg",
      quality: 40,
    })
    utils.log(`\n\n测试结果\n时间：${res.time}\n页面：${res.name}\n描述：${res.resContent || ""}-${res.resDetail || ""}\n`)
    process.send(res)
  }

  const testSucc = function () {
    let res: types.resObj = {
      res: 1,
      url: testConfig[testIndex].url,
      name: testConfig[testIndex].name,
      resContent: "测试通过",
      resDetail: "所有测试项完美通过",
      time: testTime,
      listIndex: testIndex,
    }
    utils.log(`\n\n测试结果\n时间：${res.time}\n页面：${res.name}\n描述：${res.resContent || ""}-${res.resDetail || ""}\n`)
    process.send(res)
  }

  /**
   * 测试接口是否正常调用的主方法
   * @param href 接口链接
   */
  const testAjaxParamsFn = async function (href: string) {
    if (targetAjaxArr[0].params.length > 0) {
      for (let i = 0; i < targetAjaxArr[0].params.length; i++) {
        if (!utils.getParams(href, targetAjaxArr[0].params[i])) {
          await testErr({ content: "接口参数异常", detail: `接口名：${targetAjaxArr[0].name}；参数名：${targetAjaxArr[0].params[i]}` })
          break
        }
      }
      if (noError) {
        utils.log(`接口测试参数通过：${targetAjaxArr[0].name}`)
        targetAjaxArr.splice(0, 1)
      }
    } else {
      utils.log(`接口测试参数通过：${targetAjaxArr[0].name}`)
      targetAjaxArr.splice(0, 1)
    }
  }

  const showResultAndClose = async function () {
    if (targetAjaxArr.length > 0 && noError) {
      let req = ''
      targetAjaxArr.forEach((item) => {
        req += ` ${item.name}`
      })
      await testErr({ content: "尚有接口未被调用", detail: `接口名：${req}` })
    }
    // 判断中途是否有错误
    if (noError) {
      testSucc()
    }
    await browser.close()
    process.exit(1)
  }
  const browser = await puppeteer.launch({
    headless: false, // 本地调试可打开这行看到浏览器
    defaultViewport: {
      width: 1200,
      height: 720,
    },
  })
  let page: any = await browser.newPage()
  await page.setRequestInterception(true)
  /**
   * 发出接口的响应，主要用来统计请求数
   */
  page.on("request", (request: any) => {
    updateRequestCount()
    request.continue()
  })

  /**
   * 接口发出成功的响应，用来统计请求数和对接口进行拦截校验
   */
  page.on("requestfinished", (response: any) => {
    let url = response.url()
    // 如果需要校验接口
    if (targetAjaxArr[0]) {
      let reg = new RegExp(targetAjaxArr[0].name)
      let res = reg.test(url)
      // 如果是这个接口，就校验参数
      if (res) {
        console.log(url)
        testAjaxParamsFn(url)
        targetAjaxArr.length === 0 && showResultAndClose()
      }
    }
  })

  noError = true
  utils.log(`测试内容：${testConfig[testIndex].name}`)
  page.goto(testConfig[testIndex].url).catch((res: any) => {
    testErr({ content: "页面打开异常", detail: res })
  })

  // check request
  Object.defineProperty(globalObj, "requestCount", {
    get: function () {
      return count
    },
    set: function (value) {
      checkRequestFinish()
      count = value
    },
  });
  const checkRequestFinish = function () {
    if (listenRequestTimer) {
      clearTimeout(listenRequestTimer)
    }
    listenRequestTimer = setTimeout(() => {
      console.log('请求总数' + count)
      showResultAndClose()
    }, 1000 * 10)
  }
}

process.on("message", async (config: Array<types.testConfig>) => {
  testConfig = config
  await excTest()
})
