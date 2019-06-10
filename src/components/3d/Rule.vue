<template>
    <div class="three-rule">
        <div class="nav">
            <img :src="ASSETSURL+'/3d/image/back.png'" alt="" class="back" @click="back">
            <span>{{$t('threeD.rule[0]')}}</span>
        </div>
        <div class="content">
            <div class="line">
                <div class="title">3D {{$t('threeD.rule[0]')}}</div>
                <div>{{$t('threeD.rule[1]')}}</div>
            </div>
            <div class="line">
                <div class="title">{{$t('threeD.rule[2]')}}</div>
                <div>{{$t('threeD.rule[3]')}}</div>
                <div>{{$t('threeD.rule[4]')}}</div>
                <div v-html="$t('threeD.rule[5]')"> </div>
                <div><span>{{$t('threeD.rule[6]')}}</span><br v-if="lang=='en'"/>① {{$t('threeD.rule[7]')}}：<span class="focus">{{$t('threeD.rule[8]')}}</span></div>
                <div><span style="    visibility: hidden;" v-if="!lang=='en'">{{$t('threeD.rule[6]')}}</span>② {{$t('threeD.rule[9]')}}：<span class="focus">{{$t('threeD.rule[8]')}}</span></div>
                <div><span style="    visibility: hidden;" v-if="!lang=='en'">{{$t('threeD.rule[6]')}}</span>③ {{$t('threeD.rule[10]')}}：<span class="focus">{{$t('threeD.rule[11]')}}</span></div>
            </div>
            <div class="line">
                <div class="title">{{$t('threeD.rule[12]')}}</div>
                <div>{{$t('threeD.rule[13]')}}</div>
            </div>
            <div class="line">
                <div class="title">{{$t('threeD.rule[14]')}}</div>
                <div>{{$t('threeD.rule[15]')}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    methods:{
        back(){
             this.$router.go(-1)
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
}
</script>
<style lang="scss">
.three-rule {
    height: 100%;
    width: 100%;
    background-color: #FFEBC4;
    .nav {
        background-color: #71AB42;
        display: flex;
        height: 0.34rem;
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
        padding:  0 0.32rem;
        padding-top: 0.6rem;
        height: calc(100% - 0.94rem);
        overflow: auto;
        .line {
            margin-bottom: 0.6rem;
            text-align: left;
            color: #D0A370;
            line-height: 0.4rem;
            .title {
                color: #A86F16;
                font-size: 0.3rem;
                font-weight: bold;
                margin-bottom: 0.2rem;
            }
            .focus {
                color: #EF900F;
            }
        }
    }
}
</style>
