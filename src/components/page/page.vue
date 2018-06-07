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
            <el-col :xs="18" :sm="12">
              <div class="nav">
                <router-link v-for="(item, index) in navMenuList"
                             :to="getPath(index)"
                             class="nav__item">
                  {{item.name}}
                </router-link>
              </div>
            </el-col>
            <el-col :sm="8">
              <el-input
                placeholder="搜索电影、小说">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <div v-if="categoryItems.length > 0" class="tab-wrapper">
        <div class="tab">
          <router-link v-for="item in categoryItems"
                       :to="getCategoryPath(item.id)"
                       class="tab__item">
            {{item.name}}
          </router-link>
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

  const NAV_MENU_LIST = [
    {
      'items': [
        {
          'createTime': '',
          'id': 2,
          'name': '壁纸类',
          'pid': 1,
          'pids': '[0],[1],',
          'sort': 2
        }, {
          'createTime': '',
          'id': 3,
          'name': '头像类',
          'pid': 1,
          'pids': '[0],[1],',
          'sort': 3
        }
      ],
      'name': '图片',
      'pid': 0,
      'sort': 1
    },
    {
      'items': [
        {
          'createTime': '',
          'id': 5,
          'name': '科幻',
          'pid': 4,
          'pids': '[0],[4],',
          'sort': 5
        }
      ],
      'name':
        '视频',
      'pid': 0,
      'sort': 4
    },
    {
      'items': [
        {
          'createTime': '2018-06-04 09:53:43',
          'id': 11,
          'name': '斗破苍穹',
          'pid': 10,
          'pids': '[0],[10],',
          'sort': 8
        }, {
          'createTime': '2018-06-04 14:05:05',
          'id': 12,
          'name': '盗墓笔记',
          'pid': 10,
          'pids': '[0],[10],',
          'sort': 1
        }
      ],
      'name': '小说',
      'pid': 0,
      'sort': 7
    }
  ];
  const ROUTER_MAP = [
    '/image',
    '/video',
    '/book'
  ];

  export default {
    name: 'page',
    data () {
      return {
        navMenuList: []
      };
    },
    computed: {
      categoryItems () {
        if (this.navMenuList.length === 0) {
          return [];
        }

        let path = this.$route.path.split('/');
        let routerIndex = -1;

        if (path.length > 2) {
          routerIndex = ROUTER_MAP.indexOf('/' + path[1]);
        } else {
          routerIndex = ROUTER_MAP.indexOf(this.$route.path);
        }

        if (routerIndex === -1) {
          return [];
        }

        return [...this.navMenuList[routerIndex]['items']];
      }
    },
    created () {
      // this.navMenuList = [...NAV_MENU_LIST];
      this._getPageInfo();
    },
    methods: {
      getCategoryPath (id) {
        let path = this.$route.path.split('/')[1];
        return `/${path}/category/${id}`;
      },
      getPath (index) {
        return ROUTER_MAP[index];
      },
      _getPageInfo () {
        getPageInfo().then(res => {
          if (res.code === ERR_OK) {
            this.navMenuList = [...res.data];
            console.log(res.data);
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

  @media (max-width: 768px)
    .logo
      font-size: 18px

    .el-input
      display: none

    .tab
      flex-wrap: nowrap
</style>
