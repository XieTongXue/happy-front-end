import child_process from "child_process"
import process from "process"
import testConfig from "./config.json"
import * as utils from "./utils"
import * as types from "./interface"

let testList: Array<types.testConfig> = testConfig.list
let testRes: Array<types.resObj> = []

testRes = []

const excTest = async (config: Array<types.testConfig>) => {
  const mode = process.env.TEST_MODE
  utils.log("开始测试")
  let test_process = child_process.fork(`./dist/${mode}.js`)
  test_process.send(config)
  test_process.on("message", (res: types.resObj) => {
    testRes.push(res)
  })
  test_process.on("close", async () => {
    utils.log("准备发邮件/消息推送，内容：")
    console.log(utils.getResHtml(testRes))
    // 消息推送/邮件服务预留
    console.log('\n')
    console.log('开始推送...')
    await utils.sleep(2)
    utils.log("邮件/消息推送完毕")
    console.log('\n')
    const tips = mode === 'test-open' ? '页面打开' : mode === 'test-request' ? '页面初始化请求' : '搜索功能'
    utils.log(`${tips}测试完毕`)
    process.send({
      order: 'exit'
    })
  })
}

excTest(testList)
