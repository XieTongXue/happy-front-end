/**
 * 结果对象格式
 */
export interface resObj {
  resContent: string
  name: string
  resDetail: string
  url: string
  res: number
  time: string
  listIndex: number
  imgName?: string
}

/**
 * 测试内容格式
 */
export interface targetObj {
  name: string
  params: Array<string>
}

/**
 * 接口模块的对象格式
 */
export interface requestGlobalObj {
  requestCount: number
}

/**
 * 测试动作对象格式
 */
export interface actionObj {
  type: string
  selector?: string
  text?: string
}

/**
 * 错误信息对象格式
 */
export interface errContent {
  content: string
  detail: string
}

// 测试文件配置化格式
export interface testConfig {
  url: string
  name: string
  ajax?: Array<targetObj>
  action?: Array<actionObj>
}

export interface ajaxRes {
  type: string
  data: any
}

export interface ajaxImgRes {
  res: number
  data: any
}

export interface exitObj {
  order: string
}