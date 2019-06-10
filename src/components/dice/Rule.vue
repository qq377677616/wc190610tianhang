<template>
  <div class="rule1">
    <div class="nav">
      <img :src="ASSETSURL+'/dice/image/back.png'" alt="" class="back" @click='back'>
      <span>{{$t('dice.rule[0]')}}</span>
    </div>
    <div class="title">{{$t('dice.rule[0]')}}</div>
    <div class="line">{{$t('dice.rule[1]')}}</div>
    <div class="section">
      <div class="block">
          <div class="l1">{{$t('dice.choose[2]')}}</div>
          <div style="width:4.26rem;" v-html="$t('dice.rule[2]')"></div>
      </div>
      <div class="block">
          <div class="l1">{{$t('dice.choose[1]')}}</div>
          <div style="width:4.26rem;" v-html="$t('dice.rule[3]')"></div>
      </div>
      <div class="block">
          <div class="l1">{{$t('dice.choose[0]')}}</div>
          <div style="width:4.26rem;" v-html="$t('dice.rule[4]')"></div>
      </div>
    </div>
    <div class="title">{{$t('dice.rule[5]')}}</div>
    <div class="line">{{$t('dice.rule[6]')}}</div>
    <div class="title">{{$t('dice.rule[7]')}}</div>
    <div class="line">
      {{$t('dice.rule[8]')}}
      <br/>
      {{$t('dice.rule[9]')}}
    </div>
    <div class="title">{{$t('dice.rule[10]')}}</div>
    <div class="line">{{$t('dice.rule[11]')}}</div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  mounted() {
    this.$store.commit('updateIsLoading',true);
  },
  destroyed() {
    this.$store.commit('updateIsLoading',false);
  },
  methods:{
    back() {
      this.$router.push('/dice')
    }
  },
  computed:{
    ...mapState({
        ASSETSURL: 'ASSETSURL'    
      })
  }
}
</script>

<style lang="scss">
@import '../../common/style/main.scss';
.rule1 {
  // width: 100%;
  background: #0C2932;
  line-height: 0.4rem;
  text-align: left;
  padding: 0 0.32rem;
  padding-top: 1.5rem;
  min-height: calc(100% - 1.5rem);
  width: calc(100% - 0.64rem)!important;
  .nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 0.88rem;
    background: #081F26;
    
    // position: relative;
    span {
      color: #70FF4D;
      font-size: 0.36rem;
      font-weight: bold;
      position: absolute;
      left:50%;
      top: 0.23rem;
      transform: translateX(-50%);
    }
  }
  .section {
    color: #568475;
    margin: 0.58rem 0;
    .block {
      display: flex;
      align-items: center;
    justify-content: space-between;
    margin-bottom: 0.38rem;
      .l1 {
        background-image: url('#{$url}/dice/image/bet-action-active.png');
        width: 1.92rem;
        height: 0.72rem;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #70FF4D;
        margin-right: 0.4rem;
      }
    }
  }
  .back {
    height: 0.88rem;
    width: 0.88rem;
  }
  .title {
    font-size: 0.28rem;
    font-weight: bold;
    color: #E0DCBC;
    margin-bottom: 0.2rem;
  }
  .line {
    font-size: 0.26rem;
    color: #568475;
    margin-bottom: 0.6rem;
  }
}
</style>
