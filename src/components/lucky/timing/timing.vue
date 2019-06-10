<template>
  <div class="my-timing flex-cen">
    <span>{{newTime[0]}}</span><span>{{newTime[1]}}</span><strong>:</strong><span>{{newTime[2]}}</span><span>{{newTime[3]}}</span> 
  </div>
</template>

<script>
  export default {
    props: {
      times: String
    },
    data() {
      return { 
        autoTime: null,
        currentTime: "--:--",
        dashoffset: 0
      }
    },
    created(){
      //this.start()
    },
    computed: {
      newTime() {
        return this.currentTime.split(":").join("").split('')       
      }    
    },
    methods: {
      start(times){
        if (times <= 0) return
        this.calcTime(times, ":")
      },
      backRoter() { 
        this.$router.go(-1) 
      },
      calcTime(time, connect){
        let _totalTime
        let _isCircle = false
        // let _timeArr = time.split(":").reverse()
        // time = 0
        // for (let i = 0; i < _timeArr.length; i++) {
        //   time += _timeArr[i] * (i == 0 ? 1 : ( i == 1 ? 60 : 60 * 60))
        // }
        _totalTime = time
        clearInterval(this.autoTime)
        this.autoTime = setInterval(() => {
          let _currentTime = ''
          /*let _day = parseInt(time / (24 * 60 * 60))
          let _hours = parseInt((time % (24 * 60 * 60)) / (60 * 60))*/
          let _min = parseInt(time / 60)
          let _seconds = parseInt(time - _min * 60)
          _currentTime += ((_min < 10 ? '0' + _min : _min) + connect + (_seconds < 10 ? '0' + _seconds : _seconds))
          this.currentTime = _currentTime
          if (time > 0) {
            time--
            this.$emit("realTime", {curSeconds: time, curTime: this.currentTime})
          } else {
            clearInterval(this.autoTime)
            this.$emit("timingEnd")
          }
        }, 1000)
      }
    }
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/variable'
  .my-timing
    span
      display: block  
      width: .13rem
      height: spanH = .15rem 
      line-height: .16rem         
      background: url($ASSETSURL + '/lucky/images/bg_06.png') no-repeat center
      background-size: 100%
      font-size: .12rem
      color: rgba(255,142,10,1)
      text-align: center
      margin: 0 1px
      box-shadow: 0 1px 2px 0px #7FC5E7
      border-radius: 3px
    strong
      display: block 
      //width: .1rem
      font-size: .14rem
      // font-weight: bold 
      height: .15rem
      line-height: .12rem
      color: #fff  
      padding: 0 .04rem
</style>
