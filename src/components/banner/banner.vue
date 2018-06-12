<template>
  <div class="banner" :class="getBannerStyle">
    <swiper :swiper-id="bannerId"
            :direction="direction">
      <slot></slot>
    </swiper>
  </div>
</template>

<script>
  import Swiper from '../../base/swiper/swiper';

  export default {
    name: 'banner',
    components: {Swiper},
    props: {
      bannerId: {
        type: String
      },
      direction: {
        type: String,
        default: 'horizontal'
      }
    },
    computed: {
      getBannerStyle () {
        if (this.direction === 'vertical') {
          return 'banner_vertical';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .banner
    width: 100%
    .swiper-slide, img
      width: 220px
    &.banner_vertical
      width: 200px
      .swiper-slide, img
        width: 200px
</style>
