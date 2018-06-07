<template>
  <div class="page-video ignore">
    <scroll
      ref="scroll"
      :data="list"
      :pullUpLoad="pullUpLoad"
      @pullingUp="onPullingUp">
      <h1 class="page-video__title">影院热映</h1>
      <div class="grids">
        <a v-for="item in list" href="javascript:;" class="grid">
          <div class="grid__icon">
            <img
              :src="item.pic_url" :title="item.name" :alt="item.name">
          </div>
          <h2 class="grid__title">{{ item.name }}</h2>
          <p class="grid__desc">
            <span>{{ item.ratings }}</span>
          </p>
          <!--<p class="grid__meta">中国大陆 / 喜剧 奇幻 / 苏伦 / 雷佳音 佟丽娅</p>-->
        </a>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '../../base/scroll/scroll';

  const LIST = [
    {
      'name': '超时空同居',
      'ratings': '7.2',
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'ratings': '7.2',
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'ratings': '7.2',
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'ratings': '7.2',
      'pic_url': require('../../assets/p2520331478.jpg')
    }
  ];

  export default {
    components: {Scroll},
    data () {
      return {
        page: 1,
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '暂无更多数据'
          }
        },
        list: []
      };
    },
    created () {
      this.list = [...LIST];
    },
    methods: {
      onPullingUp () {
        setTimeout(() => {
          if (this.page >= 3) {
            this.$refs.scroll.forceUpdate();
          } else {
            this.page++;
            this.list.push(...LIST);
          }
        }, 1500);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .page-video
    position: fixed
    top: 90px
    right: 16px
    bottom: 0
    left: 16px
    &.ignore
      max-width: 650px
      margin: 0 auto

  .page-video__title
    padding: 32px 16px
    font-size: 48px

  .grids
    position: relative
    font-size: 0

  .grid
    display: inline-block
    width: 33.33333%
    padding: 0 16px
    margin-bottom: 40px
    text-align: center

  .grid__icon
    position: relative
    img
      width: 100%
      height: auto

  .grid__title
    padding-top: 12px
    line-height: 36px
    font-size: 28px
    color: $color-text

  .grid__desc, .grid__meta
    padding-top: 8px
    line-height: 32px
    font-size: 24px
    color: $color-text-light
</style>
