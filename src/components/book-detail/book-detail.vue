<template>
  <div v-loading="loading" class="book-detail">
    <div class="book__hd"></div>
    <div class="book__bd">
      <div class="media">
        <div class="media__hd">
          <img :src="book.logoPics"
               class="media__thumb" alt="">
        </div>
        <div class="media__bd">
          <h2 class="media__title">{{book.name}} <span>{{book.author}} 著</span>
          </h2>
          <p class="book__tags">
            <el-tag size="medium" color="white">连载</el-tag>
            <el-tag size="medium" color="white">签约</el-tag>
            <el-tag size="medium" color="white">仙侠</el-tag>
            <el-tag size="medium" color="white">神话修真</el-tag>
          </p>
          <p class="media__meta">
            97.98万字|2139.89万总点击·会员周点击58.54万|678.8万总推荐·周10.26万
          </p>
          <div class="btn-area">
            <router-link :to="'/reading/' + bookId" class="btn">
              免费试读
            </router-link>
          </div>
        </div>
      </div>

      <h2 class="book__title">作品信息</h2>
      <p class="book__intro">
        {{book.fictionSynopsis}}
      </p>

      <h2 class="book__title">章节目录</h2>
      <div class="catalog-container">
        <div class="book__catalog">
          <!--<h2 class="catalog__title">作品相关·共2章</h2>-->
          <ul class="catalog-list">
            <li v-for="item in catalogList"
                :key="item.id"
                class="catalog-list__item"
                @click="selectItem(item.id)">
              {{item.title}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getBook } from '../../api/page';
  import { ERR_OK } from '../../api/config';

  export default {
    name: 'book-detail',
    props: {
      bookId: {
        type: String
      }
    },
    data () {
      return {
        loading: true,
        book: {
          parentId: -1,
          id: -1,
          name: '',
          author: '',
          fictionSynopsis: '',
          logoPic: ''
        },
        catalogList: []
      };
    },
    created () {
      this._getBook(Number(this.bookId));
    },
    methods: {
      selectItem (catalogId) {
        this.$router.push(`/reading/${this.bookId}/${catalogId}`);
      },
      _getBook (bookId) {
        getBook(bookId).then(res => {
          if (res.code === ERR_OK) {
            this.loading = false;
            Object.assign(this.book, res.data[0]);
            this.catalogList = [...res.data];
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .book-detail
    position: absolute
    top: 60px
    right: 0
    left: 0
    bottom: 0
    z-index: 100
    padding: 20px
    overflow: auto
    -webkit-overflow-scrolling: touch
    background: #f6f6f6

  .book__bd
    max-width: 960px
    margin: 0 auto

  .media
    display: flex
    flex-wrap: wrap
    padding: 20px
    background: #fff

  .media__hd
    flex: 0 0 144px
    width: 144px
    margin-right: 20px

  .media__bd
    flex: 1
    min-width: 0

  .media__thumb
    width: 100%

  .media__title, .media__desc, .media__meta, .book__tags
    margin-bottom: 12px

  .media__title
    line-height: 38px
    font-size: 28px
    color: #333
    span
      display: inline-block
      margin-left: 20px
      font-size: 14px
      font-weight: 400

  .media__desc
    line-height: 20px
    font-size: 14px
    color: #666

  .media__meta
    line-height: 16px
    font-size: 12px
    color: #999

  .btn
    display: inline-block
    width: 120px
    line-height: 36px
    text-align: center
    font-size: 14px
    font-weight: 300
    color: #fff
    background: #bf2c24
    &:hover
      background: #ed4259

  .book__title
    padding: 0 20px
    margin-top: 20px
    line-height: 40px
    font-size: 18px
    color: #999
    border-bottom: 1px solid #f1f1f1
    background: #fff

  .book__intro
    padding: 20px
    line-height: 28px
    font-size: 14px
    word-wrap: break-word
    word-break: break-all
    color: #666
    background: #fff

  .catalog-container
    padding: 20px 0
    background: #fff

  .book__catalog
    padding: 0 20px
    &:not(:first-child)
      margin-top: 20px

  .catalog__title
    border-bottom: 1px solid #f1f1f1
    line-height: 36px
    font-size: 16px
    color: #666

  .catalog-list
    font-size: 0

  .catalog-list__item
    display: inline-block
    width: 33.33%
    border-bottom: 1px solid #f1f1f1
    line-height: 32px
    font-size: 14px
    color: #666
    cursor: pointer
</style>
