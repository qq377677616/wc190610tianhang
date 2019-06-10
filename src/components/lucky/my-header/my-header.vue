<template>
  <div class="my-header flex-bet">
    <div class="left flex-cen" @click="goBack">
      <div class="back" ></div>
      <div class="balance flex-cen" @click.stop="handleTransfer">
        <img :src="ASSETSURL + '/lucky/images/icon_02.png'" alt="" />
        <div class="num">{{myBalance}}</div>
        <span>WLC</span>
      </div>
    </div>     
    <div class="right flex-cen">
      <div class="langs" @click="langSwitch"></div>
      <div :class="['audioControls', isMusicMuted ? 'on' : '']" @click="myMusicControls"></div>
      <div class="record" @click="jumpRecord"></div>
      <div class="rule" @click="jumpRule"></div>
    </div>
    <lang ref="langs"></lang>
    <!-- 划转弹框 -->
    <transfer ref="transferData" ></transfer>
  </div>      
</template> 

<script>
import bridge from '@/tools/bridge.js' 
import Lang from 'base/lang/lang'
import {mapState, mapMutations} from 'vuex'
import transfer from "@/components/common/transferDialog"
  export default {
    props: {
      myBalance: {
        type: String,
        default: 0
      } 
    },
    data(){
      return {
        showMask:false
      }
    },
    computed: {
      ...mapState({
        isMusicMuted: 'isMusicMuted',
        ASSETSURL: 'ASSETSURL'
      })
    },
    methods: {
      handleTransfer(){
        this.$refs.transferData.showMask = true
        this.$refs.transferData.showDialog = true
      },
      myMusicControls(){
        //this.$emit("musicControls")
        let _bgMusic = document.getElementById("music-back")
        if (this.isMusicMuted) {
          _bgMusic.play()
        } else {
          _bgMusic.pause()
        }
        this.musicControls(!this.isMusicMuted)
      },
      jumpRecord() {
        this.$emit("jumpRecord")
      },
      jumpRule() {
        this.$emit("jumpRule")
      },
      goBack(){
        if (typeof wayki != 'undefined') {
          wayki.finishActivity()
        } else {
          bridge.callhandler("notifyAppPop")
        }
      },
      langSwitch () {
        this.$refs.langs.langSwitch()
      },
      ...mapMutations({
        musicControls: 'musicControls'
      })
    },
    components: {
      Lang,transfer
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/variable'
  .my-header
    //position: fixed
    width: 100%
    padding: .08rem 0 .04rem
    left: 0
    top: 0
    // background:linear-gradient(180deg,rgba(22,107,206,1) 0%,rgba(1,132,208,1) 100%)
    // box-shadow:0px 3px 4px rgba(16,62,162,1)
    z-index: 500
    .left
      color: #fff
      .back
        width: .38rem
        height: .28rem
        background: url($ASSETSURL + '/lucky/images/icon_01.png') no-repeat center  
        background-size: .28rem
        margin-left: .04rem
      .balance
        margin-left: .14rem
        position: relative
        img
          width: .22rem
          height: .23rem
          margin-right: .04rem
          position: absolute
          left: -.11rem
          top: calc(50% - .115rem)
        .num
          font-size: .13rem  
          //width: 1.08rem
          padding:0 .16rem 0 .18rem
          height: .2rem
          line-height: .2rem
          background: #0C5DB7
          border-radius: .24rem
          text-align: center
        span
          font-size: .12rem   
          padding-left: .06rem
          color: #8ABEE1   
    .right
      div
        width: .28rem
        height: .28rem  
        background: url($ASSETSURL + '/lottery/images/icon_03.png') no-repeat center 
        background-size: 100%
        margin-left: .2rem
      .langs
        margin-left: 0
        background: none   
      .audioControls
        background-image: url($ASSETSURL + '/lottery/images/icon_12.png')
        margin-left: 0  
        &.on
          background-image: url($ASSETSURL + '/lottery/images/icon_12s.png')     
      .rule
        background-image: url($ASSETSURL + '/lottery/images/icon_04.png')
        margin-right: .1rem        
#mask {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>
