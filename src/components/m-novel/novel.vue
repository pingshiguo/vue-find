<template>
  <div class="page-novel ignore">
    <scroll
      ref="scroll"
      :data="novelList"
      :listenScrollEnd="true"
      :pullUpLoad="pullUpLoad"
      @pullingUp="onPullingUp">
      <h1 class="page-novel__title">热门小说</h1>
      <div class="media-wrap">
        <router-link v-for="item in novelList" to="/novel/book"
                     class="media-box flex">
          <div class="media-box__hd">
            <img src="../../assets/s29588731.jpg" alt=""
                 class="media-box__thumb">
          </div>
          <div class="media-box__bd flex__item">
            <h2 class="media-box__title">{{item.name}}</h2>
            <p class="media-box__desc"><span>{{item.ratings}}</span></p>
            <p class="media-box__meta">{{item.meta}}</p>
          </div>
        </router-link>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Scroll from '../../base/scroll/scroll';

  const LIST = [
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    },
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    },
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    },
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    },
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    },
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    },
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    },
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    },
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    },
    {
      name: '人性的因素',
      ratings: '8.8',
      meta: '[英] 毛姆/理想国丨广西师范大学出版社/2018-3'
    }
  ];

  export default {
    components: {
      Scroll
    },
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
        novelList: []
      };
    },
    computed: {},
    created () {
      this.novelList.push(...LIST);
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    methods: {
      onPullingUp () {
        setTimeout(() => {
          if (this.page >= 3) {
            this.$refs.scroll.forceUpdate();
          } else {
            this.page++;
            this.novelList.push(...LIST);
          }
        }, 1500);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .page-novel
    position: fixed
    top: 90px
    right: 16px
    bottom: 0
    left: 16px
    overflow: hidden
    &.ignore
      max-width: 650px
      margin: 0 auto

  .page-novel__title
    padding: 32px 0 16px 16px
    font-size: 48px

  .media-wrap
    position: relative
    font-size: 0

  .media-box
    position: relative
    padding: 40px 32px
    bottom-1px(#ccc)

  .media-box__hd
    width: 200px
    margin-right: 32px

  .media-box__thumb
    width: 100%
    height: auto

  .media-box__bd
    min-width: 0

  .media-box__title
    padding-bottom: 16px
    font-size: 36px
    color: $color-text-dark

  .media-box__desc, .media-box__meta
    line-height: 32px
    font-size: 24px
    color: $color-text-light

  .media-box__meta
    padding-top: 12px
</style>
