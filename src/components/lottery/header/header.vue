<template>
  <div class="headers">
    <div class="back" @click="backRouter"></div>
    <div class="title">{{headerTitle}}</div>    
  </div>      
</template>

<script>

export default {
  props: {
    headerTitle: String
  },
  data() {
    return {

    }
  },
  methods: {
    backRouter() {
     this.$router.go('-1')
    }
  }
} 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/variable'
  .headers
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
    .title
      height: h = .44rem
      line-height: h
      font-size: 18px
      font-family: "PingFangSC"
      color: #fff
      text-align: center
</style>
