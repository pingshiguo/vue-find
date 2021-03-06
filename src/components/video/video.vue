<template>
  <el-main>
    <div class="search-wrapper"
         @keyup.enter="search">
      <el-input
        placeholder="搜索视频"
        :clearable="true"
        v-model.lazy.trim="searchValue"
        class="input-with-select">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"></el-button>
      </el-input>
    </div>

    <transition-group
      name="slide-up"
      tag="div"
      class="grid-container">
      <div
        v-for="item in videos"
        :key="item.id"
        class="grid-wrapper">
        <div class="grid" @click="selectVideo(item.id)">
          <div class="grid__icon">
            <img :src="item.logoPic" :alt="item.name">
          </div>
          <p class="grid__title">{{item.name}}</p>
          <p class="grid__desc">{{item.fictionSynopsis}}</p>
          <!--<p class="grid__meta">-->
          <!--<el-rate-->
          <!--v-model="item.rate"-->
          <!--disabled-->
          <!--show-score-->
          <!--text-color="#ff9900"-->
          <!--score-template="{value}">-->
          <!--</el-rate>-->
          <!--</p>-->
        </div>

        <div v-if="banners" class="video-banner">
          <div class="swiper-container video-swiper"
               :class="'video-swiper-' + item.id">
            <div class="swiper-wrapper">
              <div v-for="banner in banners"
                   :key="banner.id"
                   class="swiper-slide">
                <a :href="banner.hyperlink"
                   :style="getBannerStyle(banner.color)"
                   v-html="banner.resource"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
    <router-view></router-view>
  </el-main>
</template>

<script>
  import { getVideos, searchVideos } from '../../api/page';
  import { ERR_OK } from '../../api/config';
  import { getRouterId } from '../../common/js/config';

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    name: 'page-video',
    props: {
      categoryId: {
        type: String
      }
    },
    data () {
      return {
        videos: [],
        banners: [],
        searchValue: '',
        temVideos: []
      };
    },
    computed: {
      routerId () {
        let path = this.$route.path.split('/')[1];
        return getRouterId(path);
      }
    },
    watch: {
      categoryId (categoryId) {
        if (categoryId) {
          this._getVideos(this.categoryId);
        }
      },
      searchValue (value) {
        if (value.length > 0) return;

        if (this.temVideos.length > 0) {
          this.videos = [...this.temVideos];
        } else {
          this.videos = [];
        }
      }
    },
    created () {
      this._getVideos(this.categoryId);
    },
    mounted () {},
    methods: {
      getBannerStyle (color) {
        return `color: ${color};`;
      },
      search () {
        if (!this.searchValue) {
          return;
        }

        this._searchVideos(this.searchValue);
      },
      initSwiper (swiperId, speed = 300) {
        return new Swiper(swiperId, {
          direction: 'vertical',
          speed,
          loop: true,
          autoplay: true,
          observer: true,
          observeParents: true
        });
      },
      selectVideo (videoId) {
        this.$router.push(`/video/${this.categoryId}/${videoId}`);
      },
      _searchVideos (value) {
        searchVideos(value, this.routerId).then(res => {
          if (res.code === ERR_OK) {
            this.videos = res.data.items;
          }
        });
      },
      _getVideos (categoryId) {
        getVideos(categoryId).then(res => {
          if (res.code === ERR_OK) {
            this.videos = [...res.data.items];
            this.temVideos = [...res.data.items];
            this.banners = [...res.data.ad];

            this.$nextTick(() => {
              for (let item of res.data.items) {
                this.initSwiper(`.video-swiper-${item.id}`, this.banners[0].timeSpeed);
              }
            });
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .slide-up-enter, slide-up-leave-to
    opacity: 0
    transform: translateY(100%)

  .slide-up-enter-active, .slide-up-leave-active
    transition: all .2s ease-in-out

  .search-wrapper
    max-width: 960px
    margin: 0 auto 20px

  .grid-container
    max-width: 960px
    margin: 0 auto
    font-size: 0

  .grid-wrapper
    display: inline-block
    width: 20%
    padding: 0 10px 10px

  .grid
    position: relative
    padding-bottom: 8px
    box-shadow: 0 0 5px rgba(0, 0, 0, .5)
    text-align: center
    background: #fff
    cursor: pointer

  .grid__icon
    overflow: hidden
    img
      width: 100%
      transition: all .3s ease-out
      &:hover
        transform: scale(1.1)

  .grid__title
    padding: 8px 16px
    line-height: 20px
    font-size: 16px
    color: $color-text-dark

  .grid__desc, .grid__meta
    padding: 0 16px
    line-height: 18px
    font-size: 14px
    color: $color-text-light

  .grid__desc
    display: -webkit-box
    -webkit-box-orient: vertical
    -webkit-line-clamp: 2
    text-overflow: ellipsis
    overflow: hidden

  .video-banner
    padding: 4px 8px
    .video-swiper
      height: 36px
      overflow: hidden
      .swiper-slide
        a
          width: 100%
          line-height: 18px
          font-size: 12px
          color: #666
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          word-break: break-word
          text-overflow: ellipsis
          overflow: hidden

  @media (max-width: 1200px)
    .grid-wrapper
      width: 25%

  @media (max-width: 768px)
    .grid-wrapper
      width: 50%

  @media (max-width: 320px)
    .grid-wrapper
      width: 100%
</style>
