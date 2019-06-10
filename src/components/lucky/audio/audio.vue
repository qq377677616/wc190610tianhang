<template>
  <div class="my-audio">
    <audio src="./static/music/music.mp3" loop="loop" id="music-back"></audio>    
    <!-- <audio src="./static/sound_01.mp3" id="music-purchase"></audio>    
    <audio src="./static/sound_02.mp3" id="music-printing"></audio>    
    <audio src="./static/sound_03.mp3" id="music-lottery"></audio>  -->   
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    
  } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .my-audio
    position: fixed
    opacity: 0
    left: -50%
    top: -50%    
</style>
