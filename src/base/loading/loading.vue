<template>
  <div class="loading">
    <img src="./loading.gif" class="loading__icon" alt="loading">
    <!--<p v-if="title.length" class="loading__desc">{{title}}</p>-->
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .loading
    text-align: center

  .loading__icon
    width: 50px
    height: 50px

  .loading__desc
    line-height: 32px
    font-size: 24px
    color: $color-text-light
</style>
