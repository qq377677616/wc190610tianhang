<template>
  <div class="rule">
    <headers :header-title="$t('lottery.rule_headerTitle')"></headers>
    <div class="rule-con">
      <scroll class="scroll-rule" ref="scrollRule">
        <ul class="rule-box"> 
          <li class="explain">
            <h3>{{$t('lucky.rule_ulLi1[0]')}}</h3>
            <p>{{$t('lucky.rule_ulLi1[1]')}}</p>    
            <p><span>{{$t('lucky.rule_ulLi1[2]')}}</span>{{$t('lucky.rule_ulLi1[3]')}}</p>    
          </li>
          <li>
            <h3>{{$t('lucky.rule_ulLi2[0]')}}</h3>
            <p><span>{{$t('lucky.rule_ulLi2[1]')}}</span>{{$t('lucky.rule_ulLi2[2]')}}</p>     
            <p><span>{{$t('lucky.rule_ulLi2[3]')}}</span>{{$t('lucky.rule_ulLi2[4]')}}</p>     
            <p><span>{{$t('lucky.rule_ulLi2[5]')}}</span>{{$t('lucky.rule_ulLi2[6]')}}</p>
            <p><span>{{$t('lucky.rule_ulLi2[7]')}}</span>{{$t('lucky.rule_ulLi2[8]')}}</p>
            <p><span>{{$t('lucky.rule_ulLi2[9]')}}</span>{{$t('lucky.rule_ulLi2[10]')}}</p>
            <p><span>{{$t('lucky.rule_ulLi2[11]')}}</span>{{$t('lucky.rule_ulLi2[12]')}}</p>
            <p><span>{{$t('lucky.rule_ulLi2[13]')}}</span>{{$t('lucky.rule_ulLi2[14]')}}</p>
            <p><span>{{$t('lucky.rule_ulLi2[15]')}}</span>{{$t('lucky.rule_ulLi2[16]')}}</p>    
          </li>
          <li>
            <h3>{{$t('lucky.rule_ulLi3[0]')}}</h3>
            <p>{{$t('lucky.rule_ulLi3[1]')}}<br/>{{$t('lucky.rule_ulLi3[2]')}}<br/>{{$t('lucky.rule_ulLi3[3]')}}<br/>{{$t('lucky.rule_ulLi3[4]')}}</p>  
          </li>    
          <li>
            <h3>{{$t('lucky.rule_ulLi4[0]')}}</h3>
            <p>{{$t('lucky.rule_ulLi4[1]')}}<br/>{{$t('lucky.rule_ulLi4[2]')}}<br/>{{$t('lucky.rule_ulLi4[3]')}}</p>  
            <h4>{{$t('lucky.rule_ulLi4[4]')}}</h4>
          </li> 
        </ul>    
      </scroll>    
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Headers from 'components/lucky/header/header'
import Scroll from 'base/scroll/scroll'
  export default {
    components: {
      Headers,
      Scroll    
    },
    beforeCreate() {

    },
    activated() {
      this.$refs.scrollRule.refresh()
    },
    mounted() {
      //this.$refs.scrollRule.refresh()
      //setTimeout(() => {this.$refs.scrollRule.refresh()}, 2000 )
    },
    methods: {
      
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/mixin'
@import '~common/style/variable'
  .rule
    height: h = 100%
    background: #136DCE
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
        padding: .3rem .16rem .1rem
        font-family: "PingFangSC"
        li
          margin-bottom: .26rem    
          h3
            height: h = .2rem
            line-height: h
            font-size: .15rem
            color: #fff
            margin-bottom: .08rem
          h4
            height: h = .17rem
            line-height: h
            font-size: .13rem
            color: #fff
            margin-top: .1rem    
          &>p
            font-size: .12rem
            line-height: .2rem
            color: rgba(137,182,230,1)
            margin-bottom: .08rem
            span
              //color: #fff  
              color: rgba(255,255,255,.9)                                             
</style>
