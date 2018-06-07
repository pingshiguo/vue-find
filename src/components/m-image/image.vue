<template>
  <div class="page-image ignore">
    <scroll
      ref="scroll"
      :data="list"
      :pullUpLoad="pullUpLoad"
      @pullingUp="onPullingUp">
      <h1 class="page-image__title">热门图片</h1>
      <div class="media-wrap">
        <div v-for="item in list" class="media-box flex">
          <div class="media-box__hd">
            <img :src="item.pic_url"
                 class="media-box__thumb"
                 :title="item.name"
                 :alt="item.name">
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '../../base/scroll/scroll';

  const LIST = [
    {
      'name': '超时空同居',
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
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
    mounted () {},
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

  .page-image
    position: fixed
    top: 90px
    right: 16px
    bottom: 0
    left: 16px
    &.ignore
      max-width: 650px
      margin: 0 auto

  .page-image__title
    padding: 32px 16px
    font-size: 48px

  .media-wrap
    position: relative
    font-size: 0

  .media-box
    display: inline-block
    width: 50%
    padding: 0 16px
    margin-bottom: 40px
    text-align: center

  .media-box__thumb
    width: 100%
    height: auto
</style>
