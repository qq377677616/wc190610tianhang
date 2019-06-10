<template>
  <div class="record container">
    <header-record :cur-index="curIndex" @switch="headerSwitch"></header-record>
    <!-- <transition :name="transitionRouter"> -->
    <transition>
      <keep-alive><router-view class="router-view"/></keep-alive>
    </transition>
  </div>   
</template> 

<script>
  import HeaderRecord from 'components/lucky/header-record/header-record'
  export default {
    data() {
      return {
        curIndex: 0,
        transitionRouter: ''
      }    
    }, 
    activated() {
    },
    methods: {
      headerSwitch(e) { 
        if (e.index == -1) {
          this.curIndex = 0
          this.$router.push('/lucky')
          return
        }
        this.curIndex = e.index
        if (e.index == 0) {
          this.transitionRouter =  "router-left" 
          this.$router.push('../record')    
        } else if (e.index == 1) {
          this.transitionRouter =  "router-right"
          this.$router.push('../record/myRecord')    
        }   
      }
    },
    components: {
      HeaderRecord   
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    background:linear-gradient(180deg,rgba(39,91,203,1) 0%,rgba(7,53,154,1) 100%)
    color: #fff 
    font-size: 0
    height: 100vh 
    overflow: hidden
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
