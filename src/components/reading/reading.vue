<template>
  <div class="reading">
    <div class="reading__hd">
      <go-back></go-back>
    </div>

    <div class="reading__bd">
      <div class="reading-banner">
        <div class="swiper-container reading-swiper">
          <div class="swiper-wrapper">
            <a v-for="item in banners"
               :key="item.id"
               :href="item.hyperlink"
               class="swiper-slide">
              <img
                :src="item.resource"
                :title="item.title"
                :alt="item.title">
            </a>
          </div>
        </div>
      </div>

      <!--<div v-if="book.content.sort === 1" class="reading__cover">-->
      <!--<div class="cover">-->
      <!--<div class="cover__hd">-->
      <!--<img :src="book.logo" class="cover__thumb">-->
      <!--</div>-->
      <!--<h2 class="cover__title">{{book.name}}</h2>-->
      <!--<p class="cover__meta">{{book.author}} 著</p>-->
      <!--<p class="cover__desc">-->
      <!--{{book.desc}}-->
      <!--</p>-->
      <!--</div>-->
      <!--</div>-->

      <div v-if="bookContent.content" class="reading__text">
        <h2 class="title">{{bookContent.title}}</h2>
        <div class="content" v-html="bookContent.content"></div>
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

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import GoBack from '../../base/go-back/go-back';

  export default {
    name: 'reading',
    components: {GoBack},
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
          logo: ''
        },
        bookContent: {
          id: '',
          title: '',
          content: ''
        },
        banners: []
      };
    },
    watch: {
      bookId (bookId) {
        if (bookId && this.catalogId) {
          // this._getBook(bookId);
          this._getBookCatalog(this.catalogId);
        }
      },
      catalogId (catalogId) {
        if (this.bookId && catalogId) {
          // this._getBook(this.bookId);
          this._getBookCatalog(catalogId);
        }
      }
    },
    created () {

    },
    mounted () {
      // this._getBook(this.bookId);
      this._getBookCatalog(this.catalogId);
    },
    methods: {
      initSwiper (swiperId, len, speed = 300) {
        return new Swiper(swiperId, {
          speed,
          loop: true,
          autoplay: true,
          loopedSlides: len,
          slidesPerView: 'auto'
        });
      },
      scrollTop () {
        document.querySelector('.reading').scrollTop = 0;
      },
      goNext () {
        this._goNext(this.bookId, this.bookContent.id);
        this.scrollTop();
      },
      goPre () {
        this._goPre(this.bookId, this.bookContent.id);
        this.scrollTop();
      },
      _goNext (bookId, catalogId) {
        goNextCatalog(bookId, catalogId).then(res => {
          if (res.code === ERR_OK) {
            Object.assign(this.bookContent, {
              id: res.data.items.id,
              title: res.data.items.title,
              content: res.data.items.resource
            });

            this.$router.push(`/reading/${this.bookId}/${this.bookContent.id}`);
          } else {
            window.alert(res.msg);
          }
        });
      },
      _goPre (bookId, catalogId) {
        goPreCatalog(bookId, catalogId).then(res => {
          if (res.code === ERR_OK) {
            Object.assign(this.bookContent, {
              id: res.data.items.id,
              title: res.data.items.title,
              content: res.data.items.resource
            });

            this.$router.push(`/reading/${this.bookId}/${this.bookContent.id}`);
          } else {
            window.alert(res.msg);
          }
        });
      },
      _getBookCatalog (catalogId) {
        getBookCatalog(catalogId).then(res => {
          if (res.code === ERR_OK) {
            Object.assign(this.bookContent, {
              id: res.data.items.id,
              title: res.data.items.title,
              content: res.data.items.resource
            });

            this.banners = [...res.data.ad];
            this.$nextTick(() => {
              this.initSwiper('.reading-swiper', this.banners.length, this.banners[0].timeSpeed);
            });
          }
        });
      },
      _getBook (bookId) {
        getBook(bookId).then(res => {
          if (res.code === ERR_OK) {
            Object.assign(this.book, {
              name: res.data.items.name,
              author: res.data.items.author,
              desc: res.data.items.fictionSynopsis,
              logo: res.data.items.logoPics
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

  .reading__hd
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 200
    display: none
    height: 45px

  .reading__bd
    max-width: 960px
    margin: 0 auto

  .reading-banner
    margin-bottom: 20px
    .reading-swiper
      width: 100%
      .swiper-slide
        width: 220px
        margin: 0 10px
        img
          width: 220px

  .reading__cover
    min-height: 600px
    margin-bottom: 24px
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
    padding: 0 16px
    line-height: 26px
    font-size: 16px
    color: #666

  .cover__meta
    margin-bottom: 8px
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
      text-indent: 2em
      p
        margin: 16px 0

  .reading__control
    display: flex
    align-items: center
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

  @media (max-width: 768px)
    .reading
      padding-top: 45px

    .reading__hd
      display: block

    .reading__text
      padding: 16px

    .reading__control
      .btn
        line-height: 40px
</style>
