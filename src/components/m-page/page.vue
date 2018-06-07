<template>
  <div class="page ignore">
    <div class="page__hd flex flex_middle">
      <div class="flex__item">
        <h1 class="page__title">发现</h1>
      </div>
      <nav class="nav flex">
        <router-link to="/image"
                     class="nav__item flex__item">图片
        </router-link>
        <router-link to="/video"
                     class="nav__item flex__item">视频
        </router-link>
        <router-link to="/novel"
                     class="nav__item flex__item">小说
        </router-link>
        <router-link to="/forum"
                     class="nav__item flex__item">论坛
        </router-link>
      </nav>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .page
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: $color-bg
    &.ignore
      max-width: 650px
      margin: 0 auto

  .page__hd
    position: relative
    padding: 0 32px
    line-height: 90px
    background: $color-bg
    bottom-1px(#f3f3f3)

  .page__title
    font-size: 44px
    color: $color-text-dark

  .nav
    /*line-height: 90px*/

  .nav__item
    display: inline-block
    padding: 0 20px
    font-size: 32px
    color: $color-text-light
    &.router-link-active
      color: $color-text-dark
</style>
