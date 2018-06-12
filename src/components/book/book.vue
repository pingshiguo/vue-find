<template>
  <el-main>
    <div
      class="search-wrapper"
      @keyup.enter="search">
      <el-input
        placeholder="搜索小说"
        :clearable="true"
        v-model.lazy.trim="searchValue"
        class="input-with-select">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search">
        </el-button>
      </el-input>
    </div>

    <transition-group
      name="slide-up"
      tag="div"
      class="media-container">
      <div
        v-for="item in books"
        :key="item.id"
        class="media-wrapper"
        @click="selectBook(item.id)">
        <div class="media">
          <div class="media__hd">
            <img :src="item.logoPic" :alt="item.name">
          </div>
          <div class="media__bd">
            <h2 class="media__title">{{item.name}}</h2>
            <p class="media__meta">
              {{item.author}} {{item.tag}} {{item.statusName}}
            </p>
            <p class="media__desc">{{item.fictionSynopsis}}</p>
            <p class="media__meta">{{item.font_total}}</p>
          </div>
        </div>

        <div v-if="banners" class="book-banner">
          <div class="swiper-container book-swiper"
               :class="'book-swiper-' + item.id">
            <div class="swiper-wrapper">
              <div v-for="banner in banners"
                   :key="banner.id"
                   class="swiper-slide">
                <a :href="banner.hyperlink"
                   :style="getBannerStyle(banner.color)"
                   v-html="banner.resource"></a>
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
  import { getBooks, searchBooks } from '../../api/page';
  import { ERR_OK } from '../../api/config';
  import { getRouterId } from '../../common/js/config';

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    name: 'page-book',
    props: {
      categoryId: {
        type: String
      }
    },
    data () {
      return {
        books: [],
        banners: [],
        searchValue: '',
        temBooks: []
      };
    },
    computed: {
      routerId () {
        let path = this.$route.path.split('/')[1];
        return getRouterId(path);
      }
    },
    watch: {
      categoryId (categoryId) {
        if (categoryId) {
          this._getBooks(categoryId);
        }
      },
      searchValue (value) {
        if (value.length > 0) return;

        if (this.temBooks.length > 0) {
          this.books = [...this.temBooks];
        } else {
          this.books = [];
        }
      }
    },
    created () {
      if (this.categoryId) {
        this._getBooks(this.categoryId);
      }
    },
    mounted () {},
    methods: {
      getBannerStyle (color) {
        return `color: ${color};`;
      },
      search () {
        if (!this.searchValue) {
          return;
        }

        this._searchBooks(this.searchValue);
      },
      initSwiper (swiperId, speed = 300) {
        return new Swiper(swiperId, {
          direction: 'vertical',
          speed,
          loop: true,
          autoplay: true,
          observer: true,
          observeParents: true
        });
      },
      selectBook (bookId) {
        this.$router.push({
          path: `/book/${this.categoryId}/${bookId}`
        });
      },
      _searchBooks (value) {
        searchBooks(value, this.routerId).then(res => {
          if (res.code === ERR_OK) {
            this.books = res.data.items;
          }
        });
      },
      _getBooks (categoryId) {
        getBooks(categoryId).then(res => {
          if (res.code === ERR_OK) {
            this.books = [...res.data.items];
            this.temBooks = [...res.data.items];
            this.banners = [...res.data.ad];

            this.$nextTick(() => {
              for (let item of res.data.items) {
                this.initSwiper(`.book-swiper-${item.id}`, this.banners[0].timeSpeed);
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

  .media-container
    max-width: 960px
    margin: 0 auto
    .media-wrapper
      display: inline-block
      width: 50%
      padding: 8px
      .media
        display: flex
        align-items: center
        background: #fff
        cursor: pointer
        .media__hd
          flex: 0 0 100px
          width: 100px
          margin-right: 16px
          perspective: 800px
          img
            width: 100%
            &:hover
              transition: transform .3s ease-in-out
              transform-origin: 0 100%
              transform: rotateY(-25deg)
        .media__bd
          flex: 1
          min-width: 0
          .media__title
            margin-bottom: 8px
            line-height: 24px
            font-size: 18px
            color: #333
          .media__desc
            margin: 8px 0
            line-height: 20px
            font-size: 16px
            color: #666
            display: -webkit-box
            overflow: hidden
            text-overflow: ellipsis
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
          .media__meta
            line-height: 16px
            font-size: 14px
            color: #999

  .book-banner
    padding: 4px 8px
    .book-swiper
      height: 36px
      overflow: hidden
      .swiper-slide
        a
          width: 100%
          line-height: 18px
          font-size: 12px
          color: #666
          word-break: break-word
          text-overflow: ellipsis
          overflow: hidden
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2

  @media (max-width: 768px)
    .media-container
      .media-wrapper
        width: 100%
</style>
