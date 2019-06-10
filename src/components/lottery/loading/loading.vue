<template>
  <div class="loading flex-cen">
    <div class="loading-box">
      <div class="loading-icon">
        <img :src="ASSETSURL + '/lottery/images/loading_01.png'" alt="" class="machine"/>   
        <div class="ticket">
          <div class="ticket-box"></div>    
        </div> 
      </div> 
      <div class="progress-num">
        <div class="progress"><div class="progress-box"><div class="progress-bar" :style="{width: progress + '%'}"></div></div></div>
        <div class="num">{{progress}}%</div>      
      </div>   
    </div>      
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        progressSpeed: 25,
        progressSpeed2: 20,
        progressSpeed3: 15,
        progress: 0,
        progress1: 34,
        progress2: 70,    
        progress3: 100,
        interval_progressStart: null,
        interval_progressComplete: null
      }    
    },
    created() {
      this.progressStart()    
    },
    computed: {
      ...mapState({
        ASSETSURL: 'ASSETSURL'
      })
    },
    methods: {
      progressStart() {
        this.interval_progressStart = setInterval(() => {
          if (this.progress < this.progress2) {
            this.progress++    
            if (this.progress > this.progress1) {
              this.progressSpeed = this.progressSpeed2
            }  
          } else {
            clearInterval(this.interval_progressStart)
          }  
        }, this.progressSpeed)
      },
      progressComplete() {
        if (this.interval_progressStart) {
          clearInterval(this.interval_progressStart)
        } 
        this.interval_progressComplete = setInterval(() => {
          if (this.progress < this.progress3) {
            this.progress++     
          } else {
            clearInterval(this.interval_progressComplete)
            this.$emit('loadingOk')
          }  
        }, this.progressSpeed3) 
      }    
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/mixin'
@import '~common/style/variable'
  .loading
    absolute-full(2000)
    background: #103EA3
    .loading-icon
      width: .78rem
      position: relative
      font-size: 0
      margin: 0 auto
      &::after
        content: ''
        display: block
        width: .24rem
        height: .19rem
        back-image($ASSETSURL + '/lottery/images/loading_03.png')
        position: absolute
        right: -.01rem
        top: .1rem
        animation: breathing-lamp .5s infinite alternate
      img
        width: 100%
        height: 100%
      .ticket
        width: w =.645rem
        height: 0
        position: absolute
        left: 50%
        transform: translateX(-50%)
        top: .49rem
        overflow: hidden
        animation: auto-height 2s linear infinite
        .ticket-box
          width: w
          height: .39rem
          position: absolute
          left:0
          bottom: 0
          back-image($ASSETSURL + '/lottery/images/loading_02.png')
    .progress-num
      margin-top: .28rem
      text-align: center
      .progress
        width: 2.58rem
        height: .13rem
        back-image($ASSETSURL + '/lottery/images/loading_04.png')
        position: relative
        .progress-box
          width: 96.5%  
          height: 60%
          position: absolute
          left: 2%
          top: 15%
          .progress-bar
            height: 100%
            position: absolute
            left: 0
            top: 0
            background: linear-gradient(180deg, #F07012, #FF9C77, #EF6D40, #B94D28, #DE734E)
            border-radius: .01rem 0 0 .01rem
          //background: url('../../../assets/lottery/images/loading_05.png') repeat-x left center 
      .num
        height: h =.25rem  
        line-height: h
        padding-top: .07rem
        font-size: .2rem
        font-family: DIN
        font-weight: bold
        color: rgba(254,254,254,1)
  @keyframes auto-height
    0% 
      height: 0
    80%
      height: .39rem    
    100%
      height: .39rem         
                                          
</style>
