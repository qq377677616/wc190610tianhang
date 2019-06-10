<template>
  <div class="three-home">
    <audio src="./static/music/3d-bk.mp3" loop="loop" id="3d-bk"></audio>    
    <div class="nav">
      <img :src="ASSETSURL+'/3d/image/back.png'" alt="" class="back" @click="goBack">
      <img :src="ASSETSURL+'/3d/image/coin.png'" alt="" class="coin">
      <div class="balance" @click.stop="handleTransfer">{{balance}}</div>
      <div class="pm" @click="langSwitch">WLC</div>
      <div class="right">
        <img :src="musicBk" alt="" class="record" @click="musicChange(musicBk)">
        <img :src="ASSETSURL+'/3d/image/record.png'" alt="" class="record" @click="goRecord">
        <img :src="ASSETSURL+'/3d/image/rule.png'" alt="" class="rule" @click="goRule">
      </div>
    </div>
    <div class="tab">
      <div class="block" v-for="item in $t('threeD.tab')" :key="item.id" :class="activeTab == item.id? 'active'+item.id:''" @click="tabChange(item.id)">
        {{item.name}}
      </div>
    </div>
    <div class="tab-content" :style="{backgroundImage:'url('+tabBk+')'}">
      <div class="text">{{$t('threeD.text')}}</div>
      <div class="hun-text" v-if="activeTab == 1">{{$t('threeD.home[8]')}}</div>
      <div class="ten-text" v-if="activeTab == 1">{{$t('threeD.home[9]')}}</div>
      <div class="sign-text" v-if="activeTab == 1">{{$t('threeD.home[10]')}}</div>
      <div class="hun-text" v-if="activeTab == 2">{{$t('threeD.home[11]')}}</div>
      <div class="ten-text" v-if="activeTab == 2">{{$t('threeD.home[12]')}}</div>
      <div class="hun-text" v-if="activeTab == 3||activeTab == 4">{{$t('threeD.home[13]')}}</div>
      <img :src="ASSETSURL+'/3d/image/xuan.png'" alt="" class="block" v-show="activeTab == 1 && expandHeight== '0'">
      <img :src="ASSETSURL+'/3d/image/xuan.png'" alt="" class="block" v-show="(activeTab == 3&& expandHeight== '0') || (activeTab == 4&& expandHeight== '0')">
      <img :src="ASSETSURL+'/3d/image/xuan.png'" alt="" class="block" v-show="activeTab == 2 && expandHeight== '0'">
      <img :src="bk2" alt="" style="display:none;">
      <img :src="bk3" alt="" style="display:none;">
      
      <div class="ending">
        <span style="display:flex;align-items: center;" v-if="lang== '' ||lang=='en'">{{issueNo}}{{$t('threeD.home[5]')}}{{$t('threeD.home[6]')}}&nbsp;
         <timing :times="times" ref="timing" class="three"></timing>
        </span>
        <span style="display:flex;align-items: center;" v-else>{{$t('threeD.home[5]')}}{{issueNo}}{{$t('threeD.home[6]')}}&nbsp
         <timing :times="times" ref="timing" class="three"></timing>
        </span>
      </div>
      <div class="record" @click="showHistory" id="record">{{$t('threeD.home[7]')}}<img id="record-img" :src="ASSETSURL+'/3d/image/award-crow.png'" alt="" :style="{transform:Arrow}"></div>
      <div class="history"  :style="{height:expandHeight}" id="history" :class="expandHeight == '0'?'no-border':''">
        <table class="head">
          <tr>
            <th style="width:40%;">{{$t('threeD.record[0]')}}</th>
            <th style="width:30%;white-space: nowrap;">{{$t('threeD.record[1]')}}</th>
            <th style="width:30%;">{{$t('threeD.record[2]')}}</th>
          </tr>
        </table>
        <div class="body">
          <table >
            <tr v-for="item in awardData" :key="item.id">
              <th style="width:40%;">{{item.issue}}{{$t('threeD.record[3]')}}</th>
              <th style="width:30%;color:#EF900F;">{{item.awardCode.join('')}}</th>
              <th style="width:30%;" v-if="item.type == 300">{{$t('threeD.record[4]')}}</th>
              <th style="width:30%;" v-if="item.type == 200">{{$t('threeD.record[5]')}}</th>
              <th style="width:30%;" v-if="item.type == 100">{{$t('threeD.record[6]')}}</th>
            </tr>
          </table>
        </div>
      </div>
      <div class="number">
        <img :src="ASSETSURL+'/3d/image/number-active.png'" alt="" style="display:none;">
        <div class="hundreds">
          <div class="hundreds-line1 section">
            <div class="line" v-for="item in numberData1.slice(0,5)" :key="item.name" :class="item.id" @click="hundredsClick(item)">
              <span>{{item.name}}</span>  
            </div>
          </div>
          <div class="hundreds-line2 section">
            <div class="line" v-for="item in numberData1.slice(5,10)" :key="item.name" :class="item.id" @click="hundredsClick(item)">
              <span>{{item.name}}</span>  
            </div>
          </div>
          
        </div> 
        <div class="tenDigit" v-if="activeTab == 2 || activeTab == 1">
          <div class="tenDigit-line1 section">
            <div class="line" v-for="item in numberData2.slice(0,5)" :key="item.name" :class="item.id" @click="tenClick(item)">
              <span v-show="!item.hide">{{item.name}}</span>
            </div>
          </div>
          <div class="tenDigit-line2 section">
            <div class="line" v-for="item in numberData2.slice(5,10)" :key="item.name" :class="item.id" @click="tenClick(item)">
              <span v-show="!item.hide">{{item.name}}</span>
            </div>
          </div>
        </div> 
        <div class="singleDigit" v-if="activeTab == 1">
          <div class="singleDigit-line1 section">
            <div class="line" v-for="item in numberData3.slice(0,5)" :key="item.name" :class="item.id" @click="singleClick(item)">
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="singleDigit-line2 section">
            <div class="line" v-for="item in numberData3.slice(5,10)" :key="item.name" :class="item.id" @click="singleClick(item)">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <div class="select-bet" v-show="listShow" id="select-bet">
      <div class="top" style="width:100%;flex-grow: 1;top:0;left:0;background: transparent;" @click="closeList"></div>
      <div class="content" :style="{height:cutHeight}" id="content">
        <div class="info">
          <span>{{$t('threeD.home[2]')}}</span>
          <span @click="delAll">{{$t('threeD.home[3]')}}</span>
        </div>
        <div style="margin-top:1rem;">
          <div class="line" v-for="(item,index) in betArray" :key="item.id">
            <div class="title">
              <div class="flex-h-center">
                <div style="color:#A86F16;margin-right:0.32rem;" v-if="lang  == 'en'||lang  == ''">{{item.eName}}</div>
                <div style="color:#A86F16;margin-right:0.32rem;" v-if="lang  == 'zh-CHS'">{{item.name}}</div>
                <div style="color:#EF900F;">
                  <span v-for="value in item.number" :key="value.id" style="margin:0 0.1rem;">{{value}}</span>
                </div>
              </div>
            <div class="close" @click="delBet(index)">x</div>
            </div>
            <div class="num" v-if="lang  == 'en'||lang  == ''">
              <span style="margin-right:0.2rem;">{{$t('threeD.bet[0]')}}{{issueNo}}</span>
              <span>{{item.betCount}} {{$t('threeD.bet[1]')}}{{$t('threeD.bet[2]')}}</span>
            </div>
            <div class="num" v-else>
              <span style="margin-right:0.2rem;">{{issueNo}}{{$t('threeD.bet[0]')}}</span>
              <span>{{$t('threeD.bet[1]')}}{{item.betCount}}{{$t('threeD.bet[2]')}}</span>
            </div>
            <div class="expect">{{$t('threeD.home[0]')}}</div>
            <div class="price">
              <div style="color:#EF900F;">{{item.expected}}WLC</div>
              <div class="count">
                <v-touch class="cut"  @touchstart.native="cutStart" @touchend.native="cutEnd(item.index,index)" :style="{backgroundImage:'url('+mcBk+')'}">-</v-touch>
                <div class="val">
                  <input type="text" :value="item.multiple" disabled>
                  {{$t('threeD.home[4]')}}</div>
                <v-touch class="add"  @touchstart.native="addMStart" @touchend.native="addMEnd(item,index)" :style="{backgroundImage:'url('+maBk+')'}">+</v-touch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <v-touch class="cart"  @touchstart.native="addStart" @touchend.native="addEnd" :style="{backgroundImage:'url('+cartBk+')'}">
        <img :src="cartA" alt="" style="display:none;">
        <img :src="betA" alt="" style="display:none;">
        <div class="cart-icon" v-if="betArray.length>0">
          {{betArray.length}}
        </div>
      </v-touch>
      <div class="amount">
        <div>{{totalPrice}}WLC</div>
        <div>{{$t('threeD.home[0]')}}: {{expected}}WLC</div>
      </div>  
      <v-touch class="bet" 
        @touchstart.native="betStart" 
        @touchend.native="betEnd" 
        :style="{backgroundImage:'url('+betBk+')'}">{{$t('threeD.home[1]')}}</v-touch>
    </div>
    <lang ref="langs"></lang>
     <!-- 划转弹框 -->
    <transfer ref="transferData" ></transfer>
  </div>
</template>

<script>
let bk1 = 'https://res.whatthebet.com/games/assets/3d/image/number-bk1.png';
let bk2 = 'https://res.whatthebet.com/games/assets/3d/image/number-bk2.png';
let bk3 = 'https://res.whatthebet.com/games/assets/3d/image/number-bk3.png';
let cart = 'https://res.whatthebet.com/games/assets/3d/image/cart.png';
let cartA = 'https://res.whatthebet.com/games/assets/3d/image/cart-active.png';
let bet = 'https://res.whatthebet.com/games/assets/3d/image/bet.png';
let betA = 'https://res.whatthebet.com/games/assets/3d/image/bet-active.png';
let m = 'https://res.whatthebet.com/games/assets/3d/image/action.png';
let mA = 'https://res.whatthebet.com/games/assets/3d/image/action-active.png';
let music = 'https://res.whatthebet.com/games/assets/3d/image/music.png'
let musicS = 'https://res.whatthebet.com/games/assets/3d/image/music-s.png'
import Timing from 'components/lottery/timing/timing';
import { threeBet,threeAwardRecord,get3dCurrent,getUserInfo} from "api/request"
import { mapState, mapMutations } from 'vuex'
import { combination} from "api/config"
import { distanceFromCurrent } from 'common/js/util'
import Loading from 'base/loading/loading'
import bridge from '@/tools/bridge.js'
// import { setTimeout, setInterval } from 'timers';
import { musicPlay } from 'common/js/util'
import Lang from 'base/lang/lang'
import transfer from "@/components/common/transferDialog"
export default {
  name: 'home',
  components: {
    Timing,
    Lang,
    transfer,
    Loading
  },
  data(){
    return {
      musicBk:musicS,
      Arrow:'rotate(0deg)',
      activeTab:1,
      numberData1:[],
      numberData2:[],
      numberData3:[],
      times:'',
      balance:0,
      awardData:[],
      issueNo:0,
      listShow:false,
      mcBk:m,
      maBk:m,
      betArray:[],
      orderSelectArray:[],
      groupThreeSingleArray :[],
      groupThreeDoubleArray :[],
      groupSixArray :[],
      expandHeight: '0',
      cutHeight:'0',
      selectNum3:[],//组三选号
      selectNum6:[],//组6选号
      doubleNum:[],//重号
      singleNum:[],//单号
      hundreds:[],//百位
      ten:[],//十位
      single:[],//个位
      totalPrice:0,
      expected:0,
      tabBk:bk1,
      bk2:bk2,
      bk3:bk3,
      cartA:cartA,
      cartBk:cart,
      betBk:bet,
      postEnd : true,
      betA:betA,
      tabData:[{
        name:'直选',
        id:1
      },{
        name:'组三单式',
        id:2
      },{
        name:'组三复式',
        id:3
      },{
        name:'组六',
        id:4
      }]
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
  watch:{
    betArray(newVal ,oldVal){
      if (newVal.length<3 ) {
        this.cutHeight = 'auto';
      }
      if (newVal.length == 0) {
        this.listShow = false;
      }
    }
  },
  destroyed() {
    this.$store.commit('updateIsLoading',false);
  },
  mounted() {
    this.$store.commit('updateIsLoading',true);
    const self = this;
    this.addScript();
    this.setNumber();

    //默认一开始不自动播放音乐
    // document.addEventListener('touchstart', function () {
    //    var musicEle0 = document.getElementById('3d-bk');
    //       musicEle0.play();
    // });

    get3dCurrent().then(res=>{
      this.issueNo = res.data.issueNo;
      this.$refs.timing.start(distanceFromCurrent(res.data.deadline))    
    })
    this.getBlance();
    // 定时更新余额
    setInterval(function() {
      self.getBlance();
    },2000);
    this.$nextTick(function() {
      document.addEventListener("touchstart",function(e){
        if (!document.getElementById('history').contains(e.target) && e.target !== document.getElementById('record')&& e.target !== document.getElementById('record-img')) {
          self.expandHeight = '0'
        }
      });
    })
  },
  activated() {
    this.addScript();
  },
  methods:{
    musicChange(key) {
      this.musicBk = key == music?musicS:music;
      let _bgMusic = document.getElementById("3d-bk")
        if (key == music) {
          _bgMusic.pause()
        } else {
          _bgMusic.play()
        }
    },
    handleTransfer(){
        this.$refs.transferData.showMask = true
        this.$refs.transferData.showDialog = true
        this.$buryPoint("clickAccount", "3d_home", "点击账户转化")
    },
    getBlance() {
      getUserInfo().then(res=>{
        this.balance = Math.floor(res.data.wlcBalance * 100) / 100;;
      });
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
    tabChange(id) {
      this.activeTab = id;
      if(id == 1) {
        this.$buryPoint("clickTab", "3d_home", "点击直选")
        this.tabBk = bk1;
      } else if (id ==2) {
        this.$buryPoint("clickTab", "3d_home", "点击组三单式")
        this.tabBk = bk2;
      } else if (id ==3) {
        this.$buryPoint("clickTab", "3d_home", "点击组三复式")
        this.tabBk = bk3;
      } else if (id ==4) {
        this.$buryPoint("clickTab", "3d_home", "点击组六")
        this.tabBk = bk3;
      }
      this.clearAll();
      this.setNumber();
    },
    singleClick(i) {
      for (const v of this.numberData3) {
        if (v.name == i.name && i.id.indexOf('active')>=0) {
          // 取消
          v.id = '';
          this.single.splice(this.single.findIndex(item => item === i.name), 1)
          this.delStatus();
        } else if (v.name == i.name && i.id == '') {
          // 添加
          v.id = 'anima';
          // 隐藏数字
          setTimeout(()=>{
            v.hide = true;
          },33)
          // 显示并改变颜色
          setTimeout(function(){
            v.id = 'anima active';
            v.hide = false;
          },283)
          this.single.push(v.name);
        this.addStatus();
        }
      }
    },
    // 清空已选数据
    clearAll() {
      this.single = [];
      this.ten = [];
      this.hundreds = [];
      this.singleNum = [];
      this.doubleNum = [];
      this.selectNum3 = [];
      this.selectNum6 =[];
    },
    tenClick(i) {
      const self = this;
      for (const v of this.numberData2) {
        if (v.name == i.name && i.id.indexOf('active')>=0) {
          v.id = '';
          if (this.activeTab == 1) {
            this.ten.splice(this.ten.findIndex(item => item === i.name), 1)
          } else if (this.activeTab == 2) {
            this.singleNum.splice(this.ten.findIndex(item => item === i.name), 1)
          }
          this.delStatus();
        } else if (v.name == i.name && i.id == '') {
          v.id = 'anima';
          // 隐藏数字
          setTimeout(()=>{
            v.hide = true;
          },33)
          // 显示并改变颜色
          setTimeout(function(){
            v.id = 'anima active';
            v.hide = false;
          },283)
          if (this.activeTab == 1) {
            this.ten.push(v.name);
          } else if (this.activeTab == 2) {
            this.singleNum.push(v.name);
          }
          this.addStatus();
        }
      }
    },
    hundredsClick(i) {
      for (const v of this.numberData1) {
        if (v.name == i.name && i.id.indexOf('active')>=0) {
          v.id = '';
          if (this.activeTab == 1) {
            this.hundreds.splice(this.hundreds.findIndex(item => item === i.name), 1)
          } else if (this.activeTab == 2) {
            this.doubleNum.splice(this.hundreds.findIndex(item => item === i.name), 1)
          } else if (this.activeTab == 3){
            this.selectNum3.splice(this.hundreds.findIndex(item => item === i.name), 1)
          } else if (this.activeTab == 4){
            this.selectNum6.splice(this.hundreds.findIndex(item => item === i.name), 1)
          }
          this.delStatus();
        } else if (v.name == i.name && i.id == '') {
          v.id = 'anima';
          // 隐藏数字
          setTimeout(()=>{
            v.hide = true;
          },33)
          // 显示并改变颜色
          setTimeout(function(){
            v.id = 'anima active';
            v.hide = false;
          },283)
          if (this.activeTab == 1) {
            this.hundreds.push(v.name);
          } else if (this.activeTab == 2) {
            this.doubleNum.push(v.name);
          } else if (this.activeTab == 3){
            this.selectNum3.push(v.name); 
          } else if (this.activeTab == 4){
            this.selectNum6.push(v.name);
          }
          this.addStatus();
        }
      }
    },
    delStatus() {
      const self = this;
      const arrData = this.betArray;
      if (this.activeTab == 1){
        if (this.single.length==0||this.ten.length==0||this.hundreds.length==0) {
          arrData.reverse().forEach((item,index) =>{
            if(item.name == '直选') {
              arrData.splice(index,1);
              this.betArray = arrData;
            }
          })
        }else {
          this.addStatus();
        }
      } else if (this.activeTab == 2) {
        if (this.singleNum.length ==0||this.doubleNum.length==0) {
          arrData.reverse().forEach((item,index) =>{
            if(item.name == '组三单式') {
              arrData.splice(index,1);
              this.betArray = arrData;
            }
          })
        }else {
          this.addStatus();
        }
      } else if(this.activeTab == 3){
        if (this.selectNum3.length < 2) {
          arrData.reverse().forEach((item,index) =>{
            if(item.name == '组三复式') {
              arrData.splice(index,1);
              this.betArray = arrData;
            }
          })
        }else {
          this.addStatus();
        }
      } else if (this.activeTab == 4){
        if (this.selectNum6.length < 3) {
          arrData.reverse().forEach((item,index) =>{
            if(item.name == '组六') {
              arrData.splice(index,1);
              this.betArray = arrData;
            }
          })
        }else {
          this.addStatus();
        }
      }
      this.setTotal();
    },
    addStatus() {
      if (this.activeTab == 1){
        this.$buryPoint("clickNumber", "3d_home", "直选选注")
        if (this.single.length>0&&this.ten.length>0&&this.hundreds.length>0) {
          const obj = {
            name:'直选',
            eName:'Direct',
            number:[this.hundreds.sort().join(''),this.ten.sort().join(''),this.single.sort().join('')],
            betCount: this.ten.length*this.single.length*this.hundreds.length,
            baseCount:this.ten.length*this.single.length*this.hundreds.length,
            multiple:1,
            baseExpected:this.ten.length*this.single.length*this.hundreds.length*1040,
            expected:this.ten.length*this.single.length*this.hundreds.length*1040
          }
          if (this.betArray.length==0) {
            this.betArray.push(obj);
          } else if(this.betArray[this.betArray.length-1].name == '直选'){
            this.betArray[this.betArray.length-1] = obj;
          } else if (this.betArray[this.betArray.length-1].name !== '直选') {
            this.betArray.push(obj);
          }
        }
      } else if (this.activeTab == 2) {
        this.$buryPoint("clickNumber", "3d_home", "组三单式选注")
        if (this.singleNum.length >0&&this.doubleNum.length>0) {
          const obj = {
            name:'组三单式',
            eName:'3-Group Single',
            number:[this.doubleNum.sort().join(''),this.singleNum.sort().join('')],
            betCount: this.doubleNum.length*this.singleNum.length,
            baseCount:this.doubleNum.length*this.singleNum.length,
            multiple:1,
            baseExpected:this.singleNum.length*this.doubleNum.length*346,
            expected:this.singleNum.length*this.doubleNum.length*346
          }
          if (this.betArray.length==0) {
            this.betArray.push(obj);
          } else if(this.betArray[this.betArray.length-1].name == '组三单式'){
            this.betArray[this.betArray.length-1] = obj;
          } else if (this.betArray[this.betArray.length-1].name !== '组三单式') {
            this.betArray.push(obj);
          }
        }
      } else if(this.activeTab == 3){
        this.$buryPoint("clickNumber", "3d_home", "组三复式选注")
        if (this.selectNum3.length >= 2) {
          const obj = {
            name:'组三复式',
            eName:'3-Group Compound',
            number:[this.selectNum3.sort().join('')],
            betCount: combination(this.selectNum3.length,2),
            baseCount:combination(this.selectNum3.length,2),
            multiple:1,
            baseExpected:combination(this.selectNum3.length,2)*346,
            expected:combination(this.selectNum3.length,2)*346
          }
          if (this.betArray.length==0) {
            this.betArray.push(obj);
          } else if(this.betArray[this.betArray.length-1].name == '组三复式'){
            this.betArray[this.betArray.length-1] = obj;
          } else if (this.betArray[this.betArray.length-1].name !== '组三复式') {
            this.betArray.push(obj);
          }
        }
      } else if (this.activeTab == 4){
        this.$buryPoint("clickNumber", "3d_home", "组六选注")
        if (this.selectNum6.length >= 3) {
          const obj = {
            name:'组六',
            eName:'6-Group',
            number:[this.selectNum6.sort().join('')],
            betCount: combination(this.selectNum6.length,3),
            baseCount:combination(this.selectNum6.length,3),
            multiple:1,
            baseExpected:combination(this.selectNum6.length,3)*173,
            expected:combination(this.selectNum6.length,3)*173
          }
          if (this.betArray.length==0) {
            this.betArray.push(obj);
          } else if(this.betArray[this.betArray.length-1].name == '组六'){
            this.betArray[this.betArray.length-1] = obj;
          } else if (this.betArray[this.betArray.length-1].name !== '组六') {
            this.betArray.push(obj);
          }
        }
      }
      this.setTotal();
    },
    showHistory() {
      this.$buryPoint("clickHistory", "3d_home", "点击开奖历史")
      this.expandHeight = this.expandHeight == '0'? '80%':'0';
      // 获取数据
      const data = {
        "currentPage": 1,
        "pageSize": 20
      }
      if(this.expandHeight == '80%') {
        threeAwardRecord(data).then(res=>{
          this.awardData = res.data.data;
          this.Arrow = 'rotate(180deg)';
        })
      } else {
        this.Arrow = 'rotate(0deg)';
      }
    },
    addStart() {
      this.cartBk = cartA;
    },
    addEnd() {
      this.cartBk = cart;
      const self = this;
      if (this.betArray.length == 0) {
        let tost;
        if (this.lang == 'en') {
          tost = 'No single bets'
        } else if (this.lang == 'zh-CHS') {
          tost = '暂无投注单'
        } else if (this.lang == 'zh-CHT') {
          tost = '暫無投注單'
        }
        this.$toasted.show(tost,{ 
          theme: "toasted-primary", 
          position: "center", 
          duration : 2000
        })
        return;
      }
      if (this.listShow) {
        self.cutHeight = '0';
        setTimeout(function() {
          self.listShow = false;
        },180)
      } else {
        this.listShow = true;
        setTimeout(function() {
          if (self.betArray.length >=3) {
            self.cutHeight = 'calc(80% - 1.75rem)';
          }else {
            self.cutHeight = 'auto';
          }
      },0)
      }
      
    },
    setTotal() {
      let price = 0,expected=0;
      for(const v of this.betArray) {
        price += v.betCount*v.multiple*2;
      }
      this.totalPrice = price;
      const spaceData = this.unique(this.betArray);
      for (const v of spaceData) {
        expected += v.expected;
      }
      this.expected = expected;
    },
    unique (arr) {
      let result = arr
        .filter(a => !arr.some(b => a !== b && a.name === b.name && b.expected > a.expected));
        return result;
    },
    cutStart() {
      this.mcBk = mA;
    },
    // 倍数-1
    cutEnd(i,index) {
      const self = this;
      this.mcBk = m;
      self.betArray.forEach((item,aIndex) => {
        if (aIndex == index) {
          const m = item.multiple>1? item.multiple-1:1;
          item.multiple = item.multiple>1? item.multiple-1:1;
          item.expected = item.baseExpected*(m);
          // item.betCount = item.baseCount * item.multiple;
        }
      })
      self.setTotal();
    },
    addMStart() {
      this.maBk = mA;
    },
    // 倍数+1
    addMEnd(i,index) {
      const self = this;
      this.maBk = m;
      self.betArray.forEach((item,aIndex) => {
        if (aIndex == index) {
          const m = item.multiple;
          item.multiple = item.multiple+1;
          item.expected = item.baseExpected*(m+1);
          // item.betCount = item.baseCount * item.multiple;
        }
      })
      self.setTotal();
    },
    closeList() {
      const self =this;
      self.cutHeight = '0';
        setTimeout(function() {
          self.listShow = false;
        },180)
    },
    delBet(i) {
      const data = this.betArray;
      data.splice(i,1);
      this.betArray = data;
      if(this.betArray.length ==0) {
        this.setNumber();
      }
      this.setTotal();
    },
    delAll() {
      this.betArray = [];
      this.setTotal();
      this.clearAll();
      this.setNumber();
    },
    betStart() {
      this.betBk = betA;
    },
    betEnd() {
      this.betBk = bet;
      // 下注
      let tost;
      if (this.betArray && this.betArray==0 && this.activeTab ==1) {
        if (this.lang == 'en') {
          tost = 'Select 1 number or more at each place'
        } else if (this.lang == 'zh-CHS') {
          tost = '每个位置至少选择一个号码'
        } else if (this.lang == 'zh-CHT') {
          tost = '每個位置至少選擇一個號碼'
        }
        this.$toasted.show(tost,{ 
          theme: "toasted-primary", 
          position: "center", 
          duration : 2000
        })
        return;
      }
      if (this.betArray && this.betArray==0 && this.activeTab ==2) {
        if (this.lang == 'en') {
          tost = 'Select 1 number or more at each place'
        } else if (this.lang == 'zh-CHS') {
          tost = '每个位置至少选择一个号码'
        } else if (this.lang == 'zh-CHT') {
          tost = '每個位置至少選擇一個號碼'
        }
        this.$toasted.show(tost,{ 
          theme: "toasted-primary", 
          position: "center", 
          duration : 2000
        })
        return;
      }
      if (this.betArray && this.betArray==0 && this.activeTab ==3) {
        if (this.lang == 'en') {
          tost = 'Select 2 numbers or more'
        } else if (this.lang == 'zh-CHS') {
          tost = '至少选择2个号码'
        } else if (this.lang == 'zh-CHT') {
          tost = '至少選擇2個號碼'
        }
        this.$toasted.show(tost,{ 
          theme: "toasted-primary", 
          position: "center", 
          duration : 2000
        })
        return;
      }
      if (this.betArray && this.betArray==0 && this.activeTab ==4) {
        if (this.lang == 'en') {
          tost = 'Select 3 numbers or more'
        } else if (this.lang == 'zh-CHS') {
          tost = '至少选择3个号码'
        } else if (this.lang == 'zh-CHT') {
          tost = '至少選擇3個號碼'
        }
        this.$toasted.show(tost,{ 
          theme: "toasted-primary", 
          position: "center", 
          duration : 2000
        })
        return;
      }
      if (this.balance < this.totalPrice) {
        if (this.lang == 'en') {
          tost = 'Insufficient Balance'
        } else if (this.lang == 'zh-CHS') {
          tost = '余额不足'
        } else if (this.lang == 'zh-CHT') {
          tost = '餘額不足'
        }
        this.$toasted.show(tost,{ 
          theme: "toasted-primary", 
          position: "center", 
          duration : 2000
        })
        this.handleTransfer() //余额不足时弹框
        return;
      }
      if (!this.postEnd) {
        return;
      }
      this.postEnd =false;
      const data = {
        "data":[],
        "price":0
      };
      data.price = this.totalPrice;
      if (this.totalPrice>200) {
        if (this.lang == 'en') {
          tost = 'Cannot exceed 200WLC'
        } else if (this.lang == 'zh-CHS') {
          tost = '单注不能超过200WLC'
        } else if (this.lang == 'zh-CHT') {
          tost = '單註不能超過200WLC'
        }
      }
        for (const v of this.betArray) {
          const obj ={};
          obj.betCount = v.betCount;
          obj.multiple = v.multiple;
          obj.price = v.betCount*2*v.multiple;
          if (v.name == '直选') {
            obj.orderSelect = {};
            obj.orderSelect.decade = v.number[1].split("").map(Number);
            obj.orderSelect.hundreds = v.number[0].split("").map(Number);
            obj.orderSelect.units = v.number[2].split("").map(Number);
            obj.type = 10;
          } else if (v.name == '组三单式') {
            obj.groupThreeSingle = {};
            obj.groupThreeSingle.repetition = v.number[0].split("").map(Number);
            obj.groupThreeSingle.single = v.number[1].split("").map(Number);
            obj.type = 20;
          } else if (v.name == '组三复式') {
            obj.groupThreeDouble = v.number[0].split("").map(Number);
            obj.type = 30;
          } else if (v.name == '组六') {
            obj.groupSix = v.number[0].split("").map(Number);
            obj.type = 40;
          }
          data.data.push(obj);
        }
      threeBet(data).then(res =>{
        console.log(res)
        if (res.code == 0) {
          let tost;
          if (this.lang == 'en') {
            tost = 'Bet Succeeds'
          } else if (this.lang == 'zh-CHS') {
            tost = '投注成功'
          } else if (this.lang == 'zh-CHT') {
            tost = '投注成功'
          }
          this.$toasted.show(tost,{ 
          theme: "toasted-primary", 
          position: "center", 
          duration : 2000
        })
          this.betArray = [];
          this.listShow = false;
          this.postEnd = true;
          this.setTotal();
          this.clearAll();
          this.setNumber();
          this.getBlance();
        } else{
          let tost;
          if (this.lang == 'en') {
            tost = 'Bet failure'
          } else if (this.lang == 'zh-CHS') {
            tost = '投注失败'
          } else if (this.lang == 'zh-CHT') {
            tost = '投注失敗'
          }
          this.postEnd = true;
          this.$toasted.show(tost,{ 
          theme: "toasted-primary", 
          position: "center", 
          duration : 2000
        })
        }
      })
      .catch(error=>{
        let tost;
          if (this.lang == 'en') {
            tost = 'Bet failure'
          } else if (this.lang == 'zh-CHS') {
            tost = '投注失败'
          } else if (this.lang == 'zh-CHT') {
            tost = '投注失敗'
          }
          this.postEnd = true;
          this.$toasted.show(tost,{ 
          theme: "toasted-primary", 
          position: "center", 
          duration : 2000
        })
      })
    },
    // 跳转投注记录
    goRecord() {
      this.$buryPoint("clickRecord", "3d_home", "点击投注记录")
      this.$router.push({ name: '3dRecord'})
    },
    goRule() {
      this.$buryPoint("clickRule", "3d_home", "点击玩法规则")
      this.$router.push({ name: '3dRule'})
    },
    setNumber() {
      this.numberData1 = [{
        name:0,
        id:''
      },{
        name:1,
        id:''
      },{
        name:2,
        id:''
      },{
        name:3,
        id:''
      },{
        name:4,
        id:''
      },{
        name:5,
        id:''
      },{
        name:6,
        id:''
      },{
        name:7,
        id:''
      },{
        name:8,
        id:''
      },{
        name:9,
        id:''
      }];
      this.numberData2 = [{
        name:0,
        id:''
      },{
        name:1,
        id:''
      },{
        name:2,
        id:''
      },{
        name:3,
        id:''
      },{
        name:4,
        id:''
      },{
        name:5,
        id:''
      },{
        name:6,
        id:''
      },{
        name:7,
        id:''
      },{
        name:8,
        id:''
      },{
        name:9,
        id:''
      }];
      this.numberData3 = [{
        name:0,
        id:''
      },{
        name:1,
        id:''
      },{
        name:2,
        id:''
      },{
        name:3,
        id:''
      },{
        name:4,
        id:''
      },{
        name:5,
        id:''
      },{
        name:6,
        id:''
      },{
        name:7,
        id:''
      },{
        name:8,
        id:''
      },{
        name:9,
        id:''
      }];
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/style/main.scss';
.flex-h-center {
  display: flex;
  align-items: center;
}
.three-home {
  height: 100%;
  width: 100%;
  color: #ffffff;
  background-image: url('#{$url}/3d/image/bk.png');
  background-size: 100% 100%;
  .nav {
    display: flex;
    align-items: center;
    font-size: 0.26rem;
    padding: 0.1rem 0;
    .coin {
      height: 0.32rem;
      width: 0.32rem;
      margin-left: 0.24rem;
      z-index: 10;
    }
    .back {
      height: 0.56rem;
      width: 0.56rem;
    }
    .balance {
      margin-left: -0.2rem;
      background-color: #5C9331;
      border-radius: 0.22rem;
      color: #ffffff;
      padding: 0.1rem 0.3rem 0.1rem 0.4rem;
    }
    .pm {
      margin-left: 0.12rem;
      color: #B8D5A1;
    }
    .right {
      margin-left: auto;
      img {
        height: 0.56rem;
        width: 0.56rem;
      }
      .record {
        margin-left: 0.1rem;
      }
      .rule {
        margin-right: 0.2rem;
        margin-left: 0.1rem;
      }
    }
  }
  .tab {
    background-image: url('#{$url}/3d/image/tab.png');
    background-size: 100% 100%;
    width: 90%;
    margin: auto;
    // margin-top: 0.3rem;
    height: 0.44rem;
    display: flex;
    .block {
      width: 25%;
      font-size: 0.28rem;
      color: #EABC7B;
      font-weight: bold;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active1 {
        background-image: url('#{$url}/3d/image/tab1.png');
        color: #ffffff;
        background-size: 100% 100%;
      }
      &.active2,&.active3{
        background-image: url('#{$url}/3d/image/tab2.png');
        color: #ffffff;
        background-size: 100% 100%;
      }
      &.active4{
        background-image: url('#{$url}/3d/image/tab3.png');
        color: #ffffff;
        background-size: 100% 100%;
      }
    }
  }
  .tab-content {
    background-size: 100% 100%;
    width: 95%;
    margin: auto;
    height: 80%;
    max-height: 10.4rem;
    position: relative;
    .text {
      position: absolute;
      bottom: 0.3rem;
      right: 0.82rem;
      color: red;
      transform: translateX(-50%);
      left: 50%;
      width: 100%;
    }
    .hun-text {
       position: absolute;
      color: #9F6625;
      top: 0.93rem;
      transform: rotate(-17deg);
      left: 0.5rem;
      z-index: 100;
    }
    .ten-text {
      position: absolute;
      color: #9F6625;
      top: 36%;
      transform: rotate(-17deg);
      left: 0.5rem;
    }
    .sign-text {
      position: absolute;
      color: #9F6625;
      top: 63.6%;
      transform: rotate(-17deg);
      left: 0.5rem;
    }
    .block {
      position: absolute;
      width: 1.06rem;
      height: 0.71rem;
      left: 0.3rem;
      top: 0.7rem;
      z-index: 90;
    }
    .ending {
      position: absolute;
      top: 0.2rem;
      left: 0.4rem;
      .time {
        background-color: #9F6625;
        border-radius: 4px;
        color: #FFD800;
        padding: 2px 4px;
      }
    }
    .record {
      position: absolute;
      top: 0.2rem;
      right: 0.3rem;
      display: flex;
      align-items: center;
      font-size: 0.24rem;
      img {
        height: 0.3rem;
        width: 0.28rem;
        transition: transform 666ms cubic-bezier(.466,0,.333,1),background-color 666ms linear;
      }
    }
    .history {
      &.no-border {
        border: none;
      }
      background-color: #F7D596;
      width: 90%;
      // padding: 0.34rem 0.42rem;
      height: 0;
      position: absolute;
      left: 5%;
      z-index: 100;
      top: 0.8rem;
      border: 1px solid #B17024;
      overflow: hidden;
      transition: height 666ms cubic-bezier(.466,0,.333,1),background-color 666ms linear;
      table {
        width: 95%;
        margin: auto;
        color: #D0A370;
      }
      .body {
          max-height: calc(100% - 1.2rem);
          overflow: auto;
        tr {
          height: 0.5rem;
          line-height: 0.5rem;
          &:nth-child(odd) {
            background:rgba(255,230,183,1);
          }
        }
      }
      .head {
        margin-top: 0.4rem;
        margin-bottom: 0.2rem;
        th {
          color: #A86F16;
          font-size: 0.26rem;
          font-weight: bold;
        }
      }
    }
    .number {
      .line {
        width: 0.96rem;
        height: 1.02rem;
        font-size: 0.62rem;
        text-align: center;
        line-height: 1.02rem;
        margin: 0 0.08rem;
        margin-bottom: 0.18rem;
        position: relative;
        span {
          position: relative;
        }
        &::before{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          width: 0.96rem;
          height: 1.02rem;
          background-size: 100% 100%;
          background-image: url('#{$url}/3d/image/number.png');
          // transition: transform 666ms cubic-bezier(.466,0,.333,1),background-color 666ms linear;
          transform: rotateX(0deg);
        }
        &.active {
          color: #E35903;
        }
        &.anima::before {
          background-image: url('#{$url}/3d/image/number-active.png');
          transition: transform 666ms cubic-bezier(.466,0,.333,1),background-color 666ms linear;
          transform: rotateX(180deg);
        }
      }
      .section {
        width: 100%;
        display: flex;
      }
      .hundreds {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        .hundreds-line1 {
          position: absolute;
          top: calc(16% - 0.51rem);
          left: 0.76rem;
        }
        .hundreds-line2 {
          position: absolute;
          top: calc(27.5% - 0.51rem);
          left: 0.76rem;
        }
      }
      .tenDigit {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        .tenDigit-line1 {
          position: absolute;
          top: calc(43.7% - 0.51rem);
          left: 0.76rem;
        }
        .tenDigit-line2 {
          position: absolute;
          top: calc(55.1% - 0.51rem);
          left: 0.76rem;
        }
      }
      .singleDigit {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        .singleDigit-line1 {
          position: absolute;
          top: calc(71.2% - 0.51rem);
          left: 0.76rem;
        }
        .singleDigit-line2 {
          position: absolute;
          top: calc(82.6% - 0.51rem);
          left: 0.76rem;
        }
      }
    }
    .round {
      width: 100%;
      height: 0.8rem;
      position: absolute;
      left: 0;
      bottom: -0.44rem;
      border-radius: 0.06rem;
      background-color: #D19B3C;
    }
  }
  .select-bet {
    height: 100%;
    width: 100%;
    background:rgba(0,0,0,0.5);
    position: fixed;
    bottom: 0;
    left:0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    .content {
      height: 0;
      transition: height 666ms cubic-bezier(.466,0,.106,1),background-color 333ms linear;
      width: 100%;
      background: #F5D08C;
      flex-grow: 0;
      overflow: auto;
      bottom: 0;
      padding-bottom: 1.75rem;
      .info {
        width: 94%;
        margin: 0 3%;
        font-size: 0.28rem;
        color: #A86F16;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        background: #F5D08C;
        height: 0.9rem;
        span:nth-child(2){
          color: #D0A370;
        }
      }
      .line {
        background:rgba(255,235,196,1);
        margin-top: 1rem;
        box-shadow:0px 0.06rem 0px rgba(245,208,140,1);
        // height: 2.26rem;
        border-radius: 0.12rem;
        width: 94%;
        margin: 0.16rem 3%;
        font-size: 0.25rem;
        color: #D0A370;
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 90%;
          font-size: 0.3rem;
          padding: 0.2rem 0;
          margin: auto;
        }
        .num {
          width: 90%;
          padding-bottom: 0.44rem;
          padding-top: 0.1rem;
          margin: auto;
          text-align: left;
        }
        .expect {
          width: 90%;
          // padding-bottom: 0.24rem;
          margin: auto;
          text-align: left;
        }
        .price {
          width: 90%;
          padding-bottom: 0.24rem;
          margin: auto;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          .count {
            display: flex;
            align-items: center;
            .cut {
              background-size: 100% 100%;
              height: 0.56rem;
              width: 0.56rem;
              display: flex;
              // align-items: center;
              justify-content: center;
              font-size: 0.5rem;
              color:#ffffff;
            }
            .val{
              height: 0.46rem;
              width: 1.42rem;
              background-color: #F7D390;
              border-radius: 0.12rem;
              color: #A86F16;
              display: flex;
              align-items: center;
              margin: 0 0.1rem;
              justify-content: center;
              input {
                background: transparent;
                width: calc(100% - 0.5rem);
                text-align: center;
                color: #A86F16;
              }
            }
            .add {
              background-size: 100% 100%;
              height: 0.56rem;
              width: 0.56rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.5rem;
              color:#ffffff;
            }
          }
        }
      }
    }
  }
  .bottom {
    width: calc(100% - 0.4rem);
    height: 1.84rem;
    padding: 0 0.2rem;
    background-image: url('#{$url}/3d/image/bottom.png');
    position: fixed;
    bottom: 0;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    z-index: 300;
    .cart {
      width: 0.82rem;
      height: 0.82rem;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.4rem;
      position: relative;
      .cart-icon {
        background-image: url('#{$url}/3d/image/bet_number.png');
        background-size: 100% 100%;
        line-height: 0.42rem;
        font-weight: bold;
        height: 0.44rem;
        width: 0.4rem;
        position: absolute;
        top: -0.17rem;
        right: -0.15rem;
      }
    }
    .amount {
      margin-top: 0.4rem;
      text-align: left;
      margin-left: 0.4rem;
      &>div:nth-child(1) {
        color: #ffffff;
        font-size: 0.3rem;
        margin-bottom: 0.1rem;
      }
      &>div:nth-child(2) {
        color: #E2EED9;
        font-size: 0.24rem;
      }
    }
    .bet{
      margin-top: 0.4rem;
      // background-image: url('../../assets/3d/image/bet.png');
      background-size: 100% 100%;
      width: 2.64rem;
      height: 0.94rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #C56B33;
      font-size: 0.34rem;
      font-weight: bold;
      margin-left: auto;
    }
  }
  
}
</style>

