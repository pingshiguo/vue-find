<template>
  <el-main v-loading="loading">
    <div ref="container" class="el-grid-container">
      <div v-for="item in videoList" class="el-grid-wrapper">
        <div class="el-grid">
          <div class="el-grid__icon">
            <img :src="item.pic_url" alt="">
          </div>
          <p class="el-grid__title">{{item.name}}</p>
          <!--<p class="el-grid__desc">虎妈猫爸择校大战</p>-->
          <p class="el-grid__meta">
            <el-rate
              v-model="item.rate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </p>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
  const VIDEO_LIST = [
    {
      'name': '超时空同居',
      'rate': 3.5,
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'rate': 3.5,
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'rate': 3.5,
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'rate': 3.5,
      'pic_url': require('../../assets/p2520331478.jpg')
    },
    {
      'name': '超时空同居',
      'rate': 3.5,
      'pic_url': require('../../assets/p2520331478.jpg')
    }
  ];

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
        videoList: [],
        isPullUpLoading: false,
        triggerDistance: 200
      };
    },
    created () {
      this.videoList = [...VIDEO_LIST];
      this.videoList.push(...VIDEO_LIST);
      this.videoList.push(...VIDEO_LIST);
    },
    mounted () {
      this.loading = false;

      window.addEventListener('scroll', this.initOnScrollEnd, true);
    },
    methods: {
      initOnScrollEnd () {
        let distance = this.$refs.container.getBoundingClientRect().bottom -
          window.innerHeight;

        if (!this.isPullUpLoading && distance <= this.triggerDistance) {
          this.isPullUpLoading = true;

          setTimeout(() => {
            this.videoList.push(...VIDEO_LIST);
            this.isPullUpLoading = false;
            console.log('scroll event');
          }, 20);
        }
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
    text-align: center
    background: #fff

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
