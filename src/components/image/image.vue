<template>
  <el-main>
    <div class="search-wrapper"
         @keyup.enter="search">
      <el-input
        placeholder="搜索图片"
        :clearable="true"
        v-model.lazy.trim="searchValue"
        class="input-with-select">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"></el-button>
      </el-input>
    </div>

    <transition-group name="slide-up"
                      tag="div"
                      class="grid-container">
      <div v-for="item in images"
           :key="item.id"
           class="grid">
        <div class="grid__icon"
             @click="selectGallery(item.classifyShowResourceId)">
          <img
            :src="item.resource" :alt="item.name">
          <p class="grid__title">
            {{item.name}}
            <span v-if="item.sum > 1"
                  class="gallery-total">{{ '共' + item.sum + '张'}}</span>
          </p>
        </div>

        <div v-if="banners" class="image-banner">
          <div class="swiper-container image-swiper"
               :class="'image-swiper-' + item.id">
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
  import { getImages, searchImages } from '../../api/page';
  import { ERR_OK } from '../../api/config';
  import { getRouterId } from '../../common/js/config';

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    name: 'page-image',
    props: {
      categoryId: {
        type: String
      }
    },
    data () {
      return {
        images: [],
        banners: [],
        searchValue: '',
        temImages: []
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
          this._getImages(this.categoryId);
        }
      },
      searchValue (value) {
        if (value.length > 0) return;

        if (this.temImages.length > 0) {
          this.images = [...this.temImages];
        } else {
          this.images = [];
        }
      }
    },
    created () {
      this._getImages(this.categoryId);
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

        this._searchImages(this.searchValue);
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
      selectGallery (galleryId) {
        this.$router.push(`/image/${this.categoryId}/${galleryId}`);
      },
      _searchImages (value) {
        searchImages(value, this.routerId).then(res => {
          if (res.code === ERR_OK) {
            this.images = [...res.data.items];
          }
        });
      },
      _getImages (categoryId) {
        getImages(categoryId).then(res => {
          if (res.code === ERR_OK) {
            this.images = [...res.data.items];
            this.temImages = [...res.data.items];
            this.banners = [...res.data.ad];

            this.$nextTick(() => {
              for (let item of res.data.items) {
                this.initSwiper(`.image-swiper-${item.id}`,
                  this.banners[0].timeSpeed);
              }
            });
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

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

  .grid
    display: inline-block
    width: 22%
    margin: 1.5%
    cursor: pointer

  .grid__icon
    position: relative
    overflow: hidden
    img
      display: block
      width: 100%
      transition: all .3s ease-out
      &:hover
        transform: scale(1.1)
        & + .grid__title
          transform: translateY(100%)

  .grid__title
    position: absolute
    right: 0
    bottom: 0
    left: 0
    padding: 0 8px
    line-height: 24px
    font-size: 12px
    color: #fff
    background: rgba(0, 0, 0, .5)
    transition: all .2s ease-out

  .gallery-total
    float: right

  .image-banner
    padding: 4px 8px
    .image-swiper
      height: 36px
      overflow: hidden
      .swiper-slide
        a
          width: 100%
          line-height: 18px
          font-size: 12px
          color: #666
          word-break: break-word
          text-overflow: ellipsis
          overflow: hidden
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2

  @media (max-width: 768px)
    .grid
      width: 46%
      margin: 2%

  @media (max-width: 320px)
    .grid
      width: 100%
</style>
