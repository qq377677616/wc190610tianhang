<template>
  <div class="my-header">
    <div class="back" @click="backRouter"></div>
    <div :class="['tab-box', 'flex-cen', langs ? 'en' : '']">
      <p v-for="(item, index) in tabList" :class="[curIndex == index ? 'cur' : '']" :data-index="index" @click="switchTab">{{item}}<span v-if="index == 0" :style="{left: 100 * curIndex + 25 +'%'}"></span></p>
    </div>    
  </div>      
</template>

<script>
import { mapState } from 'vuex'  
export default {
  props: {
    tabList: Array,
    curIndex: Number
  },
  data() {
    return {
      //curIndex: 0,
      curLeft: "25%"
    }
  },
  computed: {
    ...mapState({
      langs: 'langs'
    })
  },
  methods: {
    created() {
      console.log(this.tabList)
    },
    backRouter() {
      this.$emit('switch', {index: -1})
      //this.curIndex = 0
      //this.$router.push('/')
    },
    switchTab(e) {
      //this.curIndex = e.target.dataset.index
      this.$emit('switch', {index: parseInt(e.target.dataset.index)})
      //this.curIndex = _curInde
      //this.curLeft = 100 * _curInde + 25 +'%'
    }
  }
} 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/variable'
  .my-header
    position: relative
    width: 100%
    left: 0
    top: 0
    background:linear-gradient(180deg,rgba(46,110,247,1) 0%,rgba(37,89,201,1) 100%)
    box-shadow:0px 3px 4px rgba(16,62,162,1)
    z-index: 500
    .back
      width: .28rem
      height: 100%
      background: url($ASSETSURL + '/lottery/images/icon_01.png') no-repeat center  
      background-size: 100%
      margin-left: .04rem
      position: absolute
      left: 0
      top: 0
    .tab-box
      p
        padding: .12rem .15rem
        font-size: .14rem
        color: #94B0ED
        height: .2rem
        line-height: .2rem
        position: relative
        span
          content: ""
          display: block
          width: 50%
          height: .03rem
          background: #E86B40
          position: absolute
          bottom: 0
          transition: all .3s  
      p.cur
        color: #fff
      &.en p
        width: 1.1rem
        padding: .12rem 0   
        white-space: nowrap
        font-size: .12rem 
</style>
