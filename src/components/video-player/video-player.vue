<template>
  <div class="video-player">
    <div class="video-player__hd">
      <go-back></go-back>
    </div>

    <div class="player-banner">
      <div class="swiper-container player-swiper">
        <div class="swiper-wrapper">
          <a v-for="item in banners"
             :key="item.id"
             :href="item.hyperlink"
             class="swiper-slide">
            <img
              :src="item.resource"
              :title="item.title"
              :alt="item.title">
          </a>
        </div>
      </div>
    </div>

    <div class="video-player__bd">
      <div class="video-container">
        <div class="video-wrapper">
          <video
            :src="url"
            controls>
            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>

        <div class="video-list-wrapper">
          <h1 class="video-list__title">视频列表</h1>
          <ul class="video-list">
            <li v-for="(item, index) in this.videos"
                :key="item.id"
                class="video-list__item"
                :class="item.resource === url ? 'active' : ''"
                @click="selectItem(item.resource)">
              {{(index + 1) + '. ' + item.title}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getVideo } from '../../api/page';
  import { ERR_OK } from '../../api/config';

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import GoBack from '../../base/go-back/go-back';

  export default {
    name: 'video-player',
    components: {GoBack},
    props: {
      videoId: {
        type: String
      }
    },
    data () {
      return {
        videos: [],
        url: '',
        banners: []
      };
    },
    created () {
      this._getVideo(this.videoId);
    },
    methods: {
      initSwiper (swiperId, len, speed = 300) {
        return new Swiper(swiperId, {
          speed,
          loop: true,
          autoplay: true,
          loopedSlides: len,
          slidesPerView: 'auto',
          observer: true,
          observeParents: true
        });
      },
      selectItem (url) {
        this.url = url;
      },
      _getVideo (videoId) {
        getVideo(videoId).then(res => {
          if (res.code === ERR_OK) {
            this.videos = [...res.data.items];
            this.url = this.videos[0].resource;

            this.banners = [...res.data.ad];
            this.$nextTick(() => {
              this.initSwiper('.player-swiper', this.banners.length, this.banners[0].timeSpeed);
            });
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .video-player
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 100
    padding: 20px
    overflow: auto
    -webkit-overflow-scrolling: touch
    background: #999

  .video-player__hd
    position: absolute
    top: 0
    right: 0
    boottom: 0
    left: 0
    z-index: 200
    display: none
    height: 45px

  .player-banner
    position: absolute
    top: 0
    right: 0
    left: 0
    .player-swiper
      width: 100%
      .swiper-wrapper
        padding: 10px
        .swiper-slide
          width: 220px
          margin: 0 10px
          img
            width: 220px

  .video-player__bd
    display: flex
    max-width: 960px
    height: 100%
    margin: auto

  .video-container
    position: relative
    display: flex
    width: 100%
    margin: auto
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5)
    font-size: 0

  .video-wrapper
    flex: 1
    video
      width: 100%

  .video-list-wrapper
    background: #fff
    overflow-y: auto

  .video-list__title
    padding: 0 8px
    line-height: 36px
    font-size: 16px
    color: #666

  .video-list__item
    min-width: 120px
    padding: 0 16px
    border-bottom: 1px solid #f1f1f1
    line-height: 28px
    font-size: 14px
    color: #999
    cursor: pointer
    &.active
      color: #333

  @media (max-width: 768px)
    .video-player__hd
      display: block

    .player-banner
      top: 45px

    .video-container
      flex-direction: column

    .video-list-wrapper
      margin-top: 16px
</style>
