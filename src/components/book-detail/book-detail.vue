<template>
  <div class="book-detail">
    <div class="book__hd"></div>
    <div class="book__bd">
      <div class="media">
        <div class="media__hd">
          <img src="https://qidian.qpic.cn/qdbimg/349573/1010734492/180"
               class="media__thumb" alt="">
        </div>
        <div class="media__bd">
          <h2 class="media__title">凡人修仙之仙界篇 <span>忘语 著</span></h2>
          <p class="book__tags">
            <el-tag size="medium" color="white">连载</el-tag>
            <el-tag size="medium" color="white">签约</el-tag>
            <el-tag size="medium" color="white">VIP</el-tag>
            <el-tag size="medium" color="white">仙侠</el-tag>
            <el-tag size="medium" color="white">神话修真</el-tag>
          </p>
          <p class="media__desc">
            修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！
          </p>
          <p class="media__meta">
            97.98万字|2139.89万总点击·会员周点击58.54万|678.8万总推荐·周10.26万
          </p>
          <div class="btn-area">
            <router-link to="/reading/12345678901" class="btn">
              免费试读
            </router-link>
          </div>
        </div>
      </div>

      <h2 class="book__title">作品信息</h2>
      <p class="book__intro">
        凡人修仙，风云再起<br>
        时空穿梭，轮回逆转<br>
        金仙太乙，大罗道祖<br>
        三千大道，法则至尊<br>
        《凡人修仙传》仙界篇，一个韩立叱咤仙界的故事，一个凡人小子修仙的不灭传说。<br>
        特说明下，没有看过前传的书友，并不影响本书的阅读体验，但感兴趣的书友，也可以先去看看《凡人修仙传》，再来看本书哦。
      </p>

      <h2 class="book__title">章节目录</h2>
      <div class="catalog-container">
        <div class="book__catalog">
          <h2 class="catalog__title">作品相关·共2章</h2>
          <ul class="catalog-list">
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
          </ul>
        </div>
        <div class="book__catalog">
          <h2 class="catalog__title">重回仙界·共2章</h2>
          <ul class="catalog-list">
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
          </ul>
        </div>
        <div class="book__catalog">
          <h2 class="catalog__title">重回仙界·共2章</h2>
          <ul class="catalog-list">
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
            <li class="catalog-list__item">第一章 狐女</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'book-detail',
    props: {
      bookId: {
        type: String
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
</style>
