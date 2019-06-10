<template>
    <div class="three-record">
        <div class="three-record-nav">
            <img :src="ASSETSURL+'/3d/image/back.png'" alt="" class="back" @click="back">
            <span>{{$t('threeD.betRecord[0]')}}</span>
        </div>
        <div class="content" v-infinite-scroll="loadMore1" infinite-scroll-disabled="busy1" infinite-scroll-distance="10">
            <loading is-full="1" is-icon="1"  v-if="loading" style="height:100%;background:transparent;"></loading>
            <div class="line" v-for="(item,index) in recordData" :key="`line${index}`">
                <div class="block1 block">
                    <div class="left">
                        <div v-if="item.betType == 10">{{$t('threeD.betRecord[1]')}}</div>
                        <div v-if="item.betType == 20">{{$t('threeD.betRecord[2]')}}</div>
                        <div v-if="item.betType == 30">{{$t('threeD.betRecord[3]')}}</div>
                        <div v-if="item.betType == 40">{{$t('threeD.betRecord[4]')}}</div>
                        <div style="text-align:left;">
                            {{item.num}}
                        </div>
                    </div>
                    <div class="right" v-if="item.betStatus == 100">{{$t('threeD.betRecord[5]')}}</div>
                    <div class="right" v-if="item.betStatus == 200" style="color:#EF900F">+{{item.awardAmount}}WLC</div>
                    <div class="right" v-if="item.betStatus == 300">{{$t('threeD.betRecord[6]')}}</div>
                    <div class="right" v-if="item.betStatus == 400" style="color:#EF900F">+{{item.awardAmount}}WLC</div>
                </div>
                <div class="block block2">
                    <div class="left" v-if="lang == 'en'||lang == ''">
                        <div>{{item.betIssueNo}} {{$t('threeD.betRecord[7]')}} </div>
                        <div>
                            <span>{{item.betCount}}{{$t('threeD.betRecord[8]')}}{{$t('threeD.betRecord[9]')}} </span>
                            <span>{{item.multiple}} {{$t('threeD.betRecord[10]')}}</span>
                        </div>
                    </div>
                    <div class="left" v-else>
                        <div>{{item.betIssueNo}}{{$t('threeD.betRecord[7]')}}</div>
                        <div>
                            <span>{{$t('threeD.betRecord[8]')}}{{item.betCount}}{{$t('threeD.betRecord[9]')}}</span>
                            <span>{{item.multiple}}{{$t('threeD.betRecord[10]')}}</span>
                        </div>
                    </div>
                    <div class="right">{{$t('threeD.betRecord[11]')}}：{{item.betAmount}} WLC</div>
                </div>
                <div class="block block3">
                    <div class="left">
                        <div>{{$t('threeD.betRecord[12]')}}：{{item.betTime}}</div>
                    </div>
                    <div class="right" v-if="item.betStatus  == 100">{{$t('threeD.betRecord[13]')}}：-</div>
                    <div class="right" v-else>{{$t('threeD.betRecord[13]')}}：{{item.awardNo.join(' ')}}</div>
                </div>
            </div>
            <div v-if="recordData.length ==0 &&!loading" class="no-data">
                {{$t('threeD.betRecord[14]')}}
                <div class="back" @click="back">
                    {{$t('threeD.betRecord[15]')}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { get3dRecord} from "api/request"
import Loading from 'base/loading/loading'
import { mapState, mapMutations } from 'vuex'
export default {
    components:{
        Loading
    },
    data(){
        return {
            recordData:[],
            loading:true,
            currentPage:1,
        }
    },
    mounted() {
        // this.first = true;
        // this.getData();
    },
    activated() {
        this.recordData=[];
        this.currentPage = 1;
        this.loading = true;
        this.getData();
    },
    computed:{
        'lang':function(){
        return this.$store.state.langs;
        },
        ...mapState({
            ASSETSURL: 'ASSETSURL'    
        })
    },
    methods:{
        back(){
             this.$router.go(-1)
        },
        loadMore1() {
            this.currentPage = this.currentPage+1;
            if (this.currentPage <= this.totalPages) {
                this.getData();
            }
        },
        getData() {
            get3dRecord({
                "currentPage": this.currentPage,
                "pageSize": 10
            }).then(res=>{
                const data = res.data.data;
                if (data) {
                    for (const v of data) {
                        const arr = [];
                        arr.push(v.betContent.firstGroup.join(''))
                        arr.push(v.betContent.secondGroup.join(''))
                        arr.push(v.betContent.thirdGroup.join(''))
                        v.num = arr.join(' ')
                    }
                    this.totalPages = res.data.totalPages;
                    this.recordData = this.recordData.concat(data);
                } 
                this.loading = false;
            })
        }
    }
}
</script>
<style lang="scss" >
@import '../../common/style/main.scss';
.three-record {
    height: 100%;
    width: 100%;
    background-color: #FFEBC4;
    .three-record-nav {
        background-color: #71AB42;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0.2rem;
        position: relative;
        .back {
            height: 0.56rem;
            width: 0.56rem;
            position: absolute;
            left: 0;
        }
        span {
            font-size: 0.36rem;
            color: #ffffff;
        }
    }
    .content {
        height: calc(100% - 0.94rem);
        overflow: auto;
        .no-data {
            margin-top: calc(50% - 0.5rem);
            display: flex;
            align-items: center;
            flex-direction: column;
            color: #A86F16;
            font-size: 0.3rem;
            .back {
                background-image: url('#{$url}/3d/image/record-jump.png');
                height: 0.9rem;
                width: 3.02rem;
                margin-top: 0.3rem;
                background-size: 100% 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.36rem;
                color: #fff;
            }
        }
        .line {
            // display: flex;
            padding: 0.32rem 0.28rem;
            width: calc(100% - 0.56rem);
            border-bottom: 1px solid #FADCA5;
                background-color: #FFEBC4;
            .block1 {
                margin-bottom: 0.4rem;
                color: #A86F16;
            }
            .block2 {
                color: #D0A370;
                margin-bottom: 0.25rem;
            }
            .block3 {
                color: #D0A370;
            }
            .block {
                display: flex;
                width: 100%;
                justify-content: space-between;
                .left {
                    display: flex;
                    font-size: 0.28rem;
                    
                    &>div:nth-child(1) {
                        margin-right: 0.32rem;
                    }
                }
                .right {
                }
            }
        }
    }
}
</style>
