<template>
  <transition name="popup">
    <div class="gallery">
      <div class="gallery__hd">
        <go-back></go-back>
      </div>

      <div class="gallery-banner">
        <div class="swiper-container gallery-swiper">
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

      <div class="gallery__img"
           :style="getImage(imageIndex)">
        <div class="arrow-left" @click="goPre"></div>
        <div class="arrow-right" @click="goNext"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { getGallery } from '../../api/page';
  import { ERR_OK } from '../../api/config';

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import GoBack from '../../base/go-back/go-back';

  export default {
    name: 'gallery',
    components: {GoBack},
    props: {
      galleryId: {
        type: String
      }
    },
    data () {
      return {
        gallery: [],
        imageIndex: 0,
        banners: []
      };
    },
    created () {
      this._getGallery(this.galleryId);
    },
    mounted () {

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
      goPre () {
        if (this.imageIndex === 0) {
          this.imageIndex = this.gallery.length - 1;
        } else {
          this.imageIndex--;
        }
      },
      goNext () {
        if (this.imageIndex === this.gallery.length - 1) {
          this.imageIndex = 0;
        } else {
          this.imageIndex++;
        }
      },
      getImage (imageIndex) {
        if (this.gallery.length > 0 && this.imageIndex >= 0) {
          let url = this.gallery[imageIndex].resource;

          return `background-image: url("${url}");opacity: 1;`;
        }
      },
      _getGallery (galleryId) {
        getGallery(galleryId).then(res => {
          if (res.code === ERR_OK) {
            this.gallery = [...res.data.items];
            this.imageIndex = 0;

            this.banners = [...res.data.ad];
            this.$nextTick(() => {
              this.initSwiper('.gallery-swiper', this.banners.length, this.banners[0].timeSpeed);
            });
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .popup-enter, .popup-leave-to
    opacity: 0
    transform: scale(.1) rotate(360deg)

  .popup-enter-active, .popup-leave-active
    opacity: 1
    transition: all .3s ease-in-out

  .gallery
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 9999
    overflow: hidden
    background: rgba(0, 0, 0, 1)

  .gallery__hd
    position: absolute
    top: 0
    right: 0
    left: 0
    z-index: 200
    display: none
    height: 45px

  .gallery-banner
    position: absolute
    top: 0
    right: 0
    left: 0
    height: 108px
    overflow: hidden
    .gallery-swiper
      width: 100%
      .swiper-wrapper
        padding: 10px
        .swiper-slide
          width: 220px
          margin: 0 10px
          img
            width: 220px
            max-height: 88px

  .gallery__img
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 9999
    margin: 108px auto
    background: center center no-repeat
    background-size: contain
    opacity: 0
    transition: all .3s ease-in-out

  .arrow-left, .arrow-right
    position: absolute
    top: 50%
    z-index: 9999
    width: 36px
    height: 60px
    cursor: pointer
    transform: translateY(-50%)

  .arrow-left
    left: 16px
    &:before
      content: ''
      position: absolute
      top: 50%
      left: 8px
      width: 16px
      height: 16px
      border-top: 2px solid #fff
      border-left: 2px solid #fff
      transform: translateY(-50%) rotate(-45deg)

  .arrow-right
    right: 16px
    &:after
      content: ''
      position: absolute
      top: 50%
      right: 8px
      width: 16px
      height: 16px
      border-top: 2px solid #fff
      border-right: 2px solid #fff
      transform: translateY(-50%) rotate(45deg)

  @media (max-width: 768px)
    .gallery__hd
      display: block

    .gallery-banner
      top: 45px
</style>
