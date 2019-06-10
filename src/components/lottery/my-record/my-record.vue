<template>
  <div class="record">
    <div class="record-list" v-if="isRecord"> 
      <scroll class="scroll-record" ref="scrollRecord" :pulldown="isPullup" @pulldown="pulldown" :pullup="isPullup" @scrollToEnd="myScrollToEnd" :data="recordList">
        <ul>
          <li v-for="(item, index) in recordList" :class="[item.betStatus == 400 || item.betStatus == 200 ? 'yes' : 'no', langs == 'en' ? 'en' : '']">
            <div class="title flex-bet"><h3>{{item.startNo}}~{{item.endNo}}</h3><p><span v-if="item.betStatus != 400 && item.betStatus != 200">{{item.betStatus == 300 ? $t('lottery.myRecord_title3') : $t('lottery.myRecord_title2') }}</span><span v-if="item.betStatus == 400 || item.betStatus == 200">
              {{item.awardLevel | chineseCharacters(langs, $t('lottery.myRecord_title4s'))}}{{$t('lottery.myRecord_title4')}}&nbsp;+{{item.winAmount | retainedDecimal}}</span></p></div>
            <dl>
              <dd><p>{{$t('lottery.myRecord_title5')}}：{{item.betIssueNo}}</p></dd>
              <dd class="number" v-if="item.betStatus == 400 || item.betStatus == 200">
                <p>{{$t('lottery.myRecord_title8')}}：
                   <template v-for="(items, indexs) in item.allAwardNumbers">
                     <span :class="[item.awardNo == items ? 'ok' : '']">{{items}}<i>，</i></span>
                   </template>
                </p>
              </dd>
              <dd class="flex-bet"><p>{{$t('lottery.myRecord_title7')}}：{{item.betTime}}</p><p>{{$t('lottery.myRecord_title6')}}：{{item.betCount}}</p></dd>
            </dl>
          </li>
          <li class="loading-container" v-show="recordList.length > 0">
            <loading :title="isMore ? $t('lottery.others[0]') : $t('lottery.others[1]')"></loading>
          </li>
        </ul>
      </scroll>
    </div>
    <div class="not-record flex-cen" v-if="!isRecord">
      <div>
        <img :src="ASSETSURL + '/lottery/images/icon_10.png'" alt="" />
        <p>{{$t('lottery.myRecord_title9')}}</p>
        <div class="btn" @click="backHome">{{$t('lottery.myRecord_title10')}}</div>
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
  import { getRecord } from "api/request"
  export default {
    data() {
      return {
        isLoadingList: true,
        isPullup: true,
        isMore: true,
        isRequest: false,
        //loadingText: "加载中...",
        isRecord: true,
        currentPage: 1,
        recordList: []
      }    
    },
    created() {
    },
    activated() {
      this.getRecord()
      //this.isLoadingList = true
      //this.getRecord()
    },
    computed: {
      ...mapState({
        langs: 'langs',
        ASSETSURL: 'ASSETSURL'
      })
    },
    methods: {
      getRecord(isPulldown) {
        this.isRequest = true
        let _data = {
          currentPage: this.currentPage,
          pageSize: 20
        }
        getRecord(_data).then(res => {
          if (res.code === ERR_Ok) {
            if (this.currentPage == 1 && res.data.data.length == 0) {
              this.isRecord = false
              this.isLoadingList = false
              return
            }
            if (isPulldown) {
              this.recordList = []
              this.isMore = true  
            }
            this.recordList = this.recordList.concat(res.data.data)
            if (res.data.data.length < 20) {
              this.isMore = false
            }
            this.currentPage++
          } else if (res.code === ERR_WAIT) {
            this.$toast(this.$t(res.code))
          }
          this.isRequest = false
          this.isLoadingList = false
        }).catch(err => {
          this.isLoadingList = false
          this.isRequest = false
          this.$toast(this.$t(res.code))
          console.log(err)
        })
      },
      backHome() {
        this.$router.push('/lottery')
      },
      pulldown() {
        this.isLoadingList = true
        this.currentPage = 1
        this.getRecord(true)
      },
      myScrollToEnd() {
        if (!this.isMore || this.isRequest) return
        this.getRecord()
      } 
    },
    filters: {
      chineseCharacters(val, langs, i18n_myRecord_title4s) {
        let _str = '*'
        if (val == 1) {
          langs == 'en' ? _str = i18n_myRecord_title4s[0] + ' ' : _str = '一'
        } else if (val == 2) {
          langs == 'en' ? _str = i18n_myRecord_title4s[1] + ' ' : _str = '二'
        } else if (val == 3) {
          langs == 'en' ? _str = i18n_myRecord_title4s[2] + ' ' : _str = '三'
        } else if (val == 4) {
          langs == 'en' ? _str = i18n_myRecord_title4s[3] + ' ' : _str = '四'
        } else if (val == 5) {
          langs == 'en' ? _str = i18n_myRecord_title4s[4] + ' ' : _str = '五'
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
  .record
    background: #09379C
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
              border-top: 1px solid rgba(39,81,173,1)
            .title
              height: h = .2rem
              line-height: h                            
              font-size: .14rem
              font-family: "PingFangSC"
              font-weight: bold
              p
                font-weight: normal
                font-size: .12rem
            &.yes .title p
              color: #E86B40
            &.en dl dd.number p
              padding-left: 9.3em !important 
              text-indent: -9.3em !important   
            dl
              padding-top:  .16rem
              dd
                line-height: .16rem
                font-size: .11rem
                font-family: "PingFangSC"
                color: rgba(120,162,253,1)
                &:not(:last-child)
                  margin-bottom: .04rem
                &.number
                  //max-width: 75%
                  p
                    display: flex
                    flex-wrap: wrap 
                    //padding-left: 5em
                    //text-indent: -5em
                    span:not(:last-child)
                      margin-right: .05rem
                    span.ok
                      color: #e86b40
                    span:last-child i
                      display: none
                    i
                      font-style: normal
                      color: #fff !important
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
        img
          width: 1.21rem
        p
          height: h = 20px
          line-height: h
          font-size: .14rem
          color: rgba(120,162,253,1) 
          margin: .2rem 0 .49rem
        .btn
          width: 1.12rem
          height: h = .44rem
          line-height: h
          border-radius: .04rem
          background: #295FD3
          font-size: .17rem 
          font-weight: bold 
</style>
