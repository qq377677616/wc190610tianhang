<template>
  <div class="dice-home">
    <audio src="./static/music/dice-bk.mp3" loop="loop" id="dice-bk"></audio>    
    <div class="nav">
      <img :src="ASSETSURL+'/dice/image/back.png'" alt="" class="back" @click="goBack">
      <div class="balance">
        <img :src="ASSETSURL+'/dice/image/balance-icon.png'" alt="">
        <span class="balance-value" @click.stop="handleTransfer">{{balance}}</span>
        <span class="pm" >WLC</span>
      </div>
      <div style="margin-left:auto;">
        <img :src="musicBk" alt="" class="music" @click="musicChange(musicBk)">
        <img :src="ASSETSURL+'/dice/image/rule.png'" alt="" class="rule" @click="toRule">
      </div>
    </div>
    <div class="broadcast">
      <img :src="ASSETSURL+'/dice/image/broadcast-icon.png'" alt="" class="icon">
      <div class="show-content">
        <div class="content" :style="loopStyle">
          <div class="line" v-for="item in loopData" :key="item.id">
            <span class="hash" >{{item.userName}}</span>
            <span class="reward" v-if="lang == 'en' &&item.operateType == 200">{{$t('dice.home[0]')}} {{item.fee}} WLC {{$t('dice.home[1]')}} {{item.displayPeriodNum}}</span>
            <span class="reward" v-if="lang == 'zh-CHS' &&item.operateType == 200 ||lang == 'zh-CHT' &&item.operateType == 200">在{{item.displayPeriodNum}}{{$t('dice.home[0]')}}{{item.fee}} WLC</span>
            <span class="reward" v-if="lang == 'en' &&item.operateType == 100">{{$t('dice.home[2]')}} {{item.fee}} WLC {{$t('dice.home[1]')}} {{item.displayPeriodNum}}</span>
            <span class="reward" v-if="lang == 'zh-CHS' &&item.operateType == 100 || lang == 'zh-CHT' &&item.operateType == 100">在{{item.displayPeriodNum}}{{$t('dice.home[1]')}}{{item.fee}} WLC</span>
          </div>
        </div>
      </div>
    </div>
    <div class="total">
      <span class="title">{{$t('dice.home_titile[0]')}}</span>
      <span class="num">{{total}}</span>
      <span class="pm">WLC</span>
    </div>
    <div class="main-top">
      <div class="desc" :class="lang">{{$t('dice.home_titile[1]')}}</div>
    </div>
    <div class="main">
        <div class="top-price animated zoomIn" v-for="item in topData" :key="item.id" v-if="item.show">
            <div>{{item.fee}}WLC</div>
            <div>{{item.userName}} {{$t('dice.home_titile[3]')}} </div>
            <div>{{$t('dice.home_titile[4]')}}！</div>
        </div>
        <div class=" animated zoomIn bet-success" v-if="betSuccess">
          <span>
            {{betText}}
          </span>
        </div>
      <div style="height: 3rem;overflow: hidden;">
        <table id="data-table" :style="{transform:tableTopT}">
          <tbody>
            <template v-for="(item) in recording">
              <tr :key="item.id"> 
                <td class="block-height" style="width:13%;padding-left:5px;">{{item.displayPeriodNum}}</td>
                <td class="block-hash" style="width:53%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-left:12px;" v-html="item.info"></td>
                <td class="block-num" style="width:12%;">{{item.lotteryNumV}}</td>
                <td class="block-time" style="width:22%;">{{item.lotteryAt | time}}</td>
              </tr>
              <transition name="" :key="item.id">
              <tr :key="item.id" v-if="item.show" class="block-detail">

                  <table>
                    <tr style="border-bottom:1px solid rgba(23,68,59,1);">
                      <th style="text-align:left;padding-left:14px;width:20%;">名称</th>
                      <th style="width:20%;">时间</th>
                      <th style="width:50%;">哈希值</th>
                      <th style="width:10%;"></th>
                    </tr>
                    <tr v-for="i in item.hashList" :key="i.id">
                      <td style="text-align:left;padding-left:14px;width:20%;" v-if="i.nameCode == 100">EOS哈希</td>
                      <td style="text-align:left;padding-left:14px;width:20%;" v-else-if="i.nameCode == 200">区块链哈希</td>
                      <td style="text-align:left;padding-left:14px;width:20%;" v-else-if="i.nameCode == 300">公钥哈希</td>
                      <td style="text-align:left;padding-left:14px;width:20%;" v-else-if="i.nameCode == 400">转化值</td>
                      <td style="text-align:left;padding-left:14px;width:20%;" v-else="i.nameCode == 400"></td>
                      <td style="width:20%;">{{i.time | changeTime}}</td>
                      <td style="width:50%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-html="i.info"></td>
                      <td v-if="i.nameCode == 400" style="color:#70FF4D;" @click="check(i)">
                        校验
                      </td>
                      <td style="width:10%;" v-else>
                        <button 
                          class="block-btn"
                          v-clipboard:copy="i.hashValue"
                          v-clipboard:success="onCopy"
                          v-clipboard:error="onError">复制</button>
                      </td>
                    </tr>
                  </table>
              </tr>
              </transition>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="game">
      <transition>
      <div class="lucky" v-show="isLucky"><span>{{lucky}}</span><div>{{$t('dice.home_titile[2]')}}</div ></div>
      </transition>
      <div class="tab">
        <div class="line" 
          v-for="item in $t('dice.home_tab')" 
          :key="item.id" 
          :class="item.id == activeLine? 'active':''"
          @click='changeTab(item.id)'>
          {{item.name}}
        </div>
      </div>
      <div style="height: 6.2rem;overflow: hidden;">
        <div class="bet" id="bet" v-show="activeLine=='line1'">
          <div class="info">
              <div style="width: 2rem;text-align: left;">
                <span class="odds-title">{{$t('dice.home_tab1[0]')}}:</span><span class="odds-num">{{oddsVal}}x</span>
              </div>
              <div>
                <div class="prediction-num">{{value}}</div>
                <div class="odds-title">{{$t('dice.home_tab1[1]')}}</div>
              </div>
              <div style="width:2rem;text-align:right;white-space: nowrap;">
                <span class="odds-title">{{$t('dice.home_tab1[2]')}}:</span>
                <span class="rate-num">{{winP}}</span>
              </div>
          </div>
          <div class="slider" >
            <span>0</span>
            <vue-slider v-model="value" :min="minVal" :max="maxVal" :class="'slider'+activeSection" v-if="isSlider"></vue-slider>
            <span>99</span>
          </div>
          <div class="btn">
              <div class="section" 
                v-for="item in $t('dice.home_section')" 
                :key="item.id"
                @click="changeSection(item.id)"
                :class="item.id==activeSection? 'active':''">
                {{item.name}}
              </div>
          </div>
          <div class="info2">
            <div>
              <span class="title">{{$t('dice.home_tab1[3]')}}:</span>
              <span class="num">{{proBonus}}WLC</span>
            </div>
            <div>
              <span class="title">{{$t('dice.home_tab1[4]')}}:</span>
              <span class="title">{{periodNum}}</span>
            </div>
          </div>
          <div class="action">
            <div class="enter">
              <input type="tel" v-model="betVal" pattern="[0-9]*" @blur="setKeyBord" @focus="setBordUp" id="input">
              <span>WLC</span>
            </div>
            <div class="size">
              <span v-for="item in sizeData" :key="item.data" @click="changeSize(item)">{{item}}</span>
            </div>
          </div>
          <div :style="{backgroundImage:'url('+betOnHide+')'}"></div>
          <v-touch class="sure-bet" @touchstart.native="betStart" @touchend.native="betEnd" :style="{backgroundImage:'url('+betBk+')'}">
            {{$t('dice.home_tab1[5]')}}
          </v-touch>
        </div>
        <div class="record" id="record" v-show="activeLine=='line2'">
          <loading is-full="1" is-icon="1"  v-if="recordData.length==0" style="height:100%;"></loading>
          <div class="table-head" id="table-head">
            <table>
                <tr style="height:auto;">
                  <th class="left" style="width:22%;">{{$t('dice.home_tab2[0]')}}</th>
                  <th style="width:32%;">{{$t('dice.home_tab2[1]')}}</th>
                  <th style="width:20%;">{{$t('dice.home_tab2[2]')}}</th>
                  <th style="width:26%;">{{$t('dice.home_tab2[3]')}}(WLC)</th>
                </tr>
            </table>
          </div>
          <div class="table-body" id="table-body"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <table v-if="recordData.length>0">
              <tbody>
                <tr v-for="item in recordData" :key="item.id">
                  <td class="left" style="width:22%;">{{item.betedAt | changeTime}}</td>
                  <td style="width:32%;">{{item.userName}}</td>
                  <td style="width:20%;color:#E0DCBC;">{{item.content}}</td>
                  <td style="width:26%;color:#70FF4D;">{{item.bonus}}</td>
                </tr>
              </tbody>
            </table>
            <div style="margin-top:2rem;color:#45B19C;" v-else></div>
          </div>
        </div>
        <div class="my-order" id="my-order" v-show="activeLine=='line3'" v-infinite-scroll="loadMore1" infinite-scroll-disabled="busy1" infinite-scroll-distance="10">
          <loading is-full="1" is-icon="1"  v-if="orderData.length==0 && orderDataLoading" style="height:100%;"></loading>
          <div class="order-line" v-for="item in orderData" :key="item.id" >
            <div class="flex">
              <div :class="item.status == 200? 'order-in':''">
                <span class="num large mr-5">{{item.content}}</span>
                <span class="title">{{$t('dice.home_tab3[0]')}}:</span>
                <span class="title">{{item.luckyNum}}</span>
              </div>
              <div class="num large">{{item.odds}}X</div>
              <span class="title large" v-if="item.status == 400">{{$t('dice.home_tab3[1]')}}</span>
              <span class="title large" v-if="item.status == 100">{{$t('dice.home_tab3[2]')}}</span>
              <span class="title large" v-if="item.status == 200" style="color:#70FF4D;">+{{item.bonus}}WLC</span>
            </div>
            <div class="flex">
              <span class="title">{{$t('dice.home_tab3[3]')}}: {{item.displayPeriodNum}}</span>
              <span class="title">{{$t('dice.home_tab3[4]')}}: {{item.betFee}}WLC</span>
            </div>    
            <div class="flex">
              <span class="title">{{$t('dice.home_tab3[5]')}}: {{item.betAt}}</span>
              <span class="title" v-if="item.lotteryNum && item.lotteryNum >= 0">{{$t('dice.home_tab3[6]')}}: {{item.lotteryNumZ}}</span>
              <span class="title" v-else-if="item.lotteryNum < 0">{{$t('dice.home_tab3[6]')}}: —</span>
              <span class="title" v-else>{{$t('dice.home_tab3[6]')}}: —</span>
            </div>
          </div>
          <div style="margin-top:2rem;color:#45B19C;" v-if="orderData.length==0&&!orderDataLoading">{{$t('dice.home_tab3[7]')}}</div>
        </div>
      </div>
    </div>
    <div class="check-layer" v-show="isCheck">
      <div class="layer-content">
          <img :src="ASSETSURL+'/dice/image/layer-close.png'" alt="" class="close" @click='closeLayer'>
          <div class="title">奖号验证</div>
          <div class="name">输入对应的号源</div>
          <textarea v-model="hashVal" class="hash-val"></textarea>
          <v-touch class="check-hash" @touchstart.native="checkStart" @touchend.native="checkEnd" :style="{backgroundImage:'url('+checkBK+')'}">
            校验
          </v-touch>
          <div :style="{backgroundImage:'url('+checkHashHide+')'}"></div>
          <div class="check-title">校验结果</div>
          <div class="result">
            <span>SHA256转化值</span>
            <input type="text">
          </div>
      </div>
    </div>
    <lang ref="langs"></lang>
     <!-- 划转弹框 -->
    <transfer ref="transferData" ></transfer>
  </div>
</template>

<script>
// @ is an alias to /src
let bet = 'https://res.whatthebet.com/games/assets/dice/image/bet-sure.png'
let betOn = 'https://res.whatthebet.com/games/assets/dice/image/bet-sure-active.png'
let check = 'https://res.whatthebet.com/games/assets/dice/image/check-hash.png'
let checkOn = 'https://res.whatthebet.com/games/assets/dice/image/check-hash-on.png'
let music = 'https://res.whatthebet.com/games/assets/dice/image/music.png'
let musicS = 'https://res.whatthebet.com/games/assets/dice/image/music-stop.png'
import vueSlider from 'vue-slider-component';
import '../../common/js/dice.js'
import { musicSeting } from 'common/js/util'
import { mapState, mapMutations } from 'vuex'
import Loading from 'base/loading/loading'
// import { setTimeout, setInterval } from 'timers';
import bridge from '@/tools/bridge.js'
import { getHome,getDiceRecord,getDiceJackpot,getDiceTopprize,getDiceLoopplay,diceBet,getDiceHistory,getDiceBetHistory} from "api/request"
import Lang from 'base/lang/lang'
import transfer from "@/components/common/transferDialog"
import { setTimeout } from 'timers';
export default {
  name: 'home',
  components: {
    vueSlider,
    Lang,
    Loading,
    transfer
  },
  data(){
    return {
      betSuccess:false,
      betText:'',
      tableTop:0,
      tableTopT:'',
      musicBk:musicS,
      recording:null,
      expandIndex:null,
      betVal:1,
      betOnHide:betOn,
      maxFee:0,//最大可下注数量
      activeLine:'line1',
      odds:0,
      oddsVal:0,
      winP:0,
      value: 50,
      minVal:2,
      maxVal:97,
      isSlider:false,
      activeSection:'1',
      sizeData:['1/2','2X','MAX'],
      betBk:bet,
      recordData:[],
      recordPage:1,
      recordLoading:true,
      orderLoading:true,
      orderDataLoading:true,
      orderData:[],
      basy:false,
      basy1:false,
      proBonus:0,
      hashList: null,
      isCheck:false,
      hashVal:null,
      checkBK:check,
      checkHashHide:checkOn,
      total:0,
      periodNum:0,
      balance:0,
      lucky:null,
      isLucky:false,
      orderPage:1,
      beting:false,
      loopData:[],
      loopStyle:null,
      topData:[],
      lotteryPage:1,
      minBet:0,
      tableTrsIndex: 0,
      tableInterval:null,
      tableNum:1,
    }
  },
  watch:{
    'value':function(newVal,oldVal) {
        this.setPro();
    },
    'betVal':function(newVal,oldVal) {
      this.proBonus = Math.floor((newVal*this.oddsVal) * 100) / 100;
      if (newVal.indexOf('0')== 0) {
        this.betVal = 1;
      }
    }
  },
  computed:{
    'lang':function(){
      return this.$store.state.langs;
    },
    ...mapState({
        ASSETSURL: 'ASSETSURL'    
      })
  },
  destroyed() {
    this.$store.commit('updateIsLoading',false);
  },
  mounted() {
    const top = document.getElementById('input').top;
    this.$store.commit('updateIsLoading',true);

    //默认一开始不自动播放音乐
    // document.addEventListener('touchstart', function () {
    //   var musicEle0 = document.getElementById('dice-bk');
    //       musicEle0.play();
    // });
    const self = this;
    // 获取首页信息
    getHome().then(response => {
       self.odds = response.data.odds;
        self.balance   = Math.floor(response.data.balance * 100) / 100;
        self.minBet = Math.floor(response.data.minBetMoney * 100) / 100;
        // self.betVal = Math.floor(response.data.minBetMoney * 100) / 100;
        self.minBetMoney = Math.floor(response.data.minBetMoney * 100) / 100;
        self.getTotal();
        self.getTableData();
        self.setPro();
        self.getLoop();
        self.loopFnc=setInterval(function(){
          self.getTotal();
        },4000);
    })
     this.$router.beforeEach((to, from, next) => {
      clearInterval(this.loopFnc);
      clearInterval(this.tableInterval);
      next();
    })
    // 获取bet高度
    self.$nextTick(function() {
      const _height = document.getElementById('bet').offsetHeight - 12;
      document.getElementById('record').style.height = _height+'px';
      document.getElementById('my-order').style.height = _height+'px';
      self.addScript();
    })
  },
  activated() {
    this.addScript();
    this.changeSection(1);
    this.activeLine = 'line1';
    const self =this;
    setTimeout(function(){
      self.isSlider =true;
    },700)
  },
  methods:{
    handleTransfer(){
        this.$refs.transferData.showMask = true
        this.$refs.transferData.showDialog = true
    },
    langSwitch () {
        this.$refs.langs.langSwitch()
      },
    addScript() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "./static/js/dice.js";
      document.body.appendChild(script);
    },
    goBack(){
      if (typeof wayki != 'undefined') {
        wayki.finishActivity()
      } else {
          bridge.callhandler("notifyAppPop")
      }
    },
    getTableData() {
      // 获取开奖记录
      const self = this;
      getDiceRecord({
          params: {
            beginAt:self.recording&&self.recording.length>0?self.recording[0].periodNum:0,
          }
        }).then(res => {
          const data = res.data;
          if(!data || data.length == 0) {
            clearInterval(self.tableInterval);
            return;
          }
          let val;
          for(const v of data) {
            v.show = false;
            const data = v.blockInfo.split('').reverse().join('').substring(0,20).split('');
            v.lotteryNumV = self.zfill(v.lotteryNum,2);
            const arr =  String(self.zfill(v.lotteryNum,2)).split('');
            for(let i =0;i<arr.length;i++) {
              for(let y = 0;y<data.length;y++) {
                if (arr[i] == data[y]) {
                  data[y] = `<span style='color:#E0DCBC;'>${data[y]}</span>`;
                  break;
                }
              }
            }
            v.info = '...'+data.reverse().join('')
          }
          if (self.recording&&self.recording.length>0) {
            self.recording = data.concat(self.recording);
          } else {
            self.recording =data;
          }
          this.tableInterval = setInterval(() =>{
            self.tableTop += 0.6;
            self.tableTopT = `translateY(${self.tableTop}rem)`;
             self.tableTrsIndex = self.tableTrsIndex +1;
            if(self.tableTrsIndex == self.recording.length - 5){
              clearInterval(this.tableInterval)
              self.tableNum = self.tableNum+1;
              self.getTableData();
            }
          },3000)
        })
    },
    getTotal() {
      const self = this;
      // 获取奖金池数据
      getDiceJackpot()
      .then(function (response) {
        self.total = Math.floor(response.data.jackpotMoneny * 100) / 100;
        self.periodNum = response.data.displayPeriodNum;
        self.maxFee = Math.floor(response.data.maxFee * 100) / 100;
        getHome().then(response1 => {
          self.balance   = Math.floor(response1.data.balance * 100) / 100;
        })
      })
      .catch(function (error) {
        console.log(error);
      });
      self.getTopprice();
    },
    // 将个位数补0
    zfill(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    },
    getTopprice() {
      const self = this;
      getDiceTopprize()
      .then(res=>{
        const data = res.data;
        if(data.length >0){
          self.topData = data;
          self.topData[0].show = true;
          self.topIndex=0;
          const interval = setInterval(function() {
            self.topData[self.topIndex].show = false;
            self.topIndex = self.topIndex+1;
            self.topData[self.topIndex].show = true;
            if (self.topIndex == self.topData.length) {
              clearInterval(interval)
            }
          },2000)
        }
      })
      .catch(error=>console.log(error));
    },
    getLoop() {
      const self = this;
      // 获取轮播信息
      getDiceLoopplay()
      .then(function(res){
        const data = res.data;
        self.loopData = data;
        const length = data.length;
        self.loopIndex = 0;
        const interval = setInterval(function() {
          self.loopIndex = self.loopIndex+1;
          if (self.loopIndex<length){
            self.loopStyle = `transform:translateY(-${self.loopIndex*0.5}rem);transition: transform 666ms cubic-bezier(.666,0,.333,1),background-color 666ms linear;`;
          }
          if (self.loopIndex == length) {
            clearInterval(interval);
            self.loopStyle = `transform:translateY(0rem);`;
            self.getLoop();
          }
        },2000)
      })
      .catch(error => console.log(error));
    },
    changeTab(id) {
      const self = this;
      this.activeLine = id;
      this.recordLoading = true;
      this.orderLoading = true;
      if (id =='line2') {
        this.$buryPoint("clickTab", "dice_home", "点击获奖投注tab")
        this.getRecordData();
        this.orderPage = 1;
        this.orderData = [];
        this.orderDataLoading = true;
      } else if (id=='line3') {
        this.$buryPoint("clickTab", "dice_home", "点击我的投注tab")
        this.recordPage =1;
        this.recordData = [];
        this.getOrderData();
      } else {
        this.$buryPoint("clickTab", "dice_home", "点击下注tab")
        this.recordPage =1;
        this.recordData = [];
        this.orderPage = 1;
        this.orderData = [];
        this.orderDataLoading = true;
      }
    },
    changeSection(id) {
      this.activeSection = id;
      if (id == 2) {
        this.$buryPoint("clickOpt", "dice_home", "点击等于")
      } else if (id == 1) {
        this.$buryPoint("clickOpt", "dice_home", "点击小于")
      } else if (id == 3) {
        this.$buryPoint("clickOpt", "dice_home", "点击大于")
      }
      this.setPro();
    },
    changeSize(id) {
      const data =this.betVal;
      if(id == '1/2') {
        if (data/2 > this.minBetMoney) {
          this.betVal = Math.floor(data/2 * 10) / 10;
        } else {
          this.betVal = Math.floor(this.minBetMoney * 10) / 10;
        }
        this.$buryPoint("clickSize", "dice_home", "点击1/2")
      } else if(id == '2X') {
        this.$buryPoint("clickSize", "dice_home", "点击2x")
        if (data*2 > this.maxFee && this.balance>this.maxFee) {
          this.betVal = Math.floor(this.maxFee * 10) / 10;
        } if (data*2 > this.maxFee && this.balance<this.maxFee) {
          this.betVal = Math.floor(this.balance * 10) / 10;
        }else {
          this.betVal = Math.floor(data*2 * 10) / 10;
        }
      } else if(id == 'MAX') {
        this.$buryPoint("clickSize", "dice_home", "点击MAX")
        // TODO 取最大余额
        if (this.balance>this.maxFee) {
          this.betVal = Math.floor(this.maxFee * 10) / 10;
        } else {
          this.betVal = Math.floor(this.balance * 10) / 10;
        }
      }
      this.setPro();
    },
    betStart() {
      this.betBk = betOn;
    },
    betEnd() {
      this.$buryPoint("clickBet", "dice_home", "点击下注")
      this.betBk = bet;
      if (this.beting) {
        return;
      }
      
      this.beting = true;
      const self = this;
      // 下注
      let str;
      if (this.activeSection == 1) {
        str = '<'+this.value;
      } else if (this.activeSection == 2) {
        str = '='+this.value;
      } else if (this.activeSection == 3) {
        str = '>'+this.value;
      }
      if(this.betVal< this.minBet) {
        let tost;
        if (this.lang == 'en') {
          tost = 'The minimum amount is '
        } else if (this.lang == 'zh-CHS') {
          tost = '金额不能低于'
        } else if (this.lang == 'zh-CHT') {
          tost = '金額不能低於'
        }
        self.$toasted.show(tost+self.minBet,{ 
            theme: "toasted-primary", 
            position: "top-center", 
            duration : 2000
          })
          self.beting = false;
        return;
      }
      if(!/^\d{1,9}(\.{0}|\.{1}\d{1,2})?$/.test(self.betVal)){
         self.$toasted.show('请输入数字',{ 
            theme: "toasted-primary", 
            position: "top-center", 
            duration : 2000
          })
          self.beting = false;
        return;
      }
      if (this.betVal > this.balance) {
          let tost;
          if (this.lang == 'en') {
            tost = 'Insufficient Balance'
          } else if (this.lang == 'zh-CHS') {
            tost = '余额不足'
          } else if (this.lang == 'zh-CHT') {
            tost = '餘額不足'
          }
         self.$toasted.show(tost,{ 
            theme: "toasted-primary", 
            position: "top-center", 
            duration : 2000
          })
          self.beting = false;
          this.handleTransfer() //余额不足时弹框
        return;
      }
      if (this.betVal > 1000 || this.betVal > this.maxFee) {
          let tost;
          if (this.lang == 'en') {
            tost = 'The maximum amount is'
          } else if (this.lang == 'zh-CHS') {
            tost = '金额不能超过'
          } else if (this.lang == 'zh-CHT') {
            tost = '金額不能超過'
          }
          self.$toasted.show(tost+self.maxFee,{ 
            theme: "toasted-primary", 
            position: "top-center", 
            duration : 2000
          })
          self.beting = false;
        return;
      }
      diceBet({
        "content": str,
        "fee": this.betVal
      })
      .then(function (response) {
        // self.orderData = response.data.data;
        // self.orderData = [1];
        
        if(response.code == 0){
          let tost;
          if (self.lang == 'en') {
            tost = 'Bet Succeeds'
          } else if (self.lang == 'zh-CHS') {
            tost = '下注成功'
          } else if (self.lang == 'zh-CHT') {
            tost = '下注成功'
          }
          self.betSuccess = true;
          self.betText = tost;
          setTimeout(function() {
            self.betSuccess = false;
          },2000)
          self.lucky = response.data;
          self.isLucky =true;
          self.beting = false;
          setTimeout(function() {
            self.isLucky = false;
          },6000);
        } else {
          let tost;
          if (self.lang == 'en') {
            tost = 'Bet failure'
          } else if (self.lang == 'zh-CHS') {
            tost = '下注失败'
          } else if (self.lang == 'zh-CHT') {
            tost = '下注失敗'
          }
          self.betSuccess = true;
          self.betText = tost;
          setTimeout(function() {
            self.betSuccess = false;
          },2000)
          self.beting = false;
        }

      })
      .catch(function (error) {
        let tost;
          if (self.lang == 'en') {
            tost = 'Bet failure'
          } else if (self.lang == 'zh-CHS') {
            tost = '下注失败'
          } else if (self.lang == 'zh-CHT') {
            tost = '下注失敗'
          }
          self.betSuccess = true;
          self.betText = tost;
          setTimeout(function() {
            self.betSuccess = false;
          },2000)
          self.beting = false;
      });
    },
    checkStart() {
      this.checkBK = checkOn;
    },
    checkEnd() {
      this.checkBK = check;
    },
    loadMore: function() {
      this.busy = true;
      if (this.activeLine == 'line2' && this.recordLoading) {
        this.recordPage += 1;
        this.getRecordData();
      }
    },
    loadMore1() {
      this.busy1 = true;
      if (this.activeLine == 'line3' && this.orderLoading) {
        this.orderPage += 1;
        this.getOrderData();
      }
    },
    getRecordData() {
      const self = this;
      // 获取个人获奖记录
        getDiceHistory({
          params: {
          pageSize:10,
          pageNum:self.recordPage
          }
        })
        .then(function (response) {
          if (response.data.length == 0) {
            self.recordLoading = false;
          }
          const data = response.data;
          for(let v of data) {
            v.bonus = self.returnFloat(v.bonus);
          }
          self.recordData = self.recordData.concat(data);
          const _height1 = document.getElementById('record').offsetHeight - 12 - document.getElementById('table-head').offsetHeight;
          document.getElementById('table-body').style.height = _height1+'px';
          self.busy = false;
        })
        .catch(function (error) {
          console.log(error);
          self.busy = false;
        });
    },
    returnFloat(value){
      var value=Math.round(parseFloat(value)*100)/100;
      var xsd=value.toString().split(".");
      if(xsd.length==1){
        value=value.toString()+".00";
        return value;
      }
      if(xsd.length>1){
        if(xsd[1].length<2){
        value=value.toString()+"0";
        }
        return value;
      }
    },
    getOrderData() {
      // 获取个人下注记录
        const self = this;
        getDiceBetHistory({
          params: {
          pageSize:10,
          pageNum:this.orderPage
          }
        })
        .then(function (response) {
          if (response.data.length == 0) {
            self.orderLoading = false;
          }
          const data = response.data;
          for(const v of data) {
            v.odds = Math.floor(v.odds * 100) / 100
            v.lotteryNumZ = self.padNumber(v.lotteryNum,2)
          }
          self.orderData = self.orderData.concat(data);
          self.orderDataLoading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 小数转百分数
    toPercent(point){
      var str=Number(point*100).toFixed(0);
      str+="%";
      return str;
    },
    // 设置赔率、胜率、预计奖金
    setPro() {
      let num;
      if(this.activeSection == '1') {
        num = this.value/100;
        this.winP = this.toPercent(num);
      } else if(this.activeSection == '2'){
        num = 1/100;
        this.winP = this.toPercent(num);
      } else if(this.activeSection == '3') {
        num = (99 - this.value)/100;
        this.winP = this.toPercent(num);
      }
      this.oddsVal = (1/num*this.odds).toFixed(2);
      this.proBonus = Math.floor((this.betVal*this.oddsVal) * 100) / 100
    },
    expandLine(item,index) {
      const self = this;
      // 获取详情数据
      this.$axios.get(baseUrl+'/dice/queryDetailHashInfo',{
          params: {
          periodNum:item.periodsNum
          }
        })
        .then(function (response) {
          const data = response.data.hashList;
          let val;
          for(const v of data) {
            if (v.nameCode == 400&&v.hashValue) {
              const _data = v.hashValue.split('').reverse().join('');
              const returnVal = _data.substring(0,20)+'...';
              const arr =  String(item.lotteryNum).split('');
              const template1 = `<span style='color:#E0DCBC;'>${arr[0]}</span>`.split('').reverse().join('');
              const template2 = `<span style='color:#E0DCBC;'>${arr[1]}</span>`.split('').reverse().join('');
              val = returnVal.replace(arr[0],template1)
              val = val.replace(arr[1],template2)
              v.info = val.split('').reverse().join('');
            } else if(v.nameCode == 400&&!v.hashValue){
              v.info = null;
            }
            if (v.nameCode != 400 && v.hashValue) {
              const _data = v.hashValue.split('').reverse().join('');
              const returnVal = _data.substring(0,20)+'...';
               v.info = returnVal.split('').reverse().join('');
            } else if (v.nameCode != 400 && !v.hashValue){
              v.info = null;
            }
          }
          self.$set(self.recording[index],'hashList',data);
        })
        .catch(function (error) {
          console.log(error);
        });
      const data = this.recording;
      self.expandIndex = index;
      data[index].show = !data[index].show;

    },
    musicChange(key) {
      this.musicBk = key == music?musicS:music;
       let _bgMusic = document.getElementById("dice-bk")
        if (key == music) {
          _bgMusic.pause()
        } else {
          _bgMusic.play()
        }
    },
    onCopy: function (e) {
    },
    onError: function (e) {
      console.log('复制失败！')
    },
    toRule() {
      this.$buryPoint("clickRule", "dice_home", "点击查看规则")
      this.$router.push({ name: 'rule'})
    },
    check(i) {
      this.isCheck = true;
      this.hashVal = i.hashValue;
    },
    closeLayer() {
      this.isCheck = false;
    },
    getLotteryData() {
      const self = this;
      getDiceRecord({
        params: {
          pageSize:5,
          pageNum:self.lotteryPage
        }
      })
      .then(function(res){
        const data = res.data;
        let val;
        for(const v of data) {
          v.show = false;
          const data = v.blockInfo.split('').reverse().join('').substring(0,20).split('');
          v.lotteryNumV = self.zfill(v.lotteryNum,2);
          const arr =  String(self.zfill(v.lotteryNum,2)).split('');
          for(let i =0;i<arr.length;i++) {
            for(let y = 0;y<data.length;y++) {
              if (arr[i] == data[y]) {
                data[y] = `<span style='color:#E0DCBC;'>${data[y]}</span>`;
                break;
              }
            }
          }
          v.info = '...'+data.reverse().join('')
        }
        self.recording = data;
      })
    },
    tableUp() {
      this.lotteryPage = this.lotteryPage +1;
      this.getLotteryData();
    },
    setBordUp() {
      const top = document.getElementById('input').top;
      this.$buryPoint("clickInput", "dice_home", "点击下注值输入框")
      window.scroll(0,500);
    },
    setKeyBord() {
      window.scroll(0,0);
    },
    tableDown() {
      const self = this;
      if (self.lotteryPage >1) {
        self.lotteryPage = self.lotteryPage -1;
        self.getLotteryData();
      }
    },
    press(e) {
      console.log('111',e)
    },
    tableEnd(e){
      console.log('222',e)
    },
    // 位数不足时补0
    padNumber(num, fill) {
      var len = ('' + num).length;
      return (Array(
          fill > len ? fill - len + 1 || 0 : 0
      ).join(0) + num);
    }

  }
}
</script>
<style lang="scss">
@import '../../common/style/main.scss';
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
.toasted-container.top-center {
  white-space: nowrap;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-0.5rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes bounce-out {
  0% {
    transform: translateY(0rem);
    opacity: 1;
  }
  100% {
    transform: translateY(-0.5rem);
    opacity: 0;
  }
}
.dice-home {
  overflow: hidden;
  background: url('#{$url}/dice/image/bk.png');
  height: 100%;
  width: 100%;
  background-size: cover;
  background-color: #05181D;
  .check-layer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    .layer-content {
      background-image: url('#{$url}/dice/image/layer.png');
      width: 6.29rem;
      height: 5.76rem;
      background-size: 100% 100%;
      position: relative;
      padding: 0.32rem;
      .close {
        position: absolute;
        top: 0.32rem;
        right: 0.32rem;
        height: 0.26rem;
        width: 0.26rem;
      }
      .name {
        padding: 0.16rem 0;
        color: #E0DCBC;
        font-size: 0.26rem;
        text-align: left;
      }
      .title {
        color: #70FF4D;
        font-size: 0.34rem;
        margin-bottom: 0.2rem;
      }
      .check-title {
        color: #E0DCBC;
        font-size: 0.26rem;
        margin-top:0.36rem; 
        margin-bottom:0.2rem; 
        text-align: left;
      }
      .result {
        display: flex;
        span {
          color: #45B19C;
          margin-right: 10px;
        }
        input{
          background-image: url('#{$url}/dice/image/check-input.png');
          background-size: 100% 100%;
          height: 0.46rem;
          border: none;
          outline: none;
          background-color: transparent;
          flex-grow: 1;
          color: #568475;
          padding: 0 0.1rem;
        }
      }
      .hash-val {
        background-image: url('#{$url}/dice/image/layer-content.png');
        width: 5.94rem;
        height: 1.5rem;
        outline: none;
        border: none;
        color: #568475;
        padding: 0.18rem;
        background-size: contain;
        background-color: transparent;
        font-size: 0.3rem;
      }
      .check-hash {
        background-size: 100% 100%;
        width: 6.3rem;
        height: 0.82rem;
        font-size: 0.34rem;
        color: #70FF4D;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.24rem;
      }
    }
  }
  .nav {
    display: flex;
    align-items: center;
    height: 0.88rem;
    width: 100%;
    .back {
      height: 0.88rem;
      width: 0.88rem;
    }
    .balance {
      background: url('#{$url}/dice/image/balance.png');
      height: 0.48rem;
      width: 2.5rem;
      line-height: 0.48rem;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      position: relative;
      img {
        height: 0.32rem;
        width: 0.32rem;
        vertical-align: middle;
        margin-left: 0.15rem;
      }
      .balance-value {
        vertical-align: middle;
        color: #70FF4D;
        margin-left: 0.2rem;
      }
      .pm {
        width: 0.3rem;
        color: #2E6A6C;
        position: absolute;
        right: -0.5rem;
      }
    }
    .music{
      height: 0.88rem;
      width: 0.88rem;
    }
    .rule {
      height: 0.88rem;
      width: 0.88rem;
      // margin-left: auto;
    }
  }
  .broadcast {
    background: url('#{$url}/dice/image/broadcast.png');
    width: 95%;
    margin: auto;
    height: 0.5rem;
    background-size: cover;
    margin-top: 0.08rem;
    overflow: hidden;
    position: relative;
    .show-content{
      height: 100%;
      width: calc(86% - 1rem);
      margin-left: 1rem;
      overflow: hidden;
    }
    .icon {
      height: 0.26rem;
      width: 0.2rem;
      position: absolute;
      left: 0.8rem;
      top: 0.12rem;
    }
      
    .content{
      // display: flex;
      .line {
        height: 0.5rem;
        // flex-shrink:0;
        line-height: 0.5rem;
        width: 6rem;
        text-align: left;
        .hash {
          color: #568475;
          margin-left: 0.2rem;
        }
        .reward {
          color: #E0DCBC;
          margin-left: 0.2rem;
          margin-bottom: 3px;
        }
      }
    }
  }
  .total {
    background: url('#{$url}/dice/image/total.png');
    background-size: cover;
    width: 4.5rem;
    height: 1.1rem;
    margin-top: 0.16rem;
    float: right;
    position: relative;
    .title {
      position: absolute;
      left: 0.54rem;
      top: 0.1rem;
      color: #568475;
    }
    .num {
      position: absolute;
      left: 0.54rem;
      top: 0.5rem;
      color: #70FF4D;
      font-size: 0.36rem;
      font-weight: bold;
    }
    .pm {
      color: #45B19C;
      position: absolute;
      right: 0.84rem;
      top: 0.58rem;
    }
  }
  .main-top {
    background: url('#{$url}/dice/image/broad_top.png');
    background-size: 100%;
    height: 0.68rem;
    width: 7.1rem;
    margin: auto;
    margin-top: 0.9rem;
    position: relative;
    .desc {
      color: #E0DCBC;
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      &.en {
        top: 0.1rem;
        width: 3rem;
        left: 0.15rem;
        text-align: left;
      }
    }
  }
  .main-bottom {
    background: url('#{$url}/dice/image/broad_bottom.png');
    background-size: 100%;
    height: 0.28rem;
    width: 7.1rem;
    margin: auto;
  }
  .main {
    // height: 2.5rem;
    // overflow-y: auto;
    width: 7.1rem;
        min-height: 3rem;
    margin: auto;
    background-color: #09272d;
    position: relative;
    padding-top: 0.05rem;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    // padding-bottom: 0.25rem;
    #data-table {
      transition: all 0.2s;
      position: relative;
      height: 100%;
      tbody{
        position: absolute;
        width: 100%;
        bottom: 0;
      }
    }
    .bet-success{
      width: 100%;
      height: 100%;
      animation-duration: 0.8s;
      position: absolute;
      background: url('#{$url}/dice/image/top.png');
      background-size: 100% 100%;
      color: #FFFFFF;
      font-size: 0.48rem;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        width: 1.8rem;
        font-size: 0.32rem;
        height: 0.72rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #70FF4D;
        background-image: url('../../assets/diec-success.png');
        background-size: 100% 100%;
      }
    }
    .top-price {
      width: 100%;
      height: 100%;
      animation-duration: 3s;
      position: absolute;
      background: url('#{$url}/dice/image/top.png');
      background-size: 100% 100%;
      color: #FFFFFF;
      font-size: 0.48rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &>div:nth-child(2){
        font-size: 0.28rem;
      }
    }
    
    table {
      width: 100%;
      table-layout: fixed;
      tr {
        height: 0.6rem;
        display: flex;
        align-items: center;
      }
    }
    .block-detail{
      
      color: #65AF7E;
      position: relative;
      height: 2.6rem;
      table {
        position: absolute;
        background:#0B2B36;
        width: 94%;
        margin-left: 3%;
        border-collapse: collapse;
        table-layout: fixed;
      }
    }
    .block-height {
      color: #65AF7E;
    }
    .block-hash {
      color: #568475;
    }
    .block-num{
      color:#70FF4D;
    }
    .block-time{
      color:#568475;
    }
    .block-btn {
      background: transparent;
      border: none;
      color: #E0DCBC;
      font-size: 0.24rem;
      outline: none;
    }
    .block-icon {
      img {
        height: 0.48rem;
        width: 0.48rem;
      }
    }
  }
  .game {
    background: url('#{$url}/dice/image/game.png');
    width: 100%;
    // height: 7.2rem;
    background-size: 100% 100%;
    padding-top: 0.4rem;
    position: relative;
    .lucky.v-leave {opacity: 1;}
    .lucky.v-leave-active {  transition: all 3s;}
    .lucky.v-leave-to { opacity: 0;}
    .lucky.v-enter {opacity: 0;}
    .lucky.v-enter-active {  transition: all 3s;}
    .lucky.v-enter-to { opacity: 1;}
    .lucky {
      background-image: url('#{$url}/dice/image/lucky.png');
      width: 2.68rem;
      height: 1.4rem;
      background-size: 100% 100%;
      position: absolute;
      left: calc(50% - 1.34rem);
      top: -1.1rem;
      font-size: 0.44rem;
      color: #70FF4D;
      display: flex;
      justify-content: center;
      flex-direction: column;
      div {
        color: #3C8083;
        font-size: 0.12rem;
      }
      span {
        padding-top: 0.5rem;
        padding-bottom: 0.1rem;
      }
    }
    .tab {
      display: flex;
      justify-content: space-between;
      width: 92%;
      margin: auto;
      .line {
        color: #2E6A6C;
        font-size: 0.26rem;
        &:nth-child(1) {
            width: 2.16rem;
            height: 0.6rem;
            line-height: 0.6rem;
            background-size: cover;
            background-image: url('#{$url}/dice/image/bet.png');
          &.active {
            background-image: url('#{$url}/dice/image/bet-active.png');
            color: #45B19C;
          }
        }
        &:nth-child(2) {
          background-image: url('#{$url}/dice/image/award.png');
          width: 2.16rem;
          height: 0.6rem;
          line-height: 0.6rem;
          background-size: cover;
          &.active {
            background-image: url('#{$url}/dice/image/award-active.png');
            color: #45B19C;
          }
        }
        &:nth-child(3) {
          background-image: url('#{$url}/dice/image/my.png');
          width: 2.16rem;
          height: 0.6rem;
          line-height: 0.6rem;
          background-size: cover;
          &.active {
            background-image: url('#{$url}/dice/image/my-active.png');
            color: #45B19C;
          }
        }
      }
    }
    .bet {
      .info {
        padding: 0.3rem 0;
        width: 82%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .odds-title {
          color: #2E6A6C;
        }
        .odds-num {
          color: #65AF7E;
          font-size: 0.28rem;
          font-weight: bold;
        }
        .prediction-num {
          color: #70FF4D;
          font-size: 0.44rem;
          font-weight: bold;
        }
        .rate-num {
          color: #65AF7E;
          font-size: 0.28rem;
          font-weight: bold;
        }
      }
      .slider {
        width: 92%;
        margin: auto;
        height: 0.9rem;
        background-size: cover;
        background-image: url('#{$url}/dice/image/slider-bk.png');
        display: flex;
        align-items: center;
        justify-content: space-around;
        // justify-content: 
        span {
          color: #397274;
          font-size: 0.24rem;
          font-weight: bold;
        }
        .vue-slider-component {
          width: 80%!important;
          &.slider2 {
             .vue-slider-process{
              background-color: transparent;
              border-radius: 0;
            }
          }
          &.slider3 {
             .vue-slider-process{
              border-radius: 0;
              background-color: #1D4E5C;
            }
            .vue-slider {
              transform: skew(-50deg);
              background-color: #70FF4D;
              border-radius: 0;
            }
          }
          .vue-slider-tooltip-wrap.vue-slider-tooltip-top{
            top: 0.2rem;
            left: 0.06rem;
            transform: none;
          }
          .vue-slider-tooltip {
            border: none;
            color: #70FF4D;
            background-color: transparent;
            transform: skew(50deg);
            &:before{
              border: none;
            }
          }
          &.vue-slider-horizontal .vue-slider-dot {
            top: -16px!important;
            .vue-slider-dot-handle{
              transform: skew(50deg);
              background-image: url('#{$url}/dice/image/slider-block.png');
              height: 0.96rem;
              width: 0.96rem;
              background-size: cover;
              background-color: transparent;
              box-shadow: none;
            }
          }
          .vue-slider-process{
            background-color: #70FF4D;
            border-radius: 0;
          }
          .vue-slider {
            transform: skew(-50deg);
            background-color: #1D4E5C;
            border-radius: 0;
          }
        }
      }
      .btn {
        display: flex;
        // align-items: center;
        justify-content: space-between;
        width: 92%;
        margin: auto;
        .section {
          background-image: url('#{$url}/dice/image/bet-action.png');
          background-size: 100% 90%;
          width: 2.16rem;
          height: 0.7rem;
          color: #3C8083;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.18rem;
          font-size: 0.28rem;
          background-repeat: no-repeat;
          &.active {
            background-image: url('#{$url}/dice/image/bet-action-active.png');
            height: 0.7rem;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color: #70FF4D;
          }
        }
      }
      .info2 {
        padding: 0.26rem 0;
        display: flex;
        justify-content: space-between;
        width: 92%;
        margin: auto;
        .title {
            color: #2E6A6C;
        }
        .num {
          color: #65AF7E;
        }
      }
      .action {
        padding-bottom: 0.18rem;
        display: flex;
        justify-content: space-between;
        width: 92%;
        margin: auto;
        align-items: center;
        .enter{
          background-image: url('#{$url}/dice/image/enter.png');
          width: 3.4rem;
          height: 0.64rem;
          background-size: 100% 100%;
          position: relative;
          input {
            background-color: transparent;
            border: none;
            height: 100%;
            width: 64%;
            position: absolute;
            top: 0;
            left: 0;
            outline: none;
            color: #70FF4D;
            padding-left: 0.2rem;
          }
          span {
            width: 20%;
            position: absolute;
            right: 0.2rem;
            top: 0.2rem;
            color: #2E6A6C;
          }
        }
        .size {
          color: #65AF7E;
          font-size: 0.26rem;
          font-weight: bold;
          span:nth-child(2) {
            margin: 0 0.7rem;
          }
        }
      }
      .sure-bet {
        display: flex;
        justify-content: center;
        width: 92%;
        margin: auto;
        align-items: center;
        height: 1.46rem;
        background-size: 100% 100%;
        color: #ACECFF;
        font-size: 0.36rem;
        margin-top: -0.2rem;
      }
    }
    .record {
      // overflow-y: auto;
      .table-head {

          margin-top: 0.4rem;
        }
        .table-body {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      table {
        width: 92%;
        margin: auto;
        color: #568475;
        border-collapse: collapse;
        
        .left {
          text-align: left;
        }
        tr {
          height: 0.82rem;
          display: flex;
          align-items: center;
        }
        tbody{
          // height: calc(100% - 1rem);
          overflow-y: auto;
        }
        tbody>tr{
          border-bottom: 1px solid #1F3034;
        }
        tbody>tr>td{
          font-size: 0.26rem;
        }
      }
    }
    .my-order{
      overflow-y: auto;
      padding: 0 4%;
      -webkit-overflow-scrolling: touch;
      .order-line {
        padding: 0.34rem 0;
        border-bottom: 1px solid #1F3034;
        .order-in {
          color: #E0DCBC;
          .title{
            color: #E0DCBC;
          }
        }
        .flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          &:nth-child(1){
            padding-bottom: 0.34rem;
          }
          &:nth-child(2){
            padding-bottom: 0.1rem;
          }
        }
        .title {
          color:#568475;
        }
        .num {
          color: #E0DCBC;
        }
        .mr-5  {
          margin-right: 0.5rem;
        }
        .large {
          font-size: 0.26rem;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

