<template>
  <div class="my-timing flex-cen">
    <span>{{newTime[0]}}</span><span>{{newTime[1]}}</span><strong>:</strong><span>{{newTime[2]}}</span><span>{{newTime[3]}}</span><strong>:</strong><span>{{newTime[4]}}</span><span>{{newTime[5]}}</span>    
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
        currentTime: "--:--:--",
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
          let _day = parseInt(time / (24 * 60 * 60))
          let _hours = parseInt((time % (24 * 60 * 60)) / (60 * 60))
          let _min = parseInt((time - _day * (24 * 60 * 60) - _hours * (60 * 60)) / (60))
          let _seconds = parseInt((time - _day * (24 * 60 * 60) - _hours * (60 * 60)) - _min * 60)
          if (_day > 0) {
            _currentTime += _day + connect
          }
          _currentTime += ((_hours < 10 ? '0' + _hours : _hours) + connect + (_min < 10 ? '0' + _min : _min) + connect + (_seconds < 10 ? '0' + _seconds : _seconds))
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
      width: .21rem
      height: spanH = .31rem 
      line-height: spanH         
      background: url($ASSETSURL + '/lottery/images/bg_01.png') no-repeat center
      background-size: 100%
      font-size: .18rem
      /*color:rgba(255,216,0,1)*/
    strong
      display: block 
      width: .1rem
      font-size: .14rem
      font-weight: bold 
      height: .31rem
      line-height: .25rem
      color: #fff  
      
</style>
<style>
  .my-timing.three span{
    background-color: #9F6625;
    border-radius: 4px;
    color: #FFD800;
    padding: 2px 4px;
    background-image:none;
    margin-right: 0.05rem;
    text-align: center;
   }
   .my-timing.three strong{
     margin-right: 0.05rem;
   }
</style>
