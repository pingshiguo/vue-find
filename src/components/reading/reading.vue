<template>
  <div class="reading">
    <div class="reading__hd"></div>
    <div class="reading__bd">
      <div class="reading__cover">
        <div class="cover">
          <div class="cover__hd">
            <img :src="book.logo" class="cover__thumb">
          </div>
          <h2 class="cover__title">{{book.name}}</h2>
          <p class="cover__meta">{{book.author}} 著</p>
          <p class="cover__desc">
            {{book.desc}}
          </p>
        </div>
      </div>
      <div v-if="book.content.content" class="reading__text">
        <h2 class="title">{{book.content.title}}</h2>
        <div class="content">
          {{book.content.content}}
        </div>
      </div>

      <div class="reading__control">
        <a href="javascript:;" class="btn" @click="goPre">上一章</a>
        <!--<a href="javascript:;" class="btn">目录</a>-->
        <a href="javascript:;" class="btn" @click="goNext">下一章</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getBook,
    getBookCatalog,
    goPreCatalog,
    goNextCatalog
  } from '../../api/page';
  import { ERR_OK } from '../../api/config';

  export default {
    name: 'reading',
    props: {
      bookId: {
        type: String
      },
      catalogId: {
        type: String
      }
    },
    data () {
      return {
        book: {
          name: '',
          author: '',
          desc: '',
          logo: '',
          content: {
            title: '',
            content: ''
          }
        }
      };
    },
    mounted () {
      this._getBook(this.bookId);
      this._getBookCatalog(this.catalogId);
    },
    methods: {
      goNext () {
        this._goNext(this.bookId, this.catalogId);
      },
      goPre () {
        this._goPre(this.bookId, this.catalogId);
      },
      _goNext (bookId, catalogId) {
        goNextCatalog(bookId, catalogId).then(res => {
          if (res.code === ERR_OK) {

          }
        });
      },
      _goPre (bookId, catalogId) {
        goPreCatalog(bookId, catalogId).then(res => {
          if (res.code === ERR_OK) {

          }
        });
      },
      _getBookCatalog (catalogId) {
        getBookCatalog(catalogId).then(res => {
          if (res.code === ERR_OK) {
            Object.assign(this.book.content, {
              title: res.data.title,
              content: res.data.resource
            });
          }
        });
      },
      _getBook (bookId) {
        getBook(bookId).then(res => {
          if (res.code === ERR_OK) {
            Object.assign(this.book, {
              name: res.data[0].name,
              author: res.data[0].author,
              desc: res.data[0].fictionSynopsis,
              logo: res.data[0].logoPics
            });
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .reading
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom: 0
    z-index: 100
    padding: 20px
    overflow: auto
    -webkit-overflow-scrolling: touch
    background: #e5e4db

  .reading__bd
    max-width: 960px
    margin: 0 auto

  .reading__cover
    min-height: 600px
    margin: 60px 0 24px
    border: 1px solid #d8d8d8
    background: #f7f5e9

  .cover
    min-height: 584px
    margin: 8px
    border: 1px solid #d8d8d8
    text-align: center

  .cover__hd
    display: inline-block
    margin: 64px auto 24px
    border: 1px solid #d8d8d8

  .cover__thumb
    width: 120px
    height: 160px
    margin: 4px
    vertical-align: middle
    filter: grayscale(100%)

  .cover__title
    margin-bottom: 8px
    line-height: 45px
    font-size: 32px
    font-weight: 300
    color: #333

  .cover__desc
    margin-bottom: 8px
    line-height: 26px
    font-size: 16px
    color: #666

  .cover__meta
    margin-bottom: 48px
    line-height: 26px
    font-size: 14px
    color: #999

  .reading__text
    padding: 60px 64px
    margin-bottom: 24px
    border: 1px solid #d8d8d8
    color: #262626
    background: #f7f5e9
    .title
      line-height: 32px
      font-size: 24px
      font-weight: 400
      margin-bottom: 24px
    .content
      line-height: 1.8
      font-size: 18px
      p
        margin: 16px 0

  .reading__control
    display: flex
    align-items: center
    margin-bottom: 24px
    border: 1px solid #d8d8d8
    background: #f7f5e9
    .btn
      position: relative
      flex: 1
      display: inline-block
      line-height: 68px
      text-align: center
      font-size: 18px
      color: #333
      &:hover
        background: rgba(0, 0, 0, .03)
      &:not(:first-child)
        border-left: 1px solid #d8d8d8

</style>
