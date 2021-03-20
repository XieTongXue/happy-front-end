import puppeteer from "puppeteer"
// import testConfig from "./config.json"
import * as utils from "./utils"
import process from "process"
import * as types from "./interface"
import moment from "moment"

let testConfig: Array<types.testConfig> = []

const excTest = async () => {
  let testIndex: number = 2 // 任务列表id
  let noError: boolean = true // 测试结果
  let testTime = moment().format("HH_mm_ss")
  let actionArr = testConfig[testIndex].action
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
  const closeAndExit = async function () {
    // await page.waitForTimeout(2000)
    await browser.close()
    process.exit(1)
  }

  const browser = await puppeteer.launch({
    headless: false, // 本地调试可打开这行看到浏览器
    defaultViewport: {
      width: 1200,
      height: 720,
    },
    slowMo: 500
  })
  utils.log(`测试内容：${testConfig[testIndex].name}`)
  let page: any = await browser.newPage()
  page.goto(testConfig[testIndex].url).catch((res: any) => {
    testErr({ content: "页面打开异常", detail: res })
  })

  for (let i = 0; i < actionArr.length && noError; i++) {
    switch(actionArr[i].type) {
      case 'wait':
        await page
        .waitForSelector(actionArr[i].selector, {
          timeout: 10000
        })
        .then(() => {
          utils.log(`内容${actionArr[i].selector}出现`)
          if (i === actionArr.length - 1) {
            testSucc()
          }
        })
        .catch(async(err :any) => {
          await testErr({ content: `等待${actionArr[i].selector}异常`, detail: err })
          noError = false
          closeAndExit()
        })
        break
      case 'input':
        await page
        .type(actionArr[i].selector, actionArr[i].text)
        .then(() => {
          utils.log(`往${actionArr[i].selector}输入内容成功`)
        })
        .catch(async(err :any) => {
          await testErr({ content: `往${actionArr[i].selector}输入内容出错`, detail: err })
          noError = false
          closeAndExit()
        })
        break
      case 'click':
        await page
        .click(actionArr[i].selector)
        .then(() => {
          utils.log(`点击${actionArr[i].selector}成功`)
        })
        .catch(async(err :any) => {
          await testErr({ content: `点击${actionArr[i].selector}失败`, detail: err })
          noError = false
          closeAndExit()
        })
        break
      default:
        break
    }
  }
  closeAndExit()
}

process.on("message", async (config: Array<types.testConfig>) => {
  testConfig = config
  await excTest()
})
