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
                <a :href="banner.hyperlink">{{banner.resource}}</a>
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
    watch: {
      categoryId (categoryId) {
        if (categoryId) {
          this._getImages(this.categoryId);
        }
      },
      searchValue (value) {
        if (value === '' && this.temImages.length > 0) {
          this.images = [...this.temImages];
        }
      }
    },
    created () {
      this._getImages(this.categoryId);
    },
    mounted () {},
    methods: {
      search () {
        if (!this.searchValue) {
          return;
        }

        if (this.temImages.length === 0) {
          this.temImages = [...this.images];
        }

        this._searchImages(this.searchValue);
      },
      initSwiper (swiperId) {
        return new Swiper(swiperId, {
          direction: 'vertical',
          loop: true,
          autoplay: true
        });
      },
      selectGallery (galleryId) {
        this.$router.push(`/image/${this.categoryId}/${galleryId}`);
      },
      _searchImages (value) {
        searchImages(value, this.categoryId).then(res => {
          if (res.code === ERR_OK) {
            this.images = [...res.data.items];
          }
        });
      },
      _getImages (categoryId) {
        getImages(categoryId).then(res => {
          if (res.code === ERR_OK) {
            this.images = [];
            this.images = [...res.data.items];
            this.banners = [...res.data.ad];

            this.$nextTick(() => {
              for (let item of res.data.items) {
                this.initSwiper(`.image-swiper-${item.id}`);
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
    padding: 0 8px
    .image-swiper
      height: 24px
      overflow: hidden
      .swiper-slide
        height: 24px
        a
          display: inline-block
          width: 100%
          line-height: 24px
          font-size: 14px
          color: #666
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden

  @media (max-width: 768px)
    .grid
      width: 46%
      margin: 2%

  @media (max-width: 320px)
    .grid
      width: 100%
</style>
