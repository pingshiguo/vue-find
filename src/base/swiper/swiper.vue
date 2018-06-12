<template>
  <div :class="swiperId" class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    props: {
      swiperId: {
        type: String,
        required: true
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {};
    },
    mounted () {
      this.$nextTick(() => {
        // this._initSwiper();
      });
    },
    methods: {
      _initSwiper: function () {
        return new Swiper(`.${this.swiperId}`, {
          direction: this.direction,
          loop: this.loop,
          autoplay: this.autoPlay,
          updateOnImagesReady: true,
          observer: true,
          observeParents: true,
          loopedSlides: 8,
          slidesPerView: 'auto'
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
