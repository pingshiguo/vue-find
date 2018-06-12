<template>
  <div class="go-back" @click="goBack"></div>
</template>

<script>
  export default {
    methods: {
      goBack () {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .go-back
    position: absolute
    left: 0
    z-index: 100
    width: 45px
    height: 45px
    cursor: pointer
    &:before
      content: ''
      position: absolute
      top: 50%
      left: 50%
      width: 16px
      height: 16px
      border-top: 2px solid #fff
      border-left: 2px solid #fff
      transform: translate3d(-50%, -50%, 0) rotate(-45deg)
</style>
