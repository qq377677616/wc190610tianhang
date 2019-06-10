<template>
  <div class="record container">
    <header-record :tab-list="$t('lottery.history_tabList')" :cur-index="curIndex" @switch="headerSwitch"></header-record>
    <!-- <transition :name="transitionRouter"> -->
    <transition>
      <keep-alive><router-view class="router-view" v-swipeleft="swipeleft" v-swiperight="swiperight"/></keep-alive>
    </transition>
  </div>  
</template>  

<script>
  import HeaderRecord from 'components/lottery/header-record/header-record'
  export default {
    data() {
      return {
        curIndex: 0,
        transitionRouter: ''
      }    
    }, 
    activated() {
    },
    methods: {
      headerSwitch(e) { 
        if (e.index == -1) {
          this.curIndex = 0
          this.$buryPoint("clickBack", "幸运彩-历史记录页面左上角按钮", "幸运彩从历史记录点击左上角返回按钮到首页")
          this.$router.push('/lottery')
          return
        }
        this.curIndex = e.index
        if (e.index == 0) {
          this.transitionRouter =  "router-left" 
          this.$buryPoint("clickToview", "幸运彩-历史记录-开奖历史导航按钮", "幸运彩点击头部导航“开奖历史”切换到开奖历史界面")
          this.$router.push('../record')    
        } else if (e.index == 1) {
          this.transitionRouter =  "router-right"
          this.$buryPoint("clickToview", "幸运彩-历史记录-我的记录导航按钮", "幸运彩点击头部导航“我的记录”切换到我的记录界面")
          this.$router.push('../record/myRecord')    
        }   
      },
      swipeleft() {
        let _curIndex = 1
        if (this.curIndex == _curIndex) return
        this.curIndex = _curIndex
        this.$buryPoint("touchToview", "幸运彩-历史记录-手指左滑界面切换", "幸运彩手指在界面中心左滑切换到我的记录界面")
        this.headerSwitch({index: _curIndex})
      },
      swiperight() {
        let _curIndex = 0
        if (this.curIndex == _curIndex) return
        this.curIndex = _curIndex
        this.$buryPoint("touchToview", "幸运彩-历史记录-手指右滑界面切换", "幸运彩手指在界面中心右滑切换到开奖历史界面")
        this.headerSwitch({index: _curIndex})
      }, 
    },
    components: {
      HeaderRecord   
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    background:linear-gradient(180deg,rgba(39,91,203,1) 0%,rgba(7,53,154,1) 100%)
    color: #fff 
    font-size: 0
    height: 100vh 
    overflow: hidden
  .router-view
    //transition: all .5s cubic-bezier(.55,0,.1,1)
    width: 100%
    position: absolute
 .router-right-enter, .router-left-leave-active
   opacity: 0
   transform: translate(100%, 0)
 .router-right-leave-active, .router-left-enter
   opacity: 0
   transform: translate(-100%, 0)                          
</style>
