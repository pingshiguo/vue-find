<template>
  <el-main v-loading="loading">
    <div v-if="" ref="container" class="el-media-container">
      <router-link v-for="item in novelList"
                   :to="'/book/' + item.id"
                   class="el-media-wrapper">
        <div class="el-media">
          <div class="el-media__hd">
            <img :src="item.pic_url" :alt="item.name">
          </div>
          <div class="el-media__bd">
            <h2 class="el-media__title">{{item.name}}</h2>
            <p class="el-media__meta">
              {{item.author}} {{item.tag}} {{item.status}}
            </p>
            <p class="el-media__desc">{{item.intro}}</p>
            <p class="el-media__meta">{{item.font_total}}</p>
          </div>
        </div>
      </router-link>
    </div>
    <router-view></router-view>
  </el-main>
</template>

<script>

  const NOVEL_LIST = [
    {
      id: '122312',
      name: '真武世界',
      author: '蚕茧里的牛',
      intro:
        '卷入了三十三天所有巅峰强者的一场浩劫，人皇与他的对手最终一战，打碎了深渊世界，曾经封镇深渊魔王的神器，一张神秘的紫色卡片，却消失在时空漩涡中，横穿无尽的时空。辽阔的蛮荒，武道文明还处于初始阶段，正在缓',
      pic_url: 'https://qidian.qpic.cn/qdbimg/349573/3621897/150',
      status: '连载中',
      tag: '玄幻 东方玄幻',
      font_total: '365.28万字'
    },
    {
      id: '12233',
      name: '真武世界',
      author: '蚕茧里的牛',
      intro:
        '卷入了三十三天所有巅峰强者的一场浩劫，人皇与他的对手最终一战，打碎了深渊世界，曾经封镇深渊魔王的神器，一张神秘的紫色卡片，却消失在时空漩涡中，横穿无尽的时空。辽阔的蛮荒，武道文明还处于初始阶段，正在缓',
      pic_url: 'https://qidian.qpic.cn/qdbimg/349573/3621897/150',
      status: '连载中',
      tag: '玄幻 东方玄幻',
      font_total: '365.28万字'
    },
    {
      id: '1223268',
      name: '真武世界',
      author: '蚕茧里的牛',
      intro:
        '卷入了三十三天所有巅峰强者的一场浩劫，人皇与他的对手最终一战，打碎了深渊世界，曾经封镇深渊魔王的神器，一张神秘的紫色卡片，却消失在时空漩涡中，横穿无尽的时空。辽阔的蛮荒，武道文明还处于初始阶段，正在缓',
      pic_url: 'https://qidian.qpic.cn/qdbimg/349573/3621897/150',
      status: '连载中',
      tag: '玄幻 东方玄幻',
      font_total: '365.28万字'
    }
  ];

  export default {
    name: 'page-book',
    props: {
      categoryId: {
        type: String
      }
    },
    data () {
      return {
        loading: true,
        novelList: [],
        isPullUpLoading: false,
        triggerDistance: 200
      };
    },
    created () {
      this.novelList = [...NOVEL_LIST];
      this.novelList.push(...NOVEL_LIST);
      this.novelList.push(...NOVEL_LIST);
    },
    mounted () {
      this.loading = false;

      window.addEventListener('scroll', this.initOnScrollEnd, true);
    },
    methods: {
      initOnScrollEnd () {
        console.log('start');
        let distance = this.$refs.container.getBoundingClientRect().bottom -
          window.innerHeight;

        if (!this.isPullUpLoading && distance <= this.triggerDistance) {
          this.isPullUpLoading = true;

          if (this.timeout) clearTimeout(this.timeout);

          this.timeout = setTimeout(() => {
            this.novelList.push(...NOVEL_LIST);
            this.isPullUpLoading = false;
            console.log('scroll event');
            console.log('end');
          }, 20);
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .el-media-container
    max-width: 960px
    margin: 0 auto
    .el-media-wrapper
      display: inline-block
      width: 50%
      padding: 16px
      .el-media
        display: flex
        align-items: center
        background: #fff
        .el-media__hd
          flex: 0 0 100px
          width: 100px
          margin-right: 16px
          img
            width: 100%
        .el-media__bd
          flex: 1
          min-width: 0
          .el-media__title
            margin-bottom: 8px
            line-height: 24px
            font-size: 18px
            color: #333
          .el-media__desc
            margin: 8px 0
            line-height: 20px
            font-size: 16px
            color: #666
            display: -webkit-box
            overflow: hidden
            text-overflow: ellipsis
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
          .el-media__meta
            line-height: 16px
            font-size: 14px
            color: #999

  @media (max-width: 768px)
    .el-media-container
      .el-media-wrapper
        width: 100%
</style>
