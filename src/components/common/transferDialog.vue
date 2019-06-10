<template>
    <div class="dialog-box">
        <!-- 划转弹框 -->
        <div id="dialog">
            <div v-show="showDialog" class="dialog-demo" :class="type">
                <div class="pop" @click="handleShowDialog"><span class="iconfont"><img src="@/assets/images/cha.svg" /></span></div>
                <div class="content">
                    <div class="content_top">
                        <div class="sport" v-show="!rotate">
                            <p style="color:#989898;font-weight:100;font-size:0.14rem;padding-bottom:0.08rem;">{{$t("record.tyzh")}}</p>
                            <p>{{dealNumber(overageWusd)}}</p>
                        </div>
                        <div class="sport" v-show="rotate">
                            <p style="color:#989898;font-weight:100;font-size:0.14rem;padding-bottom:0.08rem;">{{$t("record.yxzh")}}</p>
                            <p>{{dealNumber(overageLoto)}}</p>
                        </div>
                        <!-- <div style="padding:0.18rem 0.2rem;" @click.stop="handleRotate"><img :class="[rotate?'go':'aa']" src="@/assets/images/exchange.svg" /></div> -->
                        <div style="padding:0.18rem 0.2rem;padding-top:0.16rem;"><img :class="[rotate?'go':'aa']" src="@/assets/images/exchange.svg" /></div>
                        <div class="game" v-show="rotate">
                            <p style="color:#989898;font-weight:100;font-size:0.14rem;padding-bottom:0.08rem;">{{$t("record.tyzh")}}</p>
                            <p>{{dealNumber(overageWusd)}}</p>
                        </div>
                        <div class="game" v-show="!rotate">
                            <p style="color:#989898;font-weight:100;font-size:0.14rem;padding-bottom:0.08rem;">{{$t("record.yxzh")}}</p>
                            <p>{{dealNumber(overageLoto)}}</p>
                        </div>
                        

                    </div>
                    <div class="content_middle">
                        <p>{{msg}}</p>
                        <div class="iput"><input type="tel" v-model.trim="postData.count" :placeholder="$t('record.qsrhzje')" v-on:input="handleChange"/></div>
                    </div>
                    <div class="content_bottom1" @click="handleConfirm">{{$t('record.qdhz')}}</div>
                    <div class="content_bottom2" @click.stop="transferRecord">{{$t("record.hzjl")}}</div>
                </div>
            </div>
        </div>

        <!-- 体育账户转到游戏账户操作后的提示 -->
        <div>
            <div v-show="showTipBET" class="dialog-demo success">
                <div class="pop" @click="handleShowDialog"><span class="iconfont"><img src="@/assets/images/cha.svg" /></span></div>
                <div class="content_tip">
                    <h2>{{$t("record.hzcg")}}</h2>
                    <div class="tip_p">
                        <p>{{$t("record.tyzhzdyxzh")}}<span style="color:#F37F45;font-size:0.13rem;">{{postData.count}} WLC</span></p>
                    </div>
                    <div class="content_bottom3" @click="handleShowDialog">{{$t("record.qd")}}</div>
                </div>
            </div>
        </div>
        <!-- 游戏账户转到体育账户操作后的提示 -->
        <div>
            <div v-show="showTipLOTO" class="dialog-demo success" >
                <div class="pop" @click="handleShowDialog"><span class="iconfont"><img src="@/assets/images/cha.svg" /></span></div>
                <div class="content_tip">
                    <h2>{{$t("record.hzsqysl")}}</h2>
                    <div class="tip_p">
                        <p>{{$t("record.yjdzsj")}}</p>
                    </div>
                    <div class="content_bottom3" @click="handleShowDialog">{{$t("record.qd")}}</div>
                </div>
            </div>
        </div>
        <!-- 划转失败的提示 -->
        <div>
            <div v-show="showTipERR" class="dialog-demo success">
                <div class="pop" @click="handleShowDialog"><span class="iconfont"><img src="@/assets/images/cha.svg" /></span></div>
                <div class="content_tip">
                    <h2>{{$t("record.hzsb")}}</h2>
                    <div class="tip_p">
                        <p>{{errtips}}</p>
                    </div>
                    <div class="content_bottom3" @click="handleShowDialog">{{$t("record.qd")}}</div>
                </div>
            </div>
        </div>
        <div id="mask" v-show="showMask" @click.stop="handleShowDialog"></div>
    </div>
</template>

<script>
import { handleExchange,getWLC,getLoto,SWITCHURL } from "@/api/request"
import bridge from '@/tools/bridge.js'
export default {
    data () {
        return {
            showDialog:false,
            showTipBET:false,
            showTipLOTO:false,
            showMask:false,
            rotate:false,
            msg:this.$t("record.tyzhzdyxzh"),
            postData:{
                coinSymbol:'WLC',
                count:null,
                fromSystemModuleCode:"BET",
                toSystemModuleCode:"LOTO"
            },
            errtips:"",
            showTipERR:false,
            overageWusd:0,
            overageLoto:0,
            type:''
        }
    },
    mounted() {
        console.log('111',this.$route.path)
        if(this.$route.path == '/3d'||this.$route.path == '/dice') {
            this.type = 'two';
        }
    },
    created(){
        this.init()
    },
    methods:{
        handleChange(){
            
            this.postData.count = this.postData.count.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
        },
        handleShowDialog(){
          this.postData.count = null //清除输入框中的值
          this.showMask = false
          this.showDialog = false
          this.showTipBET = false
          this.showTipLOTO = false
          this.showTipERR = false
        },
        //获取体育及游戏账户余额
        init() {
            let _this = this;
            getWLC().then(response => {
                if (response.code === 0) {
                    if (response.data.balance == null) {
                    _this.overageWusd = 0;
                    } else {
                    let balance = response.data.balance + "";
                    _this.overageWusd = balance.substr(0, balance.indexOf(".") + 3) - 0;
                    }
                   
                
                }
            });
            //获取游戏账户余额
            this.handleGetLoto();
        },
        //获取游戏账户余额
        handleGetLoto(){
            getLoto().then(response => {
                
                if (response.code === 0) {
                    this.overageLoto = response.data.wlcBalance
                }
            });
        },
        handleRotate(){
            this.rotate = !this.rotate
            if(!this.rotate){
                this.msg = this.$t("record.tyzhzdyxzh")
                this.postData.fromSystemModuleCode = "BET"
                this.postData.toSystemModuleCode = "LOTO"
            }else{
                this.msg = this.$t("record.yxzhzdtyzh")
                this.postData.fromSystemModuleCode = "LOTO"
                this.postData.toSystemModuleCode = "BET"
            }
           
        },
        //确定划转并请求后台接口划转
        handleConfirm(){
           
            this.postData.count = this.postData.count - 0
            if(!this.postData.count){
                this.$toast(this.$t("record.tipa"));
                
                return
            }
            if(this.overageWusd-0<=0 && this.postData.fromSystemModuleCode == "BET"){
                this.$toast(this.$t("record.tipb"));
                
                return
            }
            if(this.overageLoto-0<=0 && this.postData.fromSystemModuleCode == "LOTO"){
                this.$toast(this.$t("record.tipc"));
                
                return
            }

            this.$indicator.open();
            this.showDialog = false
            this.showMask = false
            handleExchange(this.postData).then(data=>{
                this.$indicator.close();
                if (data.code === 0) {
                     if(!this.rotate){
                         this.showMask = true
                         this.showTipBET = true
                     }else{
                         this.showMask = true
                         this.showTipLOTO = true
                     }
                     
                     this.init()
                     this.hideTaskBox()
                 }else{
                     this.errtips = this.$t(data.code)
                     this.showMask = true
                     this.showTipERR = true
                        
                     
                 }
                 
            })
            
        },
        //金额格式化
        dealNumber(money){
            if(money && money!=null){
                money = String(money);
                var left=money.split('.')[0],right=money.split('.')[1];
                right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '.00';
                var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
                return (Number(money)<0?"-":"") + temp.join(',').split('').reverse().join('')+right;
            }else if(money===0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
                return '0.00';
            }else{
                return "";
            }
        },
        //去充值
        transferRecord(){
         this.handleShowDialog()
         if (typeof wayki != 'undefined') {
            wayki.jumpexternalActivity(`${SWITCHURL}ui/bet/#/exchange/recharge`)
          } else {
            bridge.callhandler('notifyAppPushHelp', {"url":`${SWITCHURL}ui/bet/#/exchange/recharge`})
          }
        
        },


    }
}
</script>
<style lang="scss" scoped>
#mask {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
.dialog-box{position: absolute;left:0;top:0;}  
.dialog-demo.success {
    width: 55%;
}
.dialog-demo{
    position: fixed;
    top: 0;
    left: 0;
    left: 50%;
    top: 46%;
    width: 90%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}
    .dialog-demo.two .content {
        height: 5rem;
        background: #fff;
        border-radius: 0.12rem;
        padding:0 0.4rem;
        padding-top:0.48rem;
        .content_top{
            display: flex;
            justify-content: space-between;
            .sport{
                width:38%;
                p{
                    text-align: center;
                    font-size: 0.3rem;
                    color: #000000;
                    font-weight: 600;
                }
            }
            .game{
                width:38%;
                background: none;
                padding-top: 0;
                p{
                    text-align: center;
                    font-size: 0.3rem;
                    color: #000000;
                    font-weight: 600;
                }
            }

            .aa{
                transition: all 1s; 
                transform:rotate(0deg);
            }
            .go{
                transform:rotate(360deg);
                transition: all 1s;
            }

        }
        .content_middle{
            padding-top: 0.32rem;
            text-align: left;
            font-size: 0.28rem;
            color: #989898;
            .iput{
                margin-top:0.2rem;
                width: 100%;
                height: 0.72rem;
                background: #F7F7F7;
                input{
                    width: 100%;
                    height: 100%;
                    border: 0.01rem solid #D1D1D1;
                    border-radius: 0.06rem;
                    background: #F7F7F7;
                    padding-left: 0.2rem;
                    box-sizing: border-box;
                }
            }
        }
        .content_bottom1{
            height: 0.88rem;
            width: 100%;
            background: -webkit-linear-gradient(left, #F58D00 , #F07139); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #F58D00, #F07139); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #F58D00, #F07139); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #F58D00 , #F07139); /* 标准的语法 */
            border-radius: 0.06rem;
            margin-top: 0.24rem;
            text-align: center;
            line-height: 0.88rem;
            font-size: 0.34rem;
            color: #FFFFFF;
        }
        .content_bottom2{
            height: 0.88rem;
            width: 100%;
            margin-top: 0.2rem;
            text-align: center;
            line-height: 0.88rem;
            font-size: 0.34rem;
            color: #F37F45;
        }
    }
    .dialog-demo .content{
        height: 2.5rem;
        background: #fff;
        border-radius: 0.06rem;
        padding:0 0.2rem;
        padding-top:0.24rem;
        .content_top{
            display: flex;
            justify-content: space-between;
            .sport{
                width:38%;
                p{
                    text-align: center;
                    font-size: 0.15rem;
                    color: #000000;
                    font-weight: 600;
                }
            }
            .game{
                width:38%;
                background: none;
                padding-top: 0;
                p{
                    text-align: center;
                    font-size: 0.15rem;
                    color: #000000;
                    font-weight: 600;
                }
            }

            .aa{
                transition: all 1s; 
                transform:rotate(0deg);
            }
            .go{
                transform:rotate(360deg);
                transition: all 1s;
            }

        }
        .content_middle{
            padding-top: 0.16rem;
            text-align: left;
            font-size: 0.14rem;
            color: #989898;
            .iput{
                margin-top:0.1rem;
                width: 100%;
                height: 0.38rem;
                background: #F7F7F7;
                input{
                    width: 100%;
                    height: 100%;
                    border: 0.005rem solid #D1D1D1;
                    border-radius: 0.03rem;
                    background: #F7F7F7;
                    padding-left: 0.1rem;
                    box-sizing: border-box;
                }
            }
        }
        .content_bottom1{
            height: 0.44rem;
            width: 100%;
            background: -webkit-linear-gradient(left, #F58D00 , #F07139); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #F58D00, #F07139); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #F58D00, #F07139); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #F58D00 , #F07139); /* 标准的语法 */
            border-radius: 0.03rem;
            margin-top: 0.12rem;
            text-align: center;
            line-height: 0.44rem;
            font-size: 0.17rem;
            color: #FFFFFF;
        }
        .content_bottom2{
            height: 0.44rem;
            width: 100%;
            margin-top: 0.1rem;
            text-align: center;
            line-height: 0.44rem;
            font-size: 0.17rem;
            color: #F37F45;
        }
    }
    .dialog-demo .pop {
        height: 0.44rem;
        text-align: right;
        .iconfont{
            font-size: 0.24rem;
            color:#FFFFFF;
        }
    }
    .dialog-demo.two .pop {
        height: 0.88rem;
        text-align: right;
        .iconfont{
            font-size: 0.48rem;
            color:#FFFFFF;
        }
    }
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
  color: #D1D1D1; 
} 


.dialog-demo .content_tip{
    height: 1.7rem;
    background: #fff;
    border-radius: 0.06rem;
    padding:0 0.2rem;
    padding-top:0.24rem;
    h2{
        font-weight: 600;
        font-size: 0.16rem;
        color:#000;
        text-align: center;
    }
    .tip_p{
        padding-top:0.35rem;
        color: #656565;
        font-size: 0.13rem;
        height: 0.3rem;
    }
    .content_bottom3{
        height: 0.44rem;
        width: 100%;
        background: -webkit-linear-gradient(left, #F58D00 , #F07139); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #F58D00, #F07139); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #F58D00, #F07139); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #F58D00 , #F07139); /* 标准的语法 */
        border-radius: 0.03rem;
        margin-top: 0.3rem;
        text-align: center;
        line-height: 0.44rem;
        font-size: 0.17rem;
        color: #FFFFFF;
    }
}
.dialog-demo.two .content_tip{
    height: 3.4rem;
    background: #fff;
    border-radius: 0.12rem;
    padding:0 0.4rem;
    padding-top:0.48rem;
    h2{
        font-weight: 600;
        font-size: 0.32rem;
        color:#000;
        text-align: center;
    }
    .tip_p{
        padding-top:0.7rem;
        color: #656565;
        font-size: 0.26rem;
        height: 0.6rem;
    }
    .content_bottom3{
        height: 0.88rem;
        width: 100%;
        background: -webkit-linear-gradient(left, #F58D00 , #F07139); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #F58D00, #F07139); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #F58D00, #F07139); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #F58D00 , #F07139); /* 标准的语法 */
        border-radius: 0.06rem;
        margin-top: 0.6rem;
        text-align: center;
        line-height: 0.88rem;
        font-size: 0.34rem;
        color: #FFFFFF;
    }
}
</style>

