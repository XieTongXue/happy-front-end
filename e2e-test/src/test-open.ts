import puppeteer from "puppeteer"
// import testConfig from "./config.json"
import * as utils from "./utils"
import process from "process"
import * as types from "./interface"
import moment from "moment"

let testConfig: Array<types.testConfig> = []

const excTest = async () => {
  let testResArr: Array<types.resObj> = []
  let testIndex: number = 0 // 任务列表id
  let testTime = moment().format("yyyy-MM-DD HH_mm_ss") // 测试时间
  const testErr = async function (data: types.errContent) {
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
    console.log('\n')
    utils.log(`测试结果\n时间：${res.time}\n页面：${res.name}\n描述：${res.resContent || ""}-${res.resDetail || ""}\n`)
    testResArr.push(res)
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
  utils.log(`测试内容：${testConfig[testIndex].name}`)

  const browser = await puppeteer.launch({
    headless: false, // 本地调试可打开这行看到浏览器
    defaultViewport: {
      width: 1200,
      height: 720,
    },
  })
  let page: any = await browser.newPage()
  utils.log(`准备打开页面`)

  await page.goto(testConfig[testIndex].url).then(() => {
    testSucc()
  }).catch(async (res: any) => {
    await testErr({ content: "页面打开异常", detail: res })
  })
  // await page.waitForTimeout(1000)
  await browser.close()
  process.exit(1)
}

process.on("message", async (config: Array<types.testConfig>) => {
  testConfig = config
  await excTest()
})
