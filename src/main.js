// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' 
import router from './router'
import store from './store/index'
import 'common/style/index.styl'
import 'common/style/animate.min.css'
import 'common/js/default.js'
import 'common/js/remAdaptation.js'
import FastClick from 'fastclick'
import * as filters from './filters'
import VueI18n from 'vue-i18n'
import Mint from 'mint-ui'
import VueTouch from "vue-touch"
import vueTouch from 'common/js/vueTouch'
import VueClipboards from 'vue-clipboard2'
import infiniteScroll from 'vue-infinite-scroll'
import Toasted from 'vue-toasted'
import 'mint-ui/lib/style.css'
// import animate from 'animate.css';
import LangEn from '../static/lang/en'
import LangZhCHS from '../static/lang/zhCHS'
import LangZhCHT from '../static/lang/zhCHT'

FastClick.attach(document.body)
Vue.use(Mint)
Vue.use(VueI18n)
Vue.use(VueClipboards)
Vue.use(Toasted);
Vue.use(VueTouch, { name:'v-touch' })
Vue.use(infiniteScroll);
Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//多语言
const i18n = new VueI18n({
  locale: localStorage.getItem('i18nLocale') || 'zh-CHS',
  messages: {
    'en': LangEn,
    'zh-CHS': LangZhCHS,
    'zh-CHT': LangZhCHT
  },
  silentTranslationWarn: true
})
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
}) 
