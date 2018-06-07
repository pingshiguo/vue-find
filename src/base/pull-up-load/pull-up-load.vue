<template>
  <div class="page-novel">
    <scroll ref="scroll"
            :data="novelList"
            :pullUpLoad="true"
            class="page-novel__bd"
            @scrollToEnd="pullUpLoad">
      <div>
        <h1 class="page-novel__title">热门小说</h1>
        <div class="media-wrap pullup-wrapper">
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
      </div>
      <div class="loading-container">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Scroll from '../scroll/scroll';
  import Loading from '../loading/loading';

  export default {
    components: {
      Loading,
      Scroll
    },
    data () {
      return {
        isPullUpLoad: false,
        novelList: [
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
        ]
      };
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    methods: {
      pullUpLoad () {
        this.isPullUpLoad = true;
        console.log('pull up load');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .page-novel
    position: fixed
    top: 0
    right: 0
    left: 0
    bottom: 0

  .page-novel__bd
    height: 100%
    overflow: hidden

  .page-novel__title
    padding-left: 16px
    margin: 32px 0 16px
    font-size: 48px

  .media-wrap
    height: 100%
    overflow: hidden
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

  .loading-container
    position: absolute
    top: 50%
    right: 0
    left: 0
    transform: translateY(-50%)

  .pullup-wrapper
    width: 100%
    display: flex
    justify-content center
    align-items center
    padding: 16px 0
</style>
