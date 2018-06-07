<template>
  <el-main v-loading="loading">
    <div class="grid-container">
      <el-row>
        <el-col>
          <div class="el-grid are-images-unloaded">
            <div class="el-grid-sizer"></div>
            <div class="el-grid-gutter-sizer"></div>
            <div v-for="item in imageList" class="el-grid-item">
              <img
                :src="getImagePath(item)" :alt="item">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
  import Masonry from 'masonry-layout';
  import ImagesLoaded from 'imagesloaded';
  import InfiniteScroll from 'infinite-scroll';

  const IMAGE_LIST = [
    'flight-formation.jpg',
    'golden-hour.jpg',
    'contrail.jpg',
    'cat-nose.jpg',
    'drizzle.jpg',
    'look-out.jpg',
    'submerged.jpg',
    'orange-tree.jpg'
  ];

  export default {
    name: 'page-image',
    props: {
      categoryId: {
        type: String
      }
    },
    data () {
      return {
        loading: true,
        imageList: []
      };
    },
    created () {
      this.imageList = [...IMAGE_LIST];
    },
    mounted () {
      this.$nextTick(() => {
        const masonry = this.initMasonry();

        this.initImage(masonry);

        // this.initInfiniteScroll(masonry);
      });
    },
    methods: {
      getImagePath (name) {
        return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/${name}`;
      },
      initInfiniteScroll (masonry) {
        const infiniteScroll = new InfiniteScroll('.el-grid', {
          path: 'http://localhost:8080/#/desktop',
          append: '.el-grid-item',
          outlayer: masonry,
          status: '.page-load-status'
        });

        console.log(infiniteScroll);
      },
      initImage (masonry) {
        const imgLoad = new ImagesLoaded('.el-grid', (instance, image) => {
          this.loading = false;

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
    width: 22%
    margin-bottom: 20px
    img
      display: block
      width: 100%

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
