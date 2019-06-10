<template>
  <div class="my-header">
    <div class="back" @click="backRouter"></div>
    <div class="tab-box flex-cen">
      <p>{{$t('lucky.myRecord_headerTitle')}}</p>
    </div>    
  </div>      
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      //curIndex: 0,
      curLeft: "25%"
    }
  },
  methods: {
    created() {
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
    background: #1E7BDE
    box-shadow:0px 2px 0px rgba(19,109,206,1)
    z-index: 500
    .back
      width: .28rem
      height: 100%
      background: url($ASSETSURL + '/lucky/images/icon_01.png') no-repeat center  
      background-size: 100%
      margin-left: .04rem
      position: absolute
      left: 0
      top: 0
    .tab-box
      p
        padding: .1rem 0
        font-size: .18rem
        color: #fff
        height: .25rem
        line-height: .25rem
        position: relative   
</style>
