<template>
  <div class="loading flex-cen">
    <div class="loading-box">
      <div class="loading-icon">
        <img :src="ASSETSURL + '/lucky/images/loading_01.png'" alt="" class="machine"/>   
        <img :src="ASSETSURL + '/lucky/images/loading_01s.png'" alt="" class="machine"/>   
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
    background: #156BCE
    .loading-icon
      width: .6rem
      height: .6rem
      position: relative
      font-size: 0
      margin: 0 auto
      border-radius: 50%
      box-shadow: 0 0 .8rem 4px #fff
      animation: breathingLamp2 .6s alternate infinite linear
      img
        width: .74rem
        height: .74rem
        abs-cen()
        animation: breathingLamp .6s alternate infinite linear
        &:last-child
          opacity: 0
          animation-delay: .6s
    .progress-num
      margin-top: .42rem
      text-align: center
      .progress
        width: 2.61rem
        height: .17rem
        back-image($ASSETSURL + '/lucky/images/loading_02.png')
        position: relative
        .progress-box
          width: 96.5%  
          height: 42%
          position: absolute
          left: 2%
          top: 16%
          .progress-bar
            height: 100%
            position: absolute
            left: 0
            top: 0
            background: linear-gradient(180deg, #FBBB24, #F4E271, #FE9E04, #C75806, #DE734E)
            border-radius: .04rem
          //background: url('../../../assets/lottery/images/loading_05.png') repeat-x left center 
      .num
        height: h =.25rem  
        line-height: h
        padding-top: .07rem
        font-size: .2rem
        font-family: DIN
        font-weight: bold
        color: rgba(254,254,254,1)
  @keyframes breathingLamp
    0%
      opacity: 0
    100%
      opacity: 1
  @keyframes breathingLamp2
    0%
      box-shadow: 0 0 1rem 4px #FE8800                    
    100%
      box-shadow: 0 0 1rem 4px #fff
</style>
