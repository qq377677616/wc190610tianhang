<template>
  <div class="record">
    <div class="record-list" v-if="isRecord"> 
      <scroll class="scroll-record" ref="scrollRecord" :pulldown="isPullup" @pulldown="pulldown" :pullup="isPullup" @scrollToEnd="myScrollToEnd" :data="recordList">
        <ul>
          <li v-for="(item, index) in recordList" :class="[langs == 'en' ? 'en' : '']">
            <div class="title flex-bet">
              <div :class="['h3', langs != 'en' ? 'flex-ali' : 'en']"> 
                <strong>{{item.betRule | betRuleSwitch($t('lucky.home_title1'))}}</strong>
                <div class="num">
                  <template v-if="item.betRule == 100 || item.betRule == 200 || item.betRule == 400 || item.betRule == 600">
                    <span v-if="item.w.length != 0">{{item.w.join('')}}</span>
                    <span v-if="item.q.length != 0">{{item.q.join('')}}</span>
                    <span v-if="item.b.length != 0">{{item.b.join('')}}</span>
                    <span v-if="item.s.length != 0">{{item.s.join('')}}</span>
                    <span v-if="item.g.length != 0">{{item.g.join('')}}</span>
                  </template>
                  <template v-if="item.betRule == 300 || item.betRule == 310 || item.betRule == 500">
                    <span v-for="items in item.groupNumbers">{{items}}</span>
                  </template>
                  <template v-if="item.betRule == 700">
                    <span>{{switchNumber(item.tensPlaceOption.join(''), langs)}}</span>
                    <span>{{switchNumber(item.unitOption.join(''), langs)}}</span>
                  </template>
                </div>
              </div>
              <p :class="[item.status == 300 ? 'on' : '']">
                <span v-if="item.betStatus != 400">
                  <template v-if="item.status == 100">{{$t('lucky.home_title9[7]')}}</template>
                  <template v-if="item.status == 200">{{$t('lucky.home_title9[8]')}}</template>
                  <template v-if="item.status == 300">+{{item.awardAmount}}WLC</template>
                  <template v-if="item.status == 310">{{$t('lucky.home_title9[9]')}}</template>
                  <template v-if="item.status == 900">{{$t('lucky.home_title9[10]')}}</template>
                  <template v-if="item.status == 910">{{$t('lucky.home_title9[11]')}}</template>
                </span>
                <span v-if="item.betStatus == 400">{{item.awardLevel | chineseCharacters}}等奖&nbsp;+{{item.winAmount || '****'}}</span>
              </p>
            </div>
            <dl>
              <dd class="stage flex-bet"><div class="flex-ali"><p>{{item.instanceDisplayNum}}{{$t('lucky.home_title9[0]')}}</p><p>{{$t('lucky.home_title9[1]')}}{{item.betItemCount}}{{$t('lucky.home_title9[2]')}}</p><p>{{item.multiple}}{{$t('lucky.home_title9[3]')}}</p></div><div class="money">{{$t('lucky.home_title9[4]')}}{{item.amount}}&nbsp;WLC</div></dd>
              <dd class="flex-bet"><p>{{$t('lucky.home_title9[5]')}}{{item.createdAt}}</p><p>{{$t('lucky.home_title9[6]')}}{{item.awardNumber ? item.awardNumber : '--'}}</p></dd>
            </dl>
          </li>
          <li class="loading-container" v-show="recordList.length > 0">
            <loading :title="isMore ? $t('lucky.others[0]') : $t('lucky.others[1]')"></loading>
          </li>
        </ul>
      </scroll>
    </div> 
    <div class="not-record flex-cen" v-if="!isRecord">
      <div>
        <p>暂无记录</p>
        <div class="btn" @click="backHome">{{$t('lucky.myRecord_title1')}}</div>
      </div>
    </div>
    <div v-show="isLoadingList" class="loading-con flex-cen"><loading is-full="1" is-icon="1"></loading></div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { mapState } from 'vuex'
  import { ERR_Ok, ERR_WAIT, TOAST } from 'api/config'
  import { getBuyRecords } from "api/request"
  export default {
    data() {
      return {
        isLoadingList: true,
        isPullup: true,
        isMore: true,
        isRequest: false,
        loadingText: "加载中...",
        isRecord: true,
        currentPage: 1,
        recordList: []
      }    
    },
    created() {
      //this.getBuyRecords()
    },
    activated() {
      //this.isLoadingList = true
      this.getBuyRecords(true)
    },
    computed: {
      ...mapState({
        langs: 'langs'
      })
    },
    methods: {
      getBuyRecords(isReset) {
        this.isRequest = true
        if (isReset) this.currentPage = 1
        let _data = {
          currentPage: this.currentPage,
          pageSize: 20
        } 
        getBuyRecords(_data).then(res => {
          if (res.code === ERR_Ok) {
            if (this.currentPage == 1 && res.data.length == 0) {
              this.isRecord = false
              this.isLoadingList = false
              return
            }
            if (isReset) {
              this.recordList = []
              this.isMore = true
            }
            this.recordList = this.recordList.concat(res.data)
            if (res.data.length < 20) {
              this.isMore = false
            }
            this.currentPage++
          } else if (res.code === ERR_WAIT) {
            this.$toast(this.$t(res.code))
          }
          this.isRequest = false
          this.isLoadingList = false
        }).catch(err => {
          this.isRequest = false
          this.$toast(this.$t(res.code))
          console.log(err)
        })
      },
      //数字转换成单双
      switchNumber(val, langs) {
        let _str = ''
        for (let i = 0; i < val.length; i++) {
          _str += this.$t('lucky.home_title6')[parseInt(val[i])]
          if (langs == 'en') _str += '-'
        }
        if (langs == 'en') {
          return _str.slice(0, _str.length - 1)  
        } else {
          return _str
        } 
      },
      backHome() {
        this.$router.push('/lucky')
      },
      pulldown() {
        this.isLoadingList = true
        this.currentPage = 1
        this.getBuyRecords(true)
      },
      myScrollToEnd() {
        if (!this.isMore || this.isRequest) return
        this.getBuyRecords()
      } 
    },
    filters: {
      betRuleSwitch(val, i18n_home_title1) {
        let _str = '*'
        if (val == 100) {
          _str = i18n_home_title1[1]
        } else if (val == 200) {
          _str = i18n_home_title1[2]
        } else if (val == 300) {
          _str = i18n_home_title1[4]
        } else if (val == 310) {
          _str = i18n_home_title1[3]
        } else if (val == 400) {
          _str = i18n_home_title1[5]
        } else if (val == 500) {
          _str = i18n_home_title1[6]
        } else if (val == 600) {
          _str = i18n_home_title1[7]
        } else if (val == 700) {
          _str = i18n_home_title1[8]
        } 
        return _str
      }
    },
    components: {
      Scroll,
      Loading      
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/mixin'
@import '~common/style/variable'
  .record
    background: #136DCE
    height: 100%
    text-align: left
    .loading-con
      absolute-full(5)
    .record-list
      height: calc(100% - .44rem)
      .scroll-record
        height: 100%
        overflow: hidden
        ul
          padding: 0 .14rem
          li
            padding:.16rem 0 .2rem
            &:not(:first-child)
              border-top: 1px solid #2784D9
            &.en .title
              height: auto
            &.en .num
              margin-left: 0 !important
              max-width: initial !important     
            .title
              height: h = .2rem
              line-height: h                            
              font-size: .14rem
              font-family: "PingFangSC"
              font-weight: bold
              .h3
                max-width: 85%
                strong
                  white-space: nowrap
                  font-weight: bold
              .num
                margin-left: .14rem
                max-width: 80%
                word-wrap: break-word
                span
                  padding-right: .12rem
              p
                font-weight: normal
                font-size: .12rem
                &.on
                  color:rgba(255,142,10,1)
            &.yes .title p
              color: #E86B40
            dl
              padding-top:  .16rem
              dd
                line-height: .16rem
                font-size: .11rem
                font-family: "PingFangSC"
                color: rgba(120,162,253,1)
                &:not(:last-child)
                  margin-bottom: .04rem
                &.stage
                  p:not(:last-child)
                    margin-right: .16rem  
                &.number
                  max-width: 75%
                  p
                    padding-left: 5em
                    text-indent: -5em
                    span.ok
                      color: #e86b40
                    i
                      font-style: normal
                      color: #fff !important
                      &:last-child
                        display: none
            &.not-more
              padding: .3rem 0 .2rem
              text-align: center
              font-size: .14rem
              color: #fff                 
    .not-record
      height: 100%
      text-align: center
      font-family: "PingFangSC" 
      &>div
        margin-top: -25%
        p
          font-size: .15rem
          font-family: PingFangSC
          font-weight: bold
          color: #fff
          padding-bottom: .22rem
        .btn
          width: 1.58rem
          height: h = .5rem
          line-height: h
          back-image($ASSETSURL + '/lucky/images/btn_06.png')
          font-size: .18rem 
          font-weight: bold 
</style>
