import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'

Vue.use(Router)

let router =  new Router({
  // mode: 'history',
  routes: [
  {
    path: '/lottery',
    name: 'lotterHome',
    component: resolve => require(['../components/lottery/home/home'], resolve),
  },
  {
    path: '/record',
    //name: 'record',
    component: resolve => require(['../components/lottery/record/record'], resolve),
    children: [{
      path: '/',
      name: 'lotteryHistory',
      component: resolve => require(['../components/lottery/lottery-history/lottery-history'], resolve),
    },
    {
      path: 'myRecord',
      name: 'myLotteryRecord',
      component: resolve => require(['../components/lottery/my-record/my-record'], resolve),
    }] 
  },
  {
    path: '/rule',
    name: 'lotteryRule',
    component: resolve => require(['../components/lottery/rule/rule'], resolve),
  }, 
  {
    path: '/lucky',
    name: 'lucky',
    component: resolve => require(['../components/lucky/home/home'], resolve)
  },
  {
    path: '/lucky/record',
    component: resolve => require(['../components/lucky/record/record'], resolve),
    children: [
    {
      path: '/',
      name: 'luckyMyRecord',
      component: resolve => require(['../components/lucky/my-record/my-record'], resolve),
    }] 
  },
  {
    path: '/lucky/rule',  
    name: 'luckyLotteryRule',
    component: resolve => require(['../components/lucky/rule/rule'], resolve),
  },
  {
    path: '/dice',
    name: 'diceHome',
    component: resolve => require(['../components/dice/Home'], resolve),
  },{
    path: '/diceRule',
    name: 'rule',
    component: resolve => require(['../components/dice/Rule'], resolve),
  },{
    path: '/3d',
    name: '3d',
    component: resolve => require(['../components/3d/Home'], resolve),
  },{
    path: '/3dRecord',
    name: '3dRecord',
    component: resolve => require(['../components/3d/Record'], resolve),
  },{
    path: '/3dRule',
    name: '3dRule',
    component: resolve => require(['../components/3d/Rule'], resolve),
  }],
})
router.beforeEach((to, from, next) => {
  console.log("to",to.query.token)
  // console.log('from',from)
  let str1 = ''
  let str2 = ''
  if(to.query.token){
     str1 = to.query.token.match(/(\S*)ABA/)[1];//token
     str2 = to.query.token.match(/ABA(\S*)/)[1];//lang
  }
 
  //获取token
  if (typeof wayki != 'undefined') {

    let toke = wayki.getToken()
    Axios.defaults.headers.common['access_token'] = toke;
  
    //console.log("token====Android",toke)
  } else {
    if(to.query.token){
      localStorage.setItem("token",str1)
    }
    Axios.defaults.headers.common['access_token'] = localStorage.getItem('token')
    
  }
  if(str2=='en'||str2=='zh-CHT' ||str2=='zh-CHS'){
    localStorage.setItem('i18nLocale',str2)
  }
  
  next()
})

export default router