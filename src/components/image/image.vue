<template>
  <el-main>
    <div class="grid-container">
      <div class="el-grid are-images-unloaded">
        <div class="el-grid-sizer"></div>
        <div class="el-grid-gutter-sizer"></div>
        <div v-for="item in images"
             class="el-grid-item"
             @click="selectGallery(item.classifyShowResourceId)">
          <img
            :src="item.resource" :alt="item.name">
          <p class="grid__title">
            {{item.name}}
            <span v-if="item.sum > 0"
                  class="gallery-total">{{ '共' + item.sum + '张'}}</span>
          </p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </el-main>
</template>

<script>
  import Masonry from 'masonry-layout';
  import ImagesLoaded from 'imagesloaded';

  import { getImages } from '../../api/page';
  import { ERR_OK } from '../../api/config';

  export default {
    name: 'page-image',
    props: {
      categoryId: {
        type: String
      }
    },
    data () {
      return {
        images: []
      };
    },
    watch: {
      categoryId (categoryId) {
        if (categoryId) {
          this._getImages(this.categoryId);
        }
      }
    },
    created () {
      if (!this.categoryId) {
        this.$emit('selectCategory');
      }

      this._getImages(this.categoryId);
    },
    mounted () {},
    methods: {
      selectGallery (galleryId) {
        this.$router.push(`/image/${galleryId}`);
      },
      initImage (masonry) {
        const imgLoad = new ImagesLoaded('.el-grid', (instance, image) => {
          const grid = instance.elements[0];
          grid.classList.remove('are-images-unloaded');

          masonry.options.itemSelector = '.el-grid-item';
          const items = grid.querySelectorAll('.el-grid-item');
          masonry.appended(items);
        });
      },
      initMasonry () {
        return new Masonry('.el-grid', {
          itemSelector: 'none', // select none at first
          columnWidth: '.el-grid-sizer',
          gutter: '.el-grid-gutter-sizer',
          percentPosition: true,
          stagger: 30,
          // nicer reveal transition
          visibleStyle: {transform: 'translateY(0)', opacity: 1},
          hiddenStyle: {transform: 'translateY(100px)', opacity: 0}
        });
      },
      _getImages (categoryId) {
        getImages(categoryId).then(res => {
          if (res.code === ERR_OK) {
            this.images = [...res.data];

            this.$nextTick(() => {
              const masonry = this.initMasonry();
              this.initImage(masonry);
            });

            console.log(this.images);
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .grid-container
    max-width: 960px
    margin: 0 auto

  .el-grid
    &.are-images-unloaded
      opacity: 0

  .el-grid:after
    content: ''
    display: block
    clear: both

  .el-grid-sizer
    width: 22%

  .el-grid-gutter-sizer
    width: 4%

  .el-grid-item
    float: left
    position: relative
    width: 22%
    margin-bottom: 20px
    cursor: pointer
    img
      display: block
      width: 100%

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

  .gallery-total
    float: right

  @media (max-width: 768px)
    .el-grid-sizer, .el-grid-item
      width: 46%

    .el-grid-gutter-sizer
      width: 8%

  @media (max-width: 320px)
    .el-grid-sizer, .el-grid-item
      width: 100%

    .el-grid-gutter-sizer
      width: 0
</style>
