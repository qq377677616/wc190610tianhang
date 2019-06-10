import axios from 'axios'
import bridge from '@/tools/bridge'
let REQUESTURL = '/api' //跨域请求代理

//接口请求头部配置// h5_undefined_cf07c37c-0fbc-4709-a260-08f9351747fd
let access_token = 'h5_official_5dc81639-7f9e-4ca7-abcf-d8a3bf26de80'
const device_uuid = 'ce2b347168ec4a9b8d45cefe7c34075e'
const lang = 'zh-CHS'
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.interceptors.request.use(
//   config => { 
//     config.headers.device_uuid = device_uuid
//     config.headers.lang = lang
//     config.headers.request_uuid = Math.random().toString(36).substr(2) + new Date().getTime() + Math.floor(Math.random() * 100000)
//     config.headers.user_timezone = (new Date().getTimezoneOffset() / 60) * -1
//     return config
//   },
//   error => {
//       return Promise.reject(error)
// })
if (process.env.NODE_ENV == 'development'){
  axios.interceptors.request.use(
    config => { 
      config.headers.access_token = access_token
      config.headers.device_uuid = device_uuid
      config.headers.lang = lang
      config.headers.request_uuid = Math.random().toString(36).substr(2) + new Date().getTime() + Math.floor(Math.random() * 100000)
      config.headers.user_timezone = (new Date().getTimezoneOffset() / 60) * -1
      return config
    },
    error => {
      return Promise.reject(error)
    })
} else {
  //REQUESTURL = 'http://allbet-game.wiccdev.org:9090/game'
  REQUESTURL = 'http://allbet-dev.wiccdev.org:9090/api'
  axios.interceptors.request.use(
  config => { 
    config.headers.device_uuid = device_uuid
    config.headers.lang = lang
    config.headers.request_uuid = Math.random().toString(36).substr(2) + new Date().getTime() + Math.floor(Math.random() * 100000)
    config.headers.user_timezone = (new Date().getTimezoneOffset() / 60) * -1
    return config
  },
  error => {
      return Promise.reject(error)
  })
}

// 添加响应拦截器
axios.interceptors.response.use((response)=> {
  // 对响应数据做点什么
  if (response.data.code === 2011) {
      if (typeof wayki != 'undefined' ) {
          wayki.loginOut(); 
      } else {
          bridge.callhandler('notifyAppSignOut', {token: localStorage.getItem('token'), code: response.data.code, api: response.config.url})
      }
  }
  return response;
}, (error)=> {
  return Promise.reject(error);
});

//暴露域名
export const SWITCHURL="http://allbet-dev.wiccdev.org:9090/"

//用户个人信息
export function getUserInfo() {
  let url = `${REQUESTURL}/game/lotoAccount/info`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//彩票-首页文字轮播
export function getCreateIssue() {
  let url = `${REQUESTURL}/game/lottery/carousel`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//彩票-当前期
export function getCurrentStage() {
  let url = `${REQUESTURL}/game/lottery/issue/current`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//彩票-购买彩票
export function purchase(data) {
  let url = `${REQUESTURL}/game/lottery/purchase`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//彩票-开奖记录
export function getAwardRecord(data) {
  let url = `${REQUESTURL}/game/lottery/issue/awardRecord`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//彩票-购彩记录
export function getRecord(data) {
  let url = `${REQUESTURL}/game/lottery/order/record`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//时时彩-是否为新用户
export function getIsNewUser() {
  let url = `${REQUESTURL}/game/lotoAccount/customer/stats`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//时时彩-获取当前彩期
export function getCurrentInstance() {
  let url = `${REQUESTURL}/game/ssc/currentInstance`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//时时彩-创建订单、购买彩票
export function ssc_purchase(data) {
  let url = `${REQUESTURL}/game/ssc/createOrder`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//时时彩-购彩记录
export function getBuyRecords(data) {
  let url = `${REQUESTURL}/game/ssc/buyRecords`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//时时彩-近期开奖记录
export function getRecentRecord(count) {
  let url = `${REQUESTURL}/game/ssc/lotoRecords/${count}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 摇骰子-首页信息
export function getHome(data) {
  let url = `${REQUESTURL}/game/dice/homepage`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 摇骰子-开奖记录
export function getDiceRecord(data) {
  let url = `${REQUESTURL}/game/dice/lottery`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 摇骰子-奖金池数据
export function getDiceJackpot(data) {
  let url = `${REQUESTURL}/game/dice/jackpot`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 摇骰子
export function getDiceTopprize(data) {
  let url = `${REQUESTURL}/game/dice/topprize`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 摇骰子-轮播信息
export function getDiceLoopplay(data) {
  let url = `${REQUESTURL}/game/dice/loopplay`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 摇骰子-获奖记录
export function getDiceHistory(data) {
  let url = `${REQUESTURL}/game/dice/queryWinBetHistory`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 摇骰子-下注记录
export function getDiceBetHistory(data) {
  let url = `${REQUESTURL}/game/dice/queryPersonalBetHistory`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 摇骰子-下注
export function diceBet(data) {
  let url = `${REQUESTURL}/game/dice/bet`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 3d-投注记录
export function get3dRecord(data) {
  let url = `${REQUESTURL}/game/threeD/order/record`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 3d-下注
export function threeBet(data) {
  let url = `${REQUESTURL}/game/threeD/purchase`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 3d-开奖记录
export function threeAwardRecord(data) {
  let url = `${REQUESTURL}/game/threeD/issue/awardRecord`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// 3d-当前期
export function get3dCurrent(data) {
  let url = `${REQUESTURL}/game/threeD/issue/current`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}

//划转-转账相关
export function  handleExchange(data) {
  let url = `${REQUESTURL}/ucenter/order/exchange`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//获取WLC的体育账户余额
export function getWLC(data) {
  let url = `${REQUESTURL}/bet/customer/getInfo/WLC`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//获取WLC的游戏账户余额
export function getLoto(data) {
  let url = `${REQUESTURL}/game/lotoAccount/info`
  return axios.get(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}