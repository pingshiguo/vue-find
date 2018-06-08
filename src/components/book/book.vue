<template>
  <el-main v-loading="loading">
    <div v-if="books.length > 0" ref="container" class="el-media-container">
      <div v-for="item in books"
           :key="item.id"
           class="el-media-wrapper"
           @click="selectBook(item.id)">
        <div class="el-media">
          <div class="el-media__hd">
            <img :src="item.logoPic" :alt="item.name">
          </div>
          <div class="el-media__bd">
            <h2 class="el-media__title">{{item.name}}</h2>
            <p class="el-media__meta">
              {{item.author}} {{item.tag}} {{item.statusName}}
            </p>
            <p class="el-media__desc">{{item.fictionSynopsis}}</p>
            <p class="el-media__meta">{{item.font_total}}</p>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </el-main>
</template>

<script>
  import { getBooks } from '../../api/page';
  import { ERR_OK } from '../../api/config';

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
        books: [],
        isPullUpLoading: false,
        triggerDistance: 200
      };
    },
    // watch: {
    //   categoryId (categoryId) {
    //     if (categoryId !== '') {
    //       this._getBooks(categoryId);
    //     }
    //   }
    // },
    created () {
      if (!this.categoryId) {
        this.$emit('selectCategory');
      }

      this._getBooks(this.categoryId);
    },
    mounted () {},
    methods: {
      selectBook (bookId) {
        this.$router.push({
          path: `/book/${bookId}`
        });
      },
      _getBooks (categoryId) {
        getBooks(categoryId).then(res => {
          if (res.code === ERR_OK) {
            this.loading = false;

            this.books = [...res.data];

            console.log(this.books);
          }
        });
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
        cursor: pointer
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
