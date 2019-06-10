<template>
  <div id="app" :style="{background:bk}">
    <!-- <transition :name="transitionRouter"> -->
    <transition>
      <keep-alive><router-view class="router-view"/></router-view></keep-alive>
    </transition>
  </div>
</template> 

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import { createScript } from 'common/js/util'
  export default {
    name: 'App',
    data() {
      return {
        transitionRouter: '',
        bk:'linear-gradient(180deg,rgba(22,107,206,1) 0%,rgba(1,132,208,1) 100%)'
      }
    },
    created() {
      createScript("https://www.googletagmanager.com/gtag/js?id=UA-129594456-3", true)
    },
    computed: {
      ...mapState({
        isLoading: 'isLoading'
      })
    },
    watch: {
      '$route' (to, from) {
        if (this.isLoading) {
          if (to.path == '/' || to.path == '/lottery' || to.path == '/lucky'|| to.path == '/3d'|| to.path == '/dice') {
            this.transitionRouter = 'router-left'
          } else {
            this.transitionRouter = 'router-right'
          }
        }
        if (to.path == '/3d' || to.path == '3dRecord'||to.path == '3dRule') {
          this.bk = 'linear-gradient(180deg,rgba(255, 235, 196, 1) 0%,rgba(255, 235, 196, 1) 100%)'
        } else if (to.path == '/dice' || to.path == 'diceRule') {
          this.bk = 'linear-gradient(180deg,rgba(12, 41, 50, 1) 0%,rgba(12, 41, 50, 1) 100%)'
        }
      }
    }
  } 
</script>
  
<style scoped lang="stylus">
#app
  // background: linear-gradient(180deg, #275bcb 0%, #07359a 100%)
.router-view
  //transition: all .5s cubic-bezier(.55,0,.1,1)
  width: 100%
  position: absolute
.router-right-enter, .router-left-leave-active
  opacity: 0
  transform: translate(100%, 0)
.router-right-leave-active, .router-left-enter
  opacity: 0
  transform: translate(-100%, 0)
</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
html,body {
  height: 100%;
  width: 100%;
  font-size: 0.22rem;
}
.mint-indicator-wrapper{
  z-index: 1000;
}
</style>
<style>
.toasted-container.center {
    top: 50%;
    transform: translate(-50%,-50%);
    left: 50%;
    white-space: nowrap;
}
</style>