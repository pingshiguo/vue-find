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
    top: 50%
    width: 90px
    height: 90px
    cursor: pointer
    transform: translateY(-50%)
    &:after
      content: ''
      position: absolute
      top: 50%
      left: 30px
      width: 20px
      height: 20px
      border: 4px solid $color-text
      border-right: 0
      border-bottom: 0
      transform-origin: 0 0
      transform: rotate(-45deg)
</style>
