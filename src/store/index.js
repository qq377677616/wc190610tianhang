import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  langs: '',//语言
  myBalance: 0,//我的余额
  isLoading: false,//是否已加载完页面
  isMusicMuted: true,//是否静音
  ASSETSURL: 'https://res.whatthebet.com/games/assets'//静态资源CDN地址
}
const mutations = {
  setLang(state, data) {
    state.langs = data
  },
  updateBalance(state, data) {
    state.myBalance = data.myBalance
  },
  updateIsLoading(state, data) {
    state.isLoading = data
  },
  musicControls(state, data) {
    state.isMusicMuted = data
  }
}

export default new Vuex.Store({
  state,
  mutations
})