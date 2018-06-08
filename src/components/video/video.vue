<template>
  <el-main v-loading="loading">
    <div ref="container" class="el-grid-container">
      <div v-for="item in videos"
           :key="item.id"
           class="el-grid-wrapper">
        <div class="el-grid" @click="selectVideo(item.id)">
          <div class="el-grid__icon">
            <img :src="item.logoPic" :alt="item.name">
          </div>
          <p class="el-grid__title">{{item.name}}</p>
          <p class="el-grid__desc">{{item.fictionSynopsis}}</p>
          <!--<p class="el-grid__meta">-->
          <!--<el-rate-->
          <!--v-model="item.rate"-->
          <!--disabled-->
          <!--show-score-->
          <!--text-color="#ff9900"-->
          <!--score-template="{value}">-->
          <!--</el-rate>-->
          <!--</p>-->
        </div>
      </div>
    </div>
    <router-view></router-view>
  </el-main>
</template>

<script>
  import { getVideos } from '../../api/page';
  import { ERR_OK } from '../../api/config';

  export default {
    name: 'page-video',
    props: {
      categoryId: {
        type: String
      }
    },
    data () {
      return {
        loading: true,
        videos: []
      };
    },
    // watch: {
    //   categoryId (categoryId) {
    //     if (categoryId) {
    //       this._getVideos(this.categoryId);
    //     }
    //   }
    // },
    created () {
      if (!this.categoryId) {
        this.$emit('selectCategory');
      }

      this._getVideos(this.categoryId);
    },
    mounted () {},
    methods: {
      selectVideo (videoId) {
        this.$router.push(`video/${videoId}`);
      },
      _getVideos (categoryId) {
        getVideos(categoryId).then(res => {
          if (res.code === ERR_OK) {
            this.loading = false;

            this.videos = [...res.data];

            console.log(this.videos);
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .el-grid-container
    max-width: 960px
    margin: 0 auto
    font-size: 0

  .el-grid-wrapper
    display: inline-block
    width: 20%
    padding: 0 10px 10px

  .el-grid
    position: relative
    padding-bottom: 8px
    box-shadow: 0 0 5px rgba(0, 0, 0, .5)
    text-align: center
    background: #fff
    cursor: pointer

  .el-grid__icon
    img
      width: 100%

  .el-grid__title
    padding: 8px 16px
    line-height: 20px
    font-size: 16px
    color: $color-text-dark

  .el-grid__desc, .el-grid__meta
    padding: 0 16px
    line-height: 18px
    font-size: 14px
    color: $color-text-light

  .el-grid__desc
    display: -webkit-box
    -webkit-box-orient: vertical
    -webkit-line-clamp: 2
    text-overflow: ellipsis
    overflow: hidden

  @media (max-width: 1200px)
    .el-grid-wrapper
      width: 25%

  @media (max-width: 768px)
    .el-grid-wrapper
      width: 50%

  @media (max-width: 320px)
    .el-grid-wrapper
      width: 100%
</style>
