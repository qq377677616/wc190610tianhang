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
      this.$router.push('/lucky')
      
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
    background: rgba(30,123,222,1)
    box-shadow: 0px 2px 0px rgba(19,109,206,1)
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
    .title
      height: h = .44rem
      line-height: h
      font-size: 18px
      font-family: "PingFangSC"
      color: #fff
      text-align: center
</style>
