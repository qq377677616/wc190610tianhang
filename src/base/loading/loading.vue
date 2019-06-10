<template>
  <div :class="['loading', isFull == 1 ? 'full' : '', title ? 'title' : '']">
    <img width="24" height="24" src="./loading.gif" v-if="isIcon == 1">
    <p class="desc" v-if="title">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      isFull: {
        type: String,
        default: '0'
      },
      isIcon: {
        type: String,
        default: '0'
      },
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  //@import "~common/stylus/variable"

  .loading
    display: flex
    align-items: center
    flex-direction: column
    justify-content: center
    width: 100%
    text-align: center
    .desc
      line-height: 1.2
      font-size: .12rem
      color: #fff
      padding-top: .05rem
    &.full
      width: auto
      padding: .1rem
      border-radius: .05rem
      background: rgba(0,0,0,.7)
    &.title.full
      width: .6rem
      p
        padding-top: .05rem     
</style>
