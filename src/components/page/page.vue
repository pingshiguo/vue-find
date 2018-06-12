<template>
  <div class="container-wrapper">
    <el-container>
      <el-header>
        <div class="header-content">
          <el-row :gutter="20">
            <el-col :xs="6" :sm="4">
              <router-link to="/" class="logo-wrapper">
                <h1 class="logo">发现</h1>
              </router-link>
            </el-col>
            <el-col :xs="18" :sm="20">
              <div class="nav">
                <router-link v-for="item in pageInfo"
                             :key="item.id"
                             :to="getRouterPath(item.id)"
                             class="nav__item">
                  {{item.name}}
                </router-link>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <div v-if="getCategory(pageInfo).length > 0" class="tab-wrapper">
        <div class="tab">
          <div v-for="item in getCategory(pageInfo)"
               :key="item.id"
               class="tab__item"
               :class="getTabStyle(item.id)"
               @click="selectCategory(item.id)">
            {{item.name}}
          </div>
        </div>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-container>
  </div>
</template>

<script>
  import { getPageInfo } from '../../api/page';
  import { ERR_OK } from '../../api/config';

  const ROUTER_MAP = new Map([
    ['image', 1],
    ['video', 4],
    ['book', 10],
    ['test', 56]
  ]);

  export default {
    name: 'page',
    data () {
      return {
        pageInfo: [],
        category: []
      };
    },
    computed: {
      categoryId () {
        let path = this.$route.path.split('/');

        if (path.length > 2) {
          return Number(path[2]);
        } else {
          return '';
        }
      }
    },
    watch: {
      category (category) {
        if (this.$route.path === '/image' || this.$route.path === '/video' ||
          this.$route.path === '/book') {
          if (!this.categoryId) {
            this.$router.replace(`${this.$route.path}/${category[0].id}`);
          }
        }
      }
    },
    created () {
      this._getPageInfo();
    },
    mounted () {},
    methods: {
      selectCategory (categoryId) {
        let path = this.$route.path.split('/')[1];
        this.$router.push(`/${path}/${categoryId}`);
      },
      getTabStyle (categoryId) {
        if (this.categoryId === categoryId) {
          return 'active';
        }

        return '';
      },
      getRouterPath (routerId) {
        for (let key of ROUTER_MAP.keys()) {
          if (ROUTER_MAP.get(key) === routerId) {
            return `/${key}`;
          }
        }
      },
      getRouterId (path) {
        return ROUTER_MAP.get(path);
      },
      getCategory (data) {
        let path = this.$route.path.split('/')[1];
        let routerId = this.getRouterId(path);

        for (let item of data) {
          if (item.id === routerId) {
            this.category = [...item.items];
            return item.items;
          }
        }

        return [];
      },
      _getPageInfo () {
        getPageInfo().then(res => {
          if (res.code === ERR_OK) {
            this.pageInfo = [...res.data];

            console.log(this.pageInfo);
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .container-wrapper
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    overflow: auto

  .el-container
    height: 100%

  .el-header
    padding-top: 10px
    padding-bottom: 10px
    border-bottom: 1px solid #f1f1f1
    background: #fff

  .header-content
    max-width: 960px
    margin: 0 auto

  .logo-wrapper
    display: inline-block

  .logo
    line-height: 40px
    color: $color-text-dark

  .nav
    display: flex

  .nav__item, .tab__item
    display: inline-block
    text-align: center
    color: #999
    background: #fff
    &.router-link-active
      color: #333

  .nav__item
    padding: 0 16px
    line-height: 40px

  .tab-wrapper
    width: 100%
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
    background: #fff

  .tab
    display: flex
    flex-wrap: wrap
    max-width: 960px
    margin: 0 auto
    overflow-x: scroll

  .tab__item
    flex-shrink: 0
    padding: 0 8px
    line-height: 36px
    font-size: 14px
    cursor: pointer
    &.active
      color: #333

  @media (max-width: 768px)
    .logo
      font-size: 18px

    .el-input
      display: none

    .tab
      flex-wrap: nowrap
</style>
