<template>
  <div class="lang">
    <div class="langSwitch">
      <mt-popup position="bottom" v-model="isShowLangSwitch">
        <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="showToolbar">
          <p class="cancel" data-type="0" @click="confirmPicker">{{$t('lottery.others[2]')}}</p>
          <p class="confirm" data-type="1" @click="confirmPicker">{{$t('lottery.others[3]')}}</p>
        </mt-picker>
      </mt-popup>
    </div>
    <div class="loading-con flex-cen" v-show="isShowLoading">
      <loading :title="loadingTitle" is-full="1" is-icon="1"></loading>
    </div>
  </div>      
</template>

<script> 
import Loading from 'base/loading/loading'
import {mapState, mapMutations} from 'vuex'
  export default {
    props: { 
    },
    data() {
      return {
        isShowLoading: false,
        loadingTitle: '',
        langList: ['en', 'zh-CHS', 'zh-CHT'],
        isShowLangSwitch: false,
        showToolbar: true,
        slots: [
          {
            flex: 1,
            values: ['简体中文', 'English', '繁體中文'],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    created() {
      this.setLang(localStorage.getItem('i18nLocale') || 'zh-CHS')
    },
    computed: {
      ...mapState({
        isMusicMuted: 'isMusicMuted',
        langs: 'langs'
      })
    },
    methods: {
      langSwitch () {
        this.isShowLangSwitch = true
      },
      confirmPicker(e) {
        let _type = e.target.dataset.type
        this.isShowLangSwitch = false
        if (_type == 1) {
          let _curLang
          let _loadingText
          if (this.curPickerValue == 'English') {
            _curLang = 'en'
            _loadingText = 'Language switching'
          } else if (this.curPickerValue == '简体中文') {
            _curLang = 'zh-CHS'
            _loadingText = '语言切换中'
          } else if (this.curPickerValue == '繁體中文') {
            _curLang = 'zh-CHT'
            _loadingText = '語言切換中'
          }
          if (this.$i18n.locale == _curLang) return false
          this.loadingTitle = _loadingText  
          this.isShowLoading = true
          setTimeout(() => {
            this.$i18n.locale = _curLang   
            this.isShowLoading = false
            localStorage.setItem('i18nLocale', _curLang)
            this.setLang(_curLang)
            this.$toast(this.$t('lottery.toasts[0]'))
          }, 1000)
        }
      },
      onValuesChange(picker, values) {
        this.curPickerValue = values
      },
      ...mapMutations({
        musicControls: 'musicControls',
        setLang: 'setLang'
      })
    },
    components: {
      Loading
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/mixin'
  .lang
    position: absolute
    .loading-con
      fixed-full(500)       
</style>
