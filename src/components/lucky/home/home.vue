<template> 
  <div class="home container"> 
    <div ref="myHeader">
      <my-header :my-balance="myBalance | toFixeds" @jumpRecord="jumpRecord" @jumpRule="jumpRule"></my-header>
    </div>
    <div class="select-category">
      <div ref="selectTitle" :class="['h3', 'flex-cen', showType == 1 ? 'on' : '']"><div class="flex-cen" @click="choiceOfPlay">{{$t('lucky.home_title1')[curIndex_rule_toast]}}<img :src="ASSETSURL + '/lucky/images/icon_05.png'" alt="" /></div></div>
      <div ref="selectBox">
        <div class="select-category-box" v-show="showType == 1">
          <dl :class="['clearfix', langs == 'en' ? 'en' : '']">
            <dd v-for="(item, index) in $t('lucky.home_title1')" v-if="index != 0" :class="[index == curIndex_rule_toast ? 'cur' : '']" :data-id="index" @click="selectCategory">{{item}}</dd> 
          </dl> 
        </div>
        <div :class="['issue-number', langs == 'en' ? 'en' : '']" v-show="showType >= 2">
          <div class="issue-number-title flex-cen"><p>{{$t('lucky.home_title5[0]')}}</p><p>{{$t('lucky.home_title5[1]')}}</p><p>{{$t('lucky.home_title5[2]')}}</p><p>{{$t('lucky.home_title5[3]')}}</p><p>{{$t('lucky.home_title5[4]')}}</p></div>
          <div :class="['issue-number-box', showType == 3 ? 'max-height' : '']">
            <scroll class="scroll-box" ref="scrollIssueNumber">
              <ul>
                <li v-for="item in issueNumberList" :class="['flex-cen', item.status != 100 ? '' : 'wait-for']">
                  <p>{{item.displayNumber || 88888}}{{$t('lucky.home_title5[5]')}}</p>
                  <p>
                    <template v-if="item.status == 0">{{$t('lucky.home_title5[6]')}}</template>
                    <template v-if="item.status == 100">{{$t('lucky.home_title5[7]')}}</template>
                    <template v-if="item.status == 400">{{$t('lucky.home_title5[8]')}}</template>
                    <template v-if="item.status == 800">{{item.awardResult ? item.awardResult.join('') : '--'}}</template>
                    <template v-if="item.status == 900">{{$t('lucky.home_title5[9]')}}</template>
                    <template v-if="isNewUserGuide">88888</template>
                  </p>
                  <p>
                    <template v-if="item.tensType == 30">{{$t('lucky.home_title5[11]')}}</template>
                    <template v-if="item.tensType == 40">{{$t('lucky.home_title5[10]')}}</template>
                    <template v-if="item.tensType == 50">{{$t('lucky.home_title5[13]')}}</template>
                    <template v-if="item.tensType == 60">{{$t('lucky.home_title5[12]')}}</template>
                    <template v-if="isNewUserGuide">88888</template>
                  </p>
                  <p>
                    <template v-if="item.tensType == 30">{{$t('lucky.home_title5[11]')}}</template>
                    <template v-if="item.tensType == 40">{{$t('lucky.home_title5[10]')}}</template>
                    <template v-if="item.tensType == 50">{{$t('lucky.home_title5[13]')}}</template>
                    <template v-if="item.tensType == 60">{{$t('lucky.home_title5[12]')}}</template>
                    <template v-if="isNewUserGuide">88888</template>
                  </p>
                  <p>{{item.numberType ? (item.numberType == 10 ? $t('lucky.home_title5[14]') : $t('lucky.home_title5[15]')) : (isNewUserGuide ? '88888' : '')}}</p> 
                </li>
                <li class="toast">
                  <template v-if="issueNumberList.length > 0">
                    {{$t('lucky.home_title5[16]')}}{{issueNumberList.length}}{{$t('lucky.home_title5[17]')}}
                  </template> 
                  <template v-else>{{$t('lucky.home_title5[18]')}}</template>
                </li>
              </ul>
            </scroll> 
          </div>
        </div>
      </div>
    </div> 
    <div ref="ballSelection" :class="[!isDragIng ? 'transition' : '','', 'ball-selection', showType == 3 ? 'on' : '', calcTotalNotes > 0 ? 'isSatisfy' : '']" :style="{top: (isTakeBack ? initialBallSelection_top : ballSelection_top) + 'px'}" v-swipeup="swipeup" v-swipedown="swipedown" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <div class="timing" @click="openIssueNumber(false)">
        <div class="timing-con">
          <div class="flex-cen" v-show="!isInterval">
            <p>{{$t('lucky.home_title2[0]')}}{{currentIssueNumber}}{{$t('lucky.home_title2[1]')}}</p>
            <div class="timing-box"><timing ref="timing" @realTime="myRealTime" @timingEnd="myTimingEnd"></timing></div>
          </div>
          <p v-show="isInterval">{{!isStopping ? $t('lucky.home_title2[2]') : $t('lucky.home_title2[3]')}}</p>
        </div>
      </div>
      <div class="ball-selection-box">
        <scroll class="scroll-box" :data="selectIndexList" ref="scrollSelect" :pulldown="isPulldown" :listenScroll="isPulldown" @pulldown="pulldown" @scroll="listenScroll">
          <div>
            <h3>{{$t('lucky.home_title3')[curIndex_rule_toast]}}</h3>
            <img v-show="false" :src="ASSETSURL + '/lucky/images/icon_07s.png'" alt="" />
            <ul v-show="curIndex_rule_toast != 8">
              <li :class="[langs == 'en' ? 'en' : '']" v-for="(item, index) in selectIndexList" v-show="index >= showSelectNumber">
                <p :class="[langs == 'en' ? 'flex-cen' : '']"><span>{{(curIndex_rule_toast == 3 || curIndex_rule_toast == 4 || curIndex_rule_toast == 6) ? $t('lucky.home_title4') : (langs == 'zh-CHS' ? item.type : (langs == 'zh-CHT' ? item.type1 : item.type2))}}</span></p>
                <dl class="clearfix">
                  <dd v-for="(items, indexs) in 10" :class="[selectIndexList[index].selectNum.indexOf(indexs) != -1 ? 'cur animated bounceIn' : '']" :data-type="index" :data-index="indexs" @click="selectNumber">{{items - 1}}</dd>
                </dl>
              </li>
            </ul>
            <ul v-show="curIndex_rule_toast == 8" class="alternative">
              <li :class="[langs == 'en' ? 'en' : '']" v-for="(item, index) in selectIndexList" v-show="index >= showSelectNumber">
                <p :class="[langs == 'en' ? 'flex-cen' : '']"><span>{{langs == 'zh-CHS' ? item.type : (langs == 'zh-CHT' ? item.type1 : item.type2)}}</span></p>
                <dl class="clearfix">
                  <dd v-for="(items, indexs) in $t('lucky.home_title6')" :class="[selectIndexList[index].selectNum.indexOf(indexs) != -1 ? 'cur animated bounceIn' : '']" :data-type="index" :data-index="indexs" @click="selectNumber">{{items}}</dd>
                </dl>
              </li>
            </ul>
          </div>
        </scroll>
      </div>
    </div>
    <div class="betting-list" v-show="isShowBettingList" @click="bounceUpBetting">
      <div class="betting-list-box" v-show="isShowBettingList" @click.stop>
        <h3>{{$t('lucky.home_title8[0]')}}</h3>
        <div class="empty"><span @click="emptyBetting">{{$t('lucky.home_title8[1]')}}</span></div>
        <div :class="['scroll-betting-list', betting.length >= 4 ? 'on' : '']">
          <scroll :data="betting" class="scroll-betting-con" ref="scrollBetting">
            <ul>
              <li v-for="(item, index) in betting" v-show="item.selectNum.length != 0">
                <div class="delete" @click="delegateBettingItem(index)"></div>
                <div class="num"><div><p>{{$t('lucky.home_title1')[item.id]}}</p><template v-if="item.id == 8 && langs == 'en'"><br/></template><span v-for="items in item.selectNum">{{item.id != 8 ? items : switchNumber(items, langs)}}</span></div></div>
                <h4>{{$t('lucky.home_title8[2]')}}{{item.stage}}{{$t('lucky.home_title8[3]')}}<span>{{$t('lucky.home_title8[4]')}}{{item.notes}}{{$t('lucky.home_title8[5]')}}</span></h4>
                <div class="add-reduce flex-bet">
                  <div><h5>{{$t('lucky.home_title7[1]')}}</h5><span>{{rule_toast[item.id].base * item.times}}&nbsp;WLC</span></div>
                  <div class="add-reduce-box flex-cen">
                    <div :class="['btn', 'reduce', (isAddReduce == 1 && item.clickActivate) ? 'on' : '']" @click="addReduceNotes(index, '-')"></div>
                    <div class="number"><input type="number" pattern="\d*" v-model="item.times" @blur="backPageTop(index)" @input="input(index)" @focus="focus"/>倍</div>
                    <div :class="['btn', 'add', (isAddReduce == 2 && item.clickActivate) ? 'on' : '']" @click="addReduceNotes(index, '+')"></div>
                  </div>
                </div>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
    </div>
    <div :class="['betting', calcTotalNotes > 0 ? 'on' : '', langs == 'en' ? 'en' : '']">
      <div class="betting-con flex-ali">
      <transition name="bottom-top">
        <div class="cur-betting" v-show="isSelectNumber && !isShowBettingList"><span v-for="(item, index) in selectIndexList" v-show="index >= showSelectNumber">{{item.selectNum.length != 0 ? (curIndex_rule_toast != 8 ? item.selectNum.join('') : switchNumber(item.selectNum.join(''), langs)) : '--'}}</span></div>
      </transition>
        <div class="betting-box flex-bet">
          <div class="left flex-ali" @click="bounceUpBetting">
            <span>{{calcTotalNotes}}{{$t('lucky.home_title7[0]')}}</span>
            <div>
              <h4>{{total_money}}WLC</h4>
              <p>{{$t('lucky.home_title7[1]')}}{{total_estimate}}WLC</p>
              <h5>{{$t('lucky.home_title7[3]')}}</h5>
            </div>
          </div>
          <div class="right" @click="confirmBet">{{$t('lucky.home_title7[2]')}}</div>
        </div>
      </div>
    </div>
    <div v-if="!isPageData" class="loading-pageData flex-cen">
      <loading is-full="1" is-icon="1" :title="loadingConductTitle"></loading>
    </div>
    <transition name="fadeInOut">
    <div v-if="isGuide && isNewUserGuide" :class="['guide', guideBackTransparent ? 'on' : '']">
      <div class="guide-box" :style="{top: guideBoxTop + 'px'}"><img :src="ASSETSURL + '/lucky/images/hand.png'" alt="" /></div>
    </div>
    </transition>
    <my-loading v-if="!isLoadingOk" ref="MyLoading" @loadingOk="loadingOk"></my-loading>
    <my-audio></my-audio>
    <!-- 划转弹框 -->
    <transfer ref="transferData" ></transfer>
  </div>
</template>
 
<script type="text/ecmascript-6">
import MyHeader from 'components/lucky/my-header/my-header'
import MyLoading from 'components/lucky/loading/loading'
import Timing from 'components/lucky/timing/timing'
import Loading from 'base/loading/loading'
import MyAudio from 'components/lottery/audio/audio'
import Scroll from 'base/scroll/scroll'
import { distanceFromCurrent, accMul, musicPlay, backPageTop, combination, stringToNumber, prefixStyle, minutesAndSeconds } from 'common/js/util'
import { ERR_Ok, TOAST } from 'api/config'
import { TweenMax, Power2, TimelineLite } from "gsap"
import { mapState, mapMutations } from 'vuex'
import { getUserInfo, getIsNewUser, getCurrentInstance, getRecentRecord, ssc_purchase } from "api/request"
import transfer from "@/components/common/transferDialog"
  export default {
    name: 'App',
    data() {
      return { 
        isLoadingOk: false,//加载loading页
        isNewUserGuide: false,//是否是新手
        isGuide: true,//新手指引显示
        isCurrentPage: false,//是否在当前页面
        isInterval: false,//每期之间间隔
        isStopping: false,//是否停止销售（晚上2：00至早上9：50暂停开期）
        pausePeriod: [2, 10],//夜间暂停销售时间段
        pollingTimes: 5000,//当在每期时间间隔轮询时间
        isPageData: false,//页面数据是否初始化
        loadingConductTitle: '',
        dragTop: 0,//当前滑动下拉距离
        isPulldown: true,//选球区是否可以下拉
        showType: 0,//控制显示玩法选择区和开奖历史区
        guideBoxTop: 200,
        guideBackTransparent: false,
        isDrag: false,//是否在下拉滑动
        isDragIng: false,//是否在当前一次的下拉滑动
        allowDropDown: false,//向上滑动临界点
        screenYStart: 0,//开始触摸滑动Y值
        screenYMove: 0,//触摸滑动中Y值
        screenYEnd: 0,//结束触摸滑动Y值
        once_modifyType: true,//滑动时只允许一次变动
        touchstartType: -1,//触摸时当前type值
        touchvalve: 20,//下拉滑动阀值
        myHeader_h: 40,//header头部高度
        selectTitle_h: 30,//选择玩法title高度
        selectBox_h: 0,//选择玩法、开奖历史区域总区域高度
        isTakeBack: false,//是否为在显示开奖历史时收起选择号码区（先收再隐效果）
        currentIssueNumber: '----',//当前期号
        isShowBettingList: false,//已选投注列表 
        recentRecordCount: 50,//近期开奖记录条数
        issueNumberList: 50,//近期开奖记录
        isAddReduce: 0,//加减按钮控制器
        notesRange: [1, 100],//下注倍数范围
        rule_toast: [//所有玩法
                     { type:'五星通选', id: 0, base:100000, minSelectNum: 1, toast: '每位至少选1个号，按位猜对开奖号最高奖20440WLC' },
                     { type:'五星直选', id: 1, base:100000, minSelectNum: 1,  toast: '每位至少选1个号，按位猜对开奖号即中100000WLC' },
                     { type:'三星直选', id: 2, base:1000, minSelectNum: 1,  toast: '每位至少选1个号，按位猜对开奖后3位即中1000WLC' },
                     { type:'三星组三', id: 3, base:320, minSelectNum: 2,  toast: '至少选2个号，猜对开奖后3位（顺序不限）中320WLC' },
                     { type:'三星组六', id: 4, base:160, minSelectNum: 3,  toast: '至少选3个号，猜对开奖后3位（顺序不限）中160WLC' },
                     { type:'二星直选', id: 5, base:100, minSelectNum: 1,  toast: '每位至少选1个号，按位猜对开奖后2位即中100WLC' },
                     { type:'二星组选', id: 6, base:50, minSelectNum: 2,  toast: '至少选2个号，猜对开奖后2位（顺序不限）中50WLC' },
                     { type:'一星直选', id: 7, base:10, minSelectNum: 1,  toast: '至少选1个号，猜对开奖号码最后1位即中10WLC' },
                     { type:'大小单双', id: 8, base:4, minSelectNum: 1,  toast: '每位至少选1个号，猜对开奖后2位的属性即中4WLC', alternative: ['大', '小', '单', '双'] },
                    ],            
        curIndex_rule_toast: 1,//当前选定玩法索引id
        showSelectNumber: 0,//用来控制显示万千百十个位
        selectIndexList: [
                           { type: '万位', type1: '萬位', type2: 'A', selectNum: [] },
                           { type: '千位', type1: '千位', type2: 'B', selectNum: [] },
                           { type: '百位', type1: '百位', type2: 'C', selectNum: [] },
                           { type: '十位', type1: '十位', type2: 'D', selectNum: [] },
                           { type: '个位', type1: '個位', type2: 'E', selectNum: [] }
                         ],
        betting: [//已选投注列表
                   // { type:'五星通选', selectNum: [], stage: '20181204069', notes: 0, income: 0, times: 1}
                 ],
        isCurrentNote: false,//用来判断在改当前注         
        calcTotalNotes: 0,//总注数
        calcBettingNums: 0,//已选投注种类
        total_estimate: 0,//总预计收入                                      
        total_money: 0,//总投注金额 
        interval_updating: null,//自动刷新当前期定时器 
        interval_residence_time: null,//定时器-计时用户在首页停留了多久
        residence_time: 0//用户在首页停留时间                                     
      }    
    },
    beforeCreate() {
    },
    created() {  
    },
    activated() {
      this.addScript();//不要去掉这段代码，否则游戏切换时页面会错乱
      this.isCurrentPage = true
      this.interval_residence_time = setInterval(() => {
        this.residence_time++
      }, 1000) 
      //this.getIsNewUser()
      /*if (this.isNewUserGuide) {
        this.newUserGuide(() => {
          this.isNewUserGuide = false
          this.pageDataInit()
        })
      } else {
        this.pageDataInit()
      }*/
    },
    beforeMount() {

    },
    mounted() {
      this.addScript();//不要去掉这段代码，否则游戏切换时页面会错乱
      if (this.$refs.MyLoading) { 
        this.$refs.MyLoading.progressComplete()
      }
      this.getEleHeight()
      //this.$refs.scrollIssueNumber.refresh()
      //this.$refs.scrollSelect.refresh()
    },
    computed: {
      //判断是否选了一个号
      isSelectNumber() {
        for (let i = 0; i < this.selectIndexList.length; i++) {
          if (this.selectIndexList[i].selectNum.length != 0) {
            return true
          }
        }
        return false
      },
      //判断当前选号是否满足一注以上选号
      isSatisfy() {
        for (let i = this.showSelectNumber; i < this.selectIndexList.length; i++) {
          if (this.selectIndexList[i].selectNum.length < this.rule_toast[this.curIndex_rule_toast].minSelectNum) {
            return false
          }
        }
        return true
      },
      ballSelection_top() {
        return this.myHeader_h + this.selectTitle_h + this.selectBox_h + this.dragTop
      },
      initialBallSelection_top() {
        return this.myHeader_h + this.selectTitle_h + this.dragTop
      },
      currentTimePeriod() {
        let _date = new Date()
        return _date.getHours()
      },
      ...mapState({
        isLoading: 'isLoading',
        myBalance: 'myBalance',
        langs: 'langs',
        ASSETSURL: 'ASSETSURL'    
      })
    },
    methods: {
      addScript() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "./static/js/lottery.js";
        document.body.appendChild(script);
      },
      //页面数据初始化
      pageDataInit(isSilenceRefresh) {
        if (!isSilenceRefresh) this.isPageData = false
        this.getUserInfo()//获取用户个人信息
        this.getCurrentInstance()//获取当前期
        this.getRecentRecord()//获取近期开奖记录
      },
      //是否为新用户 
      getIsNewUser() {
        this.isPageData = true
        this.pageDataInit()
        return false
        getIsNewUser().then(res => {
          if (res.code === ERR_Ok) {
            if (res.data.sscBetCount == 0) {
              this.isNewUserGuide = true
            } else {
              this.isNewUserGuide = false
            }
            this.isPageData = true
            if (this.isNewUserGuide) {
              this.newUserGuide(() => {
                this.isNewUserGuide = false
                this.pageDataInit()
              })
            } else {
              this.pageDataInit()
            } 
          }
        }).catch(err => {
          //this.$toast(this.$t(res.code))
          this.isPageData = true
          console.log(err)
        })
      },
      //用户个人信息
      getUserInfo() {
        getUserInfo().then(res => {
          if (res.code === ERR_Ok) {
            this.updateBalance({myBalance: res.data.wlcBalance})
          }
        }).catch(err => {
          //this.$toast(this.$t(res.code))
          console.log(err)
        }) 
      },
      //获取当前彩期
      getCurrentInstance(callback) {
        getCurrentInstance().then(res => {
          if (res.code === ERR_Ok) {
            setTimeout(() => { this.isPageData = true }, 500)
            if (res.data) {
              this.currentIssueNumber = res.data.displayNumber
              console.log(res.data.endTime )
              if (res.data.endTime > 0) {
                this.isInterval = false
                // this.$refs.timing.start(distanceFromCurrent(res.data.endTime))
                this.$refs.timing.start(res.data.endTime)
              } else {
                if (this.currentTimePeriod >= this.pausePeriod[0] && this.currentTimePeriod < this.pausePeriod[1]) {
                  this.isStopping = true
                } else {
                  this.isStopping = false
                }
                this.isInterval = true
                if (!this.isCurrentPage) return
                setTimeout(() => { this.getCurrentInstance() }, this.pollingTimes)
              }
              if (callback) callback()
            } else {
              this.isInterval = true
            }
          }
        }).catch(err => {
          //this.$toast(this.$t(res.code))
          this.isPageData = true
          console.log(err)
        })
      },
      //获取近期开奖记录
      getRecentRecord() {
        getRecentRecord(this.recentRecordCount).then(res => {
          if (res.code === ERR_Ok) {
            this.issueNumberList = res.data
          }
        }).catch(err => {
          //this.$toast(this.$t(res.code))
        }) 
      },
      handleTransfer(){
        this.$refs.transferData.showMask = true
        this.$refs.transferData.showDialog = true
      },
      //确认投注
      confirmBet() {
        if (this.betting.length == 0) return false
        if (this.total_money > 200) {
          this.$toast(this.$t('lucky.toasts[8]'))
          return false
        }
        if (this.total_money > this.myBalance) {
          this.$toast(this.$t('lucky.toasts[3]'))
          this.handleTransfer()//余额不足时弹框
          return false
        }
        console.log(this.betting)
        this.isPageData = false
        this.loadingConductTitle = this.$t('lucky.toasts[0]')
        let _data = []
        for (let i = 0; i < this.betting.length; i++) {
          let _item = this.betting[i]
          let _obj = {
            multiple: _item.times
          }
          //100-五星直选，200-三星直选，300-三星组六，310-三星组三，400-二星直选，500-二星组选，600-一星直选，700-大小单双
          if (_item.id == 1) {
            _obj.betRule = 100
          } else if (_item.id == 2) {
            _obj.betRule = 200
          } else if (_item.id == 3) {
            _obj.betRule = 310
          } else if (_item.id == 4) {
            _obj.betRule = 300
          } else if (_item.id == 5) {
            _obj.betRule = 400
          } else if (_item.id == 6) {
            _obj.betRule = 500
          } else if (_item.id == 7) {
            _obj.betRule = 600
          } else if (_item.id == 8) {
            _obj.betRule = 700
          }
          if (_item.id == 1 || _item.id == 2 || _item.id == 5 || _item.id == 7) {
            let _items = ['g', 's', 'b', 'q', 'w']
            let _selectNum = _item.selectNum.reverse()
            for (let i = 0; i < _selectNum.length; i++) {
              //_obj[_items[i]] = JSON.stringify(stringToNumber(_selectNum[i].split('')))
              _obj[_items[i]] = stringToNumber(_selectNum[i].split(''))
            }
          } else if (_item.id == 3 || _item.id == 4 || _item.id == 6) {
            //_obj.groupNumbers = JSON.stringify(stringToNumber(_item.selectNum[0].split(''))
            _obj.groupNumbers = stringToNumber(_item.selectNum[0].split(''))
          } if (_item.id == 8) {
            _obj.tensPlaceOption = stringToNumber(_item.selectNum[0].split('')),
            _obj.unitOption = stringToNumber(_item.selectNum[1].split(''))
          }
          _data.push(_obj)
        }
        console.log(_data)
        ssc_purchase(_data).then(res => {
          if (res.code === ERR_Ok) {
            if (res.data.respCode == 200) {
              setTimeout(() => {
                this.isPageData = true
                this.getUserInfo()
                this.emptyList()
                this.$toast(this.$t('lucky.toasts[1]'))
              }, 500) 
            } else if (res.data.respCode == 300) {
              this.isPageData = true
              this.$toast(this.$t('lucky.toasts[2]'))
            } else if (res.data.respCode == 400) {
              this.isPageData = true
              this.$toast(this.$t('lucky.toasts[3]'))
            }
          } else {
            setTimeout(() => {
              this.isPageData = true
              this.$toast(this.$t(res.code))
            }, 500)
          }
        }).catch(err => {
          //this.$toast(this.$t(res.code))
          this.isPageData = true
          console.log(err)
        }) 
      },
      //点击每个球进行选号
      selectNumber(e) {
        let _type = parseInt(e.target.dataset.type)
        let _index = parseInt(e.target.dataset.index)
        let _selectIndex = this.selectIndexList[_type].selectNum.indexOf(_index)
        this.buriedPoint()
        if (_selectIndex == -1) {
          this.selectIndexList[_type].selectNum.push(_index)
        } else {
          this.selectIndexList[_type].selectNum.splice(_selectIndex, 1)
        }
        this.selectIndexListSort()
        if (this.isSatisfy) {
          let _selectNum = []
          for (let i = 0; i < this.selectIndexList.length; i++) {
            if (this.selectIndexList[i].selectNum.length == 0) continue
            _selectNum.push(this.selectIndexList[i].selectNum.join(''))
          }
          let _group = {
            type: this.rule_toast[this.curIndex_rule_toast].type,
            id: this.rule_toast[this.curIndex_rule_toast].id,
            selectNum: _selectNum,
            stage: this.currentIssueNumber,
            times: 1
          }
          if (!this.isCurrentNote) {
            //正序this.betting.push(_group)
            this.betting.unshift(_group)
            this.isCurrentNote = true
          } else {
            //正序this.betting.splice(this.betting.length - 1, 1, _group)
            this.betting.splice(0, 1, _group)
          }
        } else {
          if (!this.isCurrentNote) return
          //正序this.betting.splice(this.betting.length - 1, 1)
          this.betting.splice(0, 1)
          this.isCurrentNote = false
          //this.betting[this.curIndex_rule_toast] = { type: this.rule_toast[this.curIndex_rule_toast].type, selectNum: [] }
        }
        this.calcTotalNote()
      },
      //不同玩法选号埋点
      buriedPoint() {
        let _playId = this.curIndex_rule_toast  
        if (_playId == 1) {//五星直选
          this.$buryPoint("clickSelectionNumber", "时时彩-五星直选_选号", "时时彩在五星直选玩法下点击号码球进行选号")
        } else if (_playId == 2) {//三星直选
          this.$buryPoint("clickSelectionNumber", "时时彩-三星直选_选号", "时时彩在三星直选玩法下点击号码球进行选号")
        } else if (_playId == 3) {//三星组三
          this.$buryPoint("clickSelectionNumber", "时时彩-三星组三_选号", "时时彩在三星组三玩法下点击号码球进行选号")
        } else if (_playId == 4) {//三星组六
          this.$buryPoint("clickSelectionNumber", "时时彩-三星组六_选号", "时时彩在三星组六玩法下点击号码球进行选号")
        } else if (_playId == 5) {//二星直选
          this.$buryPoint("clickSelectionNumber", "时时彩-二星直选_选号", "时时彩在二星直选玩法下点击号码球进行选号")
        } else if (_playId == 6) {//二星组选
          this.$buryPoint("clickSelectionNumber", "时时彩-二星组选_选号", "时时彩在二星组选玩法下点击号码球进行选号")
        } else if (_playId == 7) {//一星直选
          this.$buryPoint("clickSelectionNumber", "时时彩-一星直选_选号", "时时彩在一星直选玩法下点击号码球进行选号")
        } else if (_playId == 8) {//大小单双
          this.$buryPoint("clickSelectionNumber", "时时彩-大小单双_选号", "时时彩在大小单双玩法下点击号码球进行选号")
        }
      },
      //计算单项注数、总注数
      calcTotalNote() {
        let _total = 0
        for (var i = 0; i < this.betting.length; i++) {
          let _typeId = this.betting[i].id
          //if (this.betting[i].selectNum.length == 0) continue
          let _num = 1
          if (_typeId <= 2 || _typeId == 5 || _typeId == 7 || _typeId == 8) {
            for (let j = 0; j < this.betting[i].selectNum.length; j++) {
              _num *= this.betting[i].selectNum[j].length
            }  
          } else if (_typeId == 3 || _typeId == 6) {
            _num = parseInt(this.betting[i].selectNum[0].length) * (parseInt(this.betting[i].selectNum[0].length) - 1)
          } else if (_typeId == 4) {
            _num = combination(parseInt(this.betting[i].selectNum[0].length), 3)
          } 
          this.betting[i].notes = _num
          _total += _num   
        }
        this.calcTotalNotes = _total
        //this.calcBettingNum()
      },
      //计算总预计收入、总投注金额
      calcTotalEstimate() {
        let _total_estimate = 0
        let _total_money = 0
        for (var i = 0; i < this.betting.length; i++) {
          _total_estimate += this.rule_toast[this.betting[i].id].base * this.betting[i].times
          _total_money += this.betting[i].notes * this.betting[i].times * 2
        }
        this.total_estimate = _total_estimate
        this.total_money = _total_money
      },
      //选择玩法
      selectCategory(e) {
        this.curIndex_rule_toast = e.target.dataset.id
        this.swipeup()
        this.isCurrentNote = false
        this.$buryPoint("clickSelect", "时时彩-选择玩法", "时时彩点击某种玩法按钮进行当前玩法选择")
      },
      //清空当前选号
      emptySelectNumber() {
        this.selectIndexList.forEach((item) => {
          item.selectNum = []
        })
      },
      //删除已选投注列表某项
      delegateBettingItem(index) {
        // this.$messagebox.confirm('', {title: this.$t('lucky.messagebox[4]'), message: this.$t('lucky.messagebox[5]'), cancelButtonText: this.$t('lucky.messagebox[2]'), confirmButtonText: this.$t('lucky.messagebox[3]')}).then(action => {
        //   if (index == 0 && this.isCurrentNote) {
        //     this.emptySelectNumber()
        //     this.isCurrentNote = false
        //   }
        //   this.betting.splice(index, 1)
        //   this.calcTotalNote()
        //   this.calcTotalEstimate()
        //   this.$toast(this.$t('lucky.toasts[4]'))
        // }, () => {})  
        if (index == 0 && this.isCurrentNote) {
          this.emptySelectNumber()
          this.isCurrentNote = false
        }
        this.betting.splice(index, 1)
        this.calcTotalNote()
        this.calcTotalEstimate()
        this.$toast(this.$t('lucky.toasts[4]'))
      },
      //清空所有已选投注列表
      emptyBetting() {
        this.$messagebox.confirm('', {title: this.$t('lucky.messagebox[0]'), message: this.$t('lucky.messagebox[1]'), cancelButtonText: this.$t('lucky.messagebox[2]'), confirmButtonText: this.$t('lucky.messagebox[3]')}).then(action => {
          this.emptyList()
          this.$toast(this.$t('lucky.toasts[5]'))
        }, () => {})
      },
      emptyList() {
        this.betting = []
        this.calcTotalNote()
        this.calcTotalEstimate()
        this.emptySelectNumber()
      },
      //将所有选号排序
      selectIndexListSort() {
        for (let i = 0; i < this.selectIndexList.length; i++) {
          this.selectIndexList[i].selectNum.sort()
        }
      },
      //获取dom高度
      getEleHeight() {
        this.myHeader_h = this.$refs.myHeader.offsetHeight
        this.selectTitle_h = this.$refs.selectTitle.offsetHeight
      },
      //计算高度
      dynamicCalcEleHeight() {
        this.$nextTick(() => {
          this.selectBox_h = this.$refs.selectBox.offsetHeight
        })
      },
      //下拉事件
      pulldown() {
        //this.openIssueNumber(true)
      },
      //监听滚动事件
      listenScroll(e) {
        if (e.y >= 0) {
          this.allowDropDown = true
        } else {
          this.allowDropDown = false
        }
      },
      //监听触摸滑动开始事件
      touchstart(e) {
        this.screenYStart = e.changedTouches[0].screenY
        this.isDragIng = true
        this.touchstartType =  this.showType
      },
      //监听触摸滑动中事件
      touchmove(e) {
        this.screenYMove = e.changedTouches[0].screenY
        if (this.curIndex_rule_toast < 2 && !this.allowDropDown) return
        if (this.once_modifyType) {
          this.screenYEnd = e.changedTouches[0].screenY
          this.once_modifyType = false
        }
        if (this.showType < 2) this.showType = 2
        let _calcY = this.screenYMove - this.screenYStart - this.touchvalve
        if (this.curIndex_rule_toast <= 1) {
          _calcY -= (this.screenYEnd - this.screenYStart)
        }
        if(_calcY > 0) {
          this.isTakeBack = false
          if (this.touchstartType == 3) return false
          if (this.touchstartType == 0) {
            if (this.dragTop > 158) this.showType = 3
            _calcY > 273 ? this.dragTop = 273 : this.dragTop = _calcY
          } else if (this.touchstartType == 1) {
            _calcY > (158 - 124) ? this.showType = 3 : this.showType = 2
            _calcY > (273 - 124) ? this.dragTop = (273 - 124) : this.dragTop = _calcY
          } else if (this.touchstartType == 2) {
            this.showType = 3
            _calcY > (273 - 158) ? this.dragTop = (273 - 158) : this.dragTop = _calcY
          }
        }

      },
      //监听触摸滑动结束
      touchend(e) {
        if (this.isDragIng) {
          this.isDragIng = false
          this.allowDropDown = false
          this.once_modifyType = true
          this.screenYStart = this.screenYMove = this.screenYEnd = this.dragTop = 0
          this.dynamicCalcEleHeight()
          this.$refs.scrollIssueNumber.refresh()
        }
      },
      //自定义事件--下拉事件--下拉选号区
      swipedown(e) {
        //this.openIssueNumber(true)
      },
      //自定义事件--上拉事件-->上拉选号区
      swipeup() {
        if (this.showType == 0) return false
        if (this.isDrag) {
          this.dragTop = 0
          return false
        }
        this.isTakeBack = true
        //this.$refs.scrollSelect.refresh()
        setTimeout(() => {
          this.showType = 0
          this.isTakeBack = false
          this.dynamicCalcEleHeight()
          this.$refs.scrollSelect.refresh()
        }, 550)
      },
      //弹起已下注列表
      bounceUpBetting() {
        this.isShowBettingList = !this.isShowBettingList
        setTimeout(() => {
          this.$refs.scrollBetting.refresh()
        }, 500)
      },
      //加减注数
      addReduceNotes(index, type) {
        if (type == '-') {
          this.betting[index].times > 1 ? (this.takeInverse('isAddReduce', 1), this.betting[index].clickActivate = true, setTimeout(() => { this.betting[index].clickActivate = false }, 500), this.betting[index].times--) : (this.betting[index].times == this.notesRange[0], this.$toast(`${this.$t('lucky.toasts[6]')}${this.notesRange[0]}`))
        } else if (type == '+') {
          this.betting[index].times < 100 ? (this.takeInverse('isAddReduce', 2), this.betting[index].clickActivate = true, setTimeout(() => { this.betting[index].clickActivate = false }, 500), this.betting[index].times++) : (this.betting[index].times == this.notesRange[1], this.$toast(`${this.$t('lucky.toasts[7]')}${this.notesRange[1]}`))
        }
        this.calcTotalEstimate()
      },
      //展开选号区
      openIssueNumber(isTouch) {
        if (this.showType < 2) {
          this.showType = 2
          this.isTakeBack = false
          this.dynamicCalcEleHeight()
        } else if (this.showType == 2) {
          this.showType = 3
          this.isTakeBack = false
          this.dynamicCalcEleHeight()
        } else if (this.showType == 3 && !isTouch) {
          this.isTakeBack = true
          setTimeout(() => {
            this.isTakeBack = false
            this.showType = 0
            this.dynamicCalcEleHeight()
          }, 550)
        }
        setTimeout(() => {
          this.$refs.scrollIssueNumber.refresh()
        }, 50)
        this.$buryPoint("clickOpen", "时时彩-点击近期开奖记录按钮", "时时彩点击倒计时一栏展开近期开奖记录区域")
      },
      //展开选择玩法区
      choiceOfPlay() {
        this.isTakeBack = false
        this.showType != 1 ? this.showType = 1 : (this.isTakeBack = true, setTimeout(() => { this.showType = 0 }, 550))
        this.dynamicCalcEleHeight()
        this.$buryPoint("clickOpen", "时时彩-点击玩法选择按钮", "时时彩点击当前玩法title展开所有玩法列表区域")
      },
      //输入框聚焦
      focus() {
        this.$buryPoint("inputFocus", "时时彩-输入框", "时时彩点击input输入框进行倍数输入")
      },
      //输入框输入处理
      input(index) {
        let _votes = this.betting[index].times
        if (_votes >= this.notesRange[1]) {
          this.betting[index].times = this.notesRange[1]
          this.$toast(`${this.$t('lucky.toasts[7]')}${this.notesRange[1]}`)  
        }
      },
      //输入框失焦页面回到顶部
      backPageTop(index) {
        let _votes = this.betting[index].times
        if (!_votes || _votes < this.notesRange[0]) {
          this.$toast(`${this.$t('lucky.toasts[6]')}${this.notesRange[0]}`)
          this.betting[index].times = this.notesRange[0]
        }
        backPageTop()
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
      //取反
      takeInverse(variable, newValue){
        let _original = this[variable]
        this[variable] = newValue || true
        setTimeout(() => {
          newValue ? this[variable] = _original : this[variable] = false
        }, 50)
      },
      //新用户指引效果
      newUserGuide(callback) {
        setTimeout(() => {
          this.guideBackTransparent = true
        }, 500)
        setTimeout(() => {
          this.showType = 2
          this.guideBoxTop = 285
          this.dragTop = 85
        }, 1500)
        setTimeout(() => {
          this.guideBoxTop = 200
          this.dragTop = 0
        }, 3000)
        setTimeout(() => {
          this.showType = 2
          this.guideBoxTop = 285
          this.dragTop = 85
        }, 4500)
        setTimeout(() => {
          this.guideBoxTop = 200
          this.dragTop = 0
        }, 6000)
        setTimeout(() => {       
          this.isGuide = false
          this.showType = 0
          setTimeout(() => { if (callback) callback() }, 1500)         
        }, 6500)
      },
      //路由跳转
      jumpRecord(isLottery) {
        if (isLottery) {
          this.isShowModal = false
          this.$router.push({ name: 'lotteryHistory', params: { isLottery: true } })
        } else {
          this.$buryPoint("clickToview", "时时彩-投注记录", "时时彩点击头部按钮进入投注记录页面")
          this.$router.push("../lucky/record")
        }
      }, 
      myRealTime() {

      },
      myTimingEnd() {
       console.log('本期时间到')
       this.pageDataInit(true)
       setTimeout(() => {
         this.getCurrentInstance()
         // this.getCurrentInstance(() => {
         //   this.$toast(`本期已切换，当前是${this.currentIssueNumber}期`)
         // })
       }, 1000)
      },
      //页面loading页加载回调
      loadingOk() {
        setTimeout(() => {
          this.getIsNewUser()
          this.isLoadingOk = true 
          this.updateIsLoading(true)
          if (!this.isMusicMuted) musicPlay("music-back")
        }, 800)
      },
      jumpRule() {
        this.$buryPoint("clickToview", "时时彩-玩法规则", "时时彩点击头部按钮进入玩法规则页面")
        this.$router.push("../lucky/rule") 
      }, 
      ...mapMutations({
        updateIsLoading: 'updateIsLoading',
        updateBalance: 'updateBalance'
      })    
    },
    filters: {
      //向下保留两位小数
      toFixeds(val) {
        let _num = String(val)
        let _index = _num.indexOf('.')
        if (_index == - 1) { return _num + '.00' }
        if (_num.length - _index == 2) {
          return _num + '0'
        } else if (_num.length - _index == 3) {
          return _num
        } else  if (_num.length - _index > 3) {
          return _num.slice(0, _index + 3)
        }
      },
      digitSwitch(val) {
        console.log(val)
        // if (val == 30) return '大单'
        // if (val == 40) return '大双'
        // if (val == 50) return '小单'
        // if (val == 60) return '小双'
      } 
    },
    watch: {
      //监听玩法选择
      curIndex_rule_toast(newValue) {
        let _newValue = parseInt(newValue)
        switch (_newValue){
          //case 0://五星通选
          //this.showSelectNumber = 0
          case 1://五星直选
          this.showSelectNumber = 0
          break
          case 2://三星直选
          this.showSelectNumber = 2
          break
          case 3://三星组选
          this.showSelectNumber = 4
          break
          case 4://三星组六
          this.showSelectNumber = 4
          break
          case 5://二星直选
          this.showSelectNumber = 3
          break
          case 6://二星组选
          this.showSelectNumber = 4
          break
          case 7://一星直选
          this.showSelectNumber = 4
          break          
          case 8://大小单双
          this.showSelectNumber = 3
          break
        }
        this.emptySelectNumber()
      },
      //监听总注数变化
      calcTotalNotes() {
        this.calcTotalEstimate()
      },
      //监听已选投注列表
      betting: {
        handler (newValue, oldValue) {
          //console.log(newValue)
          //console.log(oldValue)
          if (newValue.length == 0) {
            this.isShowBettingList = false
          }
        },
        deep: true
      }
    },
    components: { 
      MyHeader,
      MyLoading,
      MyAudio,
      Scroll,
      Timing,
      Loading,
      transfer
    },
    beforeDestroy() {

    },
    destroyed() {

    },
    deactivated() {
      clearInterval(this.interval_residence_time)
      this.$buryPoint("residenceTime", "时时彩--首页停留时间", `用户在时时彩首页停留了${minutesAndSeconds(this.residence_time)}`)
      this.residence_time = 0
      this.isCurrentPage = false
      if (this.interval_updating) clearTimeout(this.interval_updating)
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/mixin'
@import '~common/style/variable'
  .container
    background: linear-gradient(180deg,rgba(22,107,206,1) 0%,rgba(1,132,208,1) 100%)
    color: #fff 
    font-size: 0
    min-height: 100vh
    text-align: left
    .guide
      fixed-full(1000)
      //transition-delay: .5s !important
      transition: all 1s
      background: rgba(0,0,0,.6)
      .guide-box
        width: 1.03rem
        position: absolute
        left: calc(50% + .15rem)
        //top: 50%
        transform: translateX(-50%)
        transition: all .5s
        img
          width: 100%
          margin-left: 1rem
          transition: all .5s
      &.on
        background: rgba(0,0,0,.2)
        img
          margin-left: 0      
    .loading-pageData
      absolute-full(500)  
    .select-category
      .h3
        height: h =.24rem
        line-height: h
        text-align: center
        font-size: .17rem
        font-family: PingFangSC
        font-weight: 600
        color: #fff
        text-shadow:0px 1px 1px rgba(38,117,209,1)
        padding-bottom: .06rem
        &.on img
          transform: rotate(180deg)
        img
          width: .2rem
          height: .24rem
          transform-origin: center
          transition: all .5s
      .select-category-box
        padding: .05rem .17rem
        text-align: center
        dl 
          dd   
            float: left
            width: 30%
            margin: .05rem 0
            height: h = .28rem    
            line-height: h 
            back-image($ASSETSURL + '/lucky/images/btn_01.png')
            font-size: .13rem
            font-weight: bold
            color: rgba(0,121,226,1)
            background-size: 100% 100%
            &:nth-child(3n - 1)
              margin: .05rem 5%
            &.cur
              background-image: url($ASSETSURL + '/lucky/images/btn_01s.png')
          &.en dd
            font-size: .12rem
            word-break: break-word
            line-height: .12rem 
            padding: .02rem 0
            box-sizing: border-box   
      .issue-number
        padding: .1rem .22rem .13rem .16rem
        background: #1288DA url($ASSETSURL + '/lucky/images/bg_01.png') no-repeat center top
        background-size: 100%
        margin-top: .05rem
        text-align: left
        &.en p:nth-child(2)
            width: 18%
          &.en p:nth-child(5)
            width: 24% 
        .issue-number-box
          height: 1.09rem
          //height: 2.24rem
          .scroll-box
            height: 100%
            overflow: hidden
          &.max-height
            height: 2.24rem  
        .issue-number-title
          height: h =.18rem
          line-height: h
          font-size: .13rem
          font-family: PingFangSC
          font-weight: bold;
          color: rgba(207,231,247,1)
          margin-bottom: .08rem
          white-space: nowrap
        p:first-child
          width: 22% 
        p:nth-child(2)
          width: 30%
        p:nth-child(3)
          width: 8%
        p:nth-child(4)
          width: 8%
          margin: 0 12%
        p:nth-child(5)
          width: 8% 
        ul li
          height: h = .17rem
          line-height: h
          color: rgba(137,195,236,1)
          font-size: .12rem
          white-space: nowrap
          &.toast
            padding: .15rem 0
            text-align: center
            color: #fff
          p:nth-child(2)~p
            color: rgba(207,231,247,1)                
          &:not(:last-child)
            margin-bottom: .06rem
          &.wait-for p:nth-child(2)
            color:rgba(255,186,106,1)
    .ball-selection
      position: fixed
      width: 100%
      left: 0
      //top: .7rem
      bottom: 0
      z-index: 200
      &.transition
        transition: top .5s
      &.isSatisfy
        bottom: .56rem
      .timing
        height: h = .3rem
        position: relative
        back-image($ASSETSURL + '/lucky/images/bg_03.png')
        z-index: 100
        p
          font-size: .11rem
          font-family: PingFangSC
          color: rgba(160,207,240,1)
          text-align: center
          height: _h = .23rem
          line-height: _h
          position: relative
          z-index: 5
        .timing-box
          position: relative
          z-index: 10  
          padding-left: .05rem
        &::before
          content: ''
          display: block
          width: 100%
          height: .23rem  
          background:linear-gradient(180deg,rgba(38,160,239,1) 0%,rgba(14,134,217,1) 10%,rgba(26,140,222,1) 86%,rgba(21,137,220,1) 100%)
          position: absolute
          left: 0
          top: 0
          z-index: 1
        &::after
          content: ''
          display: block
          width: .46rem
          height: .08rem
          back-image($ASSETSURL + '/lucky/images/icon_06.png')
          background-size: .16rem
          background-position: center top
          position: absolute
          left: calc(50% - .23rem)
          bottom: 0
          transform-origin: center
          z-index: 10
      &.on .timing::after
        transform: rotate(180deg)
        background-position: center bottom        
      .ball-selection-box
        back-image($ASSETSURL + '/lucky/images/bg_02.png')
        height: calc(100% - .23rem)
        margin-top: -.07rem
        .scroll-box
          height: 100%
          overflow: hidden
        h3
          // height: h = .17rem
          line-height: .17rem
          font-size: .12rem
          font-family: PingFangSC
          color: #fff
          padding: .15rem 5% .1rem 
          text-align: center
        ul
          padding-bottom: .2rem
          &.alternative dd
            font-size: .24rem
            margin: 0 .13rem
          &.alternative li
            padding-bottom: .24rem 
            &.en dd
              font-size: .14rem  
          li
            padding: 0 0 .14rem .46rem
            position: relative
            p  
              width: .33rem
              padding: .08rem .115rem 0 .085rem
              box-sizing: border-box
              height: .58rem
              back-image($ASSETSURL + '/lucky/images/icon_08.png')
              position: absolute
              left: -.03rem
              top: -1px
              font-size: .13rem
              font-family: PingFangSC
              font-weight: bold
              line-height: .18rem
              color:rgba(37,120,210,1)
            &.en P
              padding-top: 0
            // &.en
            //   padding-left: .6rem
            //   p
            //     width: .72rem
            //     font-size: .1rem
            //     background-size: 100% 100% 
            //     left: -.07rem
            //     text-align: center 
            //     padding-top: 0
            //     line-height: .12rem
            //     height: .32rem
            //     span
            //       margin-top: -.02rem
        dl 
          dd
            width: .52rem
            height: h =.52rem
            line-height: h
            text-align: center
            back-image($ASSETSURL + '/lucky/images/icon_07.png')
            box-shadow:0px 2px 2px rgba(50,135,191,0.6)
            float: left
            margin: .05rem
            border-radius: 50% 
            font-size: .27rem
            font-family: "DIN-BOLD"
            font-family: DIN-BOLD
            font-weight: bolder
            color: rgba(193,232,255,1)
            text-shadow: 0px 1px 3px rgba(60,138,214,1) 
            &.cur
              background-image: url($ASSETSURL + '/lucky/images/icon_07s.png')
              color: rgba(227,89,3,1)
              text-shadow: none
    .betting-list
      width: 100%
      height: 100%
      position: fixed
      left: 0
      bottom: 0
      padding-bottom: .56rem
      background:rgba(0,20,43,.5)
      box-sizing: border-box
      z-index: 300
      .betting-list-box
        position: absolute
        width: 100%
        left: 0
        bottom: .56rem
        padding: 0 .16rem
        box-sizing: border-box
        back-image($ASSETSURL + '/lucky/images/bg_05.png')
        animation: bottom-top .5s forwards
        h3
          width: 1.1rem
          height: h =.34rem
          line-height: h
          text-align: center
          back-image($ASSETSURL + '/lucky/images/bg_04.png')
          position: absolute
          top: -.02rem
          left: calc(50% - .55rem)
          font-size: .15rem
          font-family: PingFangSC;
          font-weight: 600
          color:rgba(180,222,255,1)
        .empty
          text-align: right
          height: h = .18rem
          line-height: h
          font-size: .13rem
          font-family: PingFangSC
          font-weight: bold
          color: rgba(223,236,249,1)
          padding: .15rem 0 
        ul
          padding-bottom: .15rem
          li
            padding: .12rem 0
            border-top: 1px solid #91C1ED
            border-bottom: 1px solid #91C1ED
            position: relative
            .delete
              width: .12rem
              height: .12rem
              back-image($ASSETSURL + '/lucky/images/btn_close.png')
              background-size: .12rem;
              position: absolute;
              right: -.1rem;
              top: 0.06rem;
              padding: .1rem;
            .num
              line-height: .21rem
              font-size: .15rem
              font-family: PingFangSC
              color:rgba(24,118,217,1)
              word-wrap: break-word;
              p
                margin-right: .16rem
                font-weight: bold
                display: inline-block
                vertical-align: top
            span
              color: #fff
              margin-right: .15rem
              display: inline-block
            h4
              height: h = .17rem
              line-height: h
              font-size: .12rem
              font-family: PingFangSC
              color: rgba(255,255,255,.6)
              margin: .04rem 0 .12rem
              span
                padding-left: .16rem
                color: rgba(255,255,255,.6)
            .add-reduce
              h5
                height: h = .16rem
                line-height: h
                font-size: .11rem
                font-family:  PingFangSC;
                color: rgba(255,255,255,.6) 
                margin-bottom: .04rem
              span
                display: block
                height: h = .17rem
                line-height: h
                font-size: .12rem
                font-family: PingFangSC
                font-weight: bold
                color: #fff
              .btn
                width: .28rem
                height: .28rem
                back-image($ASSETSURL + '/lucky/images/btn_04.png')
                &.on
                  back-image($ASSETSURL + '/lucky/images/btn_04s.png')
                &.add
                  back-image($ASSETSURL + '/lucky/images/btn_05.png')
                  &.on
                    back-image($ASSETSURL + '/lucky/images/btn_05s.png')
              .number
                width: .71rem
                height: h = .23rem
                line-height: h
                text-align: center
                background: linear-gradient(180deg,rgba(56,140,235,1) 0%,rgba(67,156,232,1) 100%)
                box-shadow: 0px 1px 1px rgba(154,210,255,1)
                border-radius: .05rem
                margin: 0 .05rem 
                font-size: 0
                input
                  width: 100%
                  height: h
                  line-height: h
                  text-align: center
                  font-size: .12rem
                  font-family: PingFangSC
                  font-weight: bold
                  background: none
                  color: #fff 
    .scroll-betting-list
      height: auto
      .scroll-betting-con 
        height: 100%
        overflow: hidden
      &.on
       height: 4.98rem                            
    .betting
      position: fixed
      width: 100%
      left: 0
      bottom: 0
      z-index: 400
      transform: translateY(100%)
      transition: all .5s
      &.en p
        line-height: .14rem !important 
      &.on
        transform: translateY(0)
      .betting-con
        box-sizing: border-box
        position: relative
        z-index: 20
        .betting-box
          height: .64rem
          background: linear-gradient(360deg,rgba(22,107,206,1) 0%,rgba(42,163,234,1) 100%)
          padding:0 .05rem
          width: 100%
          position: relative
          z-index: 50
          text-align: left
          .left
            span
              display: block
              //width: .38rem
              height: h = .26rem
              line-height: h
              text-align: center
              //back-image($ASSETSURL + '/lucky/images/btn_02.png')
              //background-size: 100% 100%
              background: linear-gradient(180deg, #7172F1, #4646CE)
              border: .02rem solid #95C9E3
              box-shadow:0px 2px 2px rgba(13,75,147,0.31)
              border-radius: h
              margin-right: .05rem
              font-size: .11rem
              font-family: PingFangSC
              padding: 0 .1rem
              word-break: break-all
              white-space: nowrap
            h4
              font-size: .14rem
              font-family: PingFangSC
              font-weight: bold
            p
              //height: h = .18rem
              line-height: .18rem
              font-size: .12rem
              font-family: PingFangSC;
              color: rgba(255,255,255,.6)
              padding-bottom:.02rem
            h5
              font-size: .1rem
              font-family: PingFangSC
              color: rgba(165,205,239,1)
          .left
            flex: 1
            //padding-right: .15rem    
          .right
            width: 1.2rem
            height: h = .4rem
            line-height: h
            text-align: center
            back-image($ASSETSURL + '/lucky/images/btn_03.png')
            font-family: Helvetica
            font-weight: bold
            color:rgba(255,255,255,1)
            text-shadow:0px 1px 2px rgba(42,177,42,1)
            font-size: .17rem
          &.on
            background-image: url($ASSETSURL + '/lucky/images/btn_03s.png') 
        .cur-betting
          width: 100%
          height: h =.2rem
          line-height: h
          background: rgba(245,244,225,.95)
          position: absolute
          left:0
          bottom: 100%
          padding-left: .08rem
          box-sizing: border-box
          transition: all .5s
          z-index: 20
          text-align: left
          overflow-x:auto
          -webkit-overflow-scrolling: touch
          overflow-y: hidden
          span
            font-size: .13rem
            font-family: PingFangSC
            font-weight: bold
            color: rgba(227,89,3,1)
            margin-right: .25rem
  .bottom-top-enter, .bottom-top-leave-active
    opcity: 0
    transform: translateY(100%)
  .fadeInOut-leave-active
    opcity: 0
    //transform: translateX(100%)                     
</style>