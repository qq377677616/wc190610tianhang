<template>
  <div class="rule">
    <headers :header-title="$t('lottery.rule_headerTitle')"></headers>
    <div class="rule-con">
      <scroll class="scroll-rule" ref="scrollRule">
        <ul class="rule-box">
          <li class="explain">
            <h3>{{$t('lottery.rule_ulLi1[0]')}}</h3>
            <p>{{$t('lottery.rule_ulLi1[1]')}}</p>    
          </li>
          <li class="proportion">
            <h3>{{$t('lottery.rule_ulLi2[0]')}}</h3>
            <dl :class="[langs == 'en' ? 'en' : '']">
              <dd><p>{{$t('lottery.rule_ulLi2[1]')}}</p><p>{{$t('lottery.rule_ulLi2[2]')}}</p><p>{{$t('lottery.rule_ulLi2[3]')}}</p></dd>    
              <dd><p>1</p><p>50%</p><p>{{$t('lottery.rule_ulLi2[4]')}}</p></dd>    
              <dd><p>2</p><p>25%</p><p>{{$t('lottery.rule_ulLi2[4]')}}</p></dd>    
              <dd><p>3</p><p>12.5%</p><p>{{$t('lottery.rule_ulLi2[4]')}}</p></dd>    
              <dd><p>4</p><p>6%</p><p>{{$t('lottery.rule_ulLi2[4]')}}</p></dd>    
              <dd><p>5</p><p>3%</p><p>{{$t('lottery.rule_ulLi2[4]')}}</p></dd>    
            </dl>
            <h4>{{$t('lottery.rule_ulLi2[5]')}}</h4>    
          </li>
          <li class="number">
            <h3>{{$t('lottery.rule_ulLi3[0]')}}</h3>
            <p>{{$t('lottery.rule_ulLi3[1]')}}</p> 
            <h4>{{$t('lottery.rule_ulLi3[2]')}}</h4>   
          </li>    
        </ul>    
      </scroll>    
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Headers from 'components/lottery/header/header'
import Scroll from 'base/scroll/scroll'
import { mapState } from 'vuex'
  export default {
    activated() {
      this.$refs.scrollRule.refresh()
      //setTimeout(() => {this.$refs.scrollRule.refresh()}, 2000 )
    },
    computed: {
      ...mapState({
        langs: 'langs'
      })
    },
    components: {
      Headers,
      Scroll    
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/mixin'
@import '~common/style/variable'
  .rule
    height: h = 100%
    background: #1849B4
    text-align: left
    .rule-con
      position: absolute
      width: 100%
      left: 0
      top: .44rem
      bottom: 0
      .scroll-rule
        height: 100%
        overflow: hidden
      .rule-box
        padding: .3rem .16rem .3rem
        font-family: "PingFangSC"
        li
          margin-bottom: .3rem    
          h3
            height: h = .2rem
            line-height: h
            font-size: .14rem
            color: #fff
            margin-bottom: .08rem
          h4
            height: h = .17rem
            line-height: h
            font-size: .12rem
            color:rgba(232,107,64,1)
            margin-top: .1rem    
          &>p
            font-size: .12rem
            line-height: .2rem
            color: rgba(120,162,253,1)
          dl
            &.en dd:first-child~dd
              height: auto
            &.en dd:first-child~dd p
              line-height: .4rem
            &.en dd:first-child~dd p:last-child
              line-height: .16rem
              padding: .04rem 0     
            dd
              height: h = .28rem
              line-height: h
              font-size: .12rem
              color: rgba(120,162,253,1)
              text-align: center
              background: #103FA6
              &:first-child
                background: #052B7B
                height: h = .28rem
                line-height: h
              &:nth-child(2n)
                background: #09369A        
              p
                display: inline-block
                vertical-align: top
                width: 40% 
                &:first-child
                  width: 20%
              &:first-child~dd p:last-child
                color: rgba(69,125,245,1)
          &.number
            margin-bottom: .1rem   
            p:last-child
              margin-top: .05rem                                               
</style>
