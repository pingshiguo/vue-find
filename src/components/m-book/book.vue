<template>
  <transition name="slide-in">
    <div class="book ignore">
      <div class="book__hd flex flex_middle">
        <go-back></go-back>
        <h1 class="book__title">人性的因素</h1>
      </div>
      <div class="book__bd">
        <div class="media-box flex">
          <div class="media-box__hd">
            <img src="../../assets/s29588731.jpg" alt=""
                 class="media-box__thumb">
          </div>
          <div class="media-box__bd flex__item">
            <h2 class="media-box__title">人性的因素</h2>
            <p class="media-box__desc"><span>8.8</span></p>
            <p class="media-box__meta">[英] 毛姆/理想国丨广西师范大学出版社/2018-3</p>
          </div>
        </div>
        <div class="btn-area flex">
          <router-link to="/novel/book/1234567890" class="btn flex__item">
            免费试读
          </router-link>
          <a href="javascript:;" class="btn flex__item">加入书架</a>
        </div>
        <div class="subject-intro">
          <h2 class="subject-intro__title">简介</h2>
          <p class="subject-intro__desc">
            ★享受真正地道的文学乐趣，不能错过的英语作家——作为狄更斯以来蕞受欢迎的英语小说家，毛姆深知什么样的故事拥有持久的魅力，在各个时代与阶层始终拥有大量读者。“在给予读者地道的文学趣味这个层面，很少有作家能比毛姆做得更好”（尼古拉斯·莎士比亚）。<br>.<br>★豆瓣评选2018年最令人期待新书，“英语文学中最好的短篇故事”，口碑译本第2卷全新上市——译自毛姆亲自作序的“标准定本”，为国内仅见的独译版。全集第1卷《爱德华·巴纳德的堕落》（2016）入选单向街书店文学奖“年度文学翻译”、豆瓣年度最佳短篇小说集。“给毛姆半页的时间，你就已经进入那个故事，不想离开。”<br>.<br>威廉•萨默塞特•毛姆（W.
            Somerset
            Maugham，1874—1965），英国著名小说家、剧作家、短篇小说作家。马尔克斯将毛姆列为最钟爱的作者之一。奥威尔称毛姆是“影响我最大的现代作家，我深深地钦佩他摒除虚饰讲述故事的能力”。<br>短篇小说在毛姆的创作中占有重要地位，安东尼•伯吉斯就曾评价他写下了“英语文学中最好的短篇故事”。《人性的枷锁》《刀锋》等长篇小说使毛姆名闻世界，而他的短篇则以编织故事的精湛技巧，对人性和社会生活的敏锐洞察，为其赢得了更多读者，成为一种全球现象。<br>1951年，毛姆出版四卷本短篇小说全集，共收录91个故事，并亲自确定篇目和顺序，为每一卷撰写序言。1963年企鹅出版社在此基础上推出新版，自此被认作标准定本，多次重版。本书即译自2002年企鹅版全集。<br>毛姆作品中文译本繁多，短篇小说多以精选集形式出版。本次计划推出的《毛姆短篇小说全集》（四卷本）将以精彩译文再现毛姆短篇作品的全貌。本书为第二卷。
          </p>
          <p class="subject-intro__desc">
            ★享受真正地道的文学乐趣，不能错过的英语作家——作为狄更斯以来蕞受欢迎的英语小说家，毛姆深知什么样的故事拥有持久的魅力，在各个时代与阶层始终拥有大量读者。“在给予读者地道的文学趣味这个层面，很少有作家能比毛姆做得更好”（尼古拉斯·莎士比亚）。<br>.<br>★豆瓣评选2018年最令人期待新书，“英语文学中最好的短篇故事”，口碑译本第2卷全新上市——译自毛姆亲自作序的“标准定本”，为国内仅见的独译版。全集第1卷《爱德华·巴纳德的堕落》（2016）入选单向街书店文学奖“年度文学翻译”、豆瓣年度最佳短篇小说集。“给毛姆半页的时间，你就已经进入那个故事，不想离开。”<br>.<br>威廉•萨默塞特•毛姆（W.
            Somerset
            Maugham，1874—1965），英国著名小说家、剧作家、短篇小说作家。马尔克斯将毛姆列为最钟爱的作者之一。奥威尔称毛姆是“影响我最大的现代作家，我深深地钦佩他摒除虚饰讲述故事的能力”。<br>短篇小说在毛姆的创作中占有重要地位，安东尼•伯吉斯就曾评价他写下了“英语文学中最好的短篇故事”。《人性的枷锁》《刀锋》等长篇小说使毛姆名闻世界，而他的短篇则以编织故事的精湛技巧，对人性和社会生活的敏锐洞察，为其赢得了更多读者，成为一种全球现象。<br>1951年，毛姆出版四卷本短篇小说全集，共收录91个故事，并亲自确定篇目和顺序，为每一卷撰写序言。1963年企鹅出版社在此基础上推出新版，自此被认作标准定本，多次重版。本书即译自2002年企鹅版全集。<br>毛姆作品中文译本繁多，短篇小说多以精选集形式出版。本次计划推出的《毛姆短篇小说全集》（四卷本）将以精彩译文再现毛姆短篇作品的全貌。本书为第二卷。
          </p>
        </div>
      </div>

      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import GoBack from '../../base/go-back/go-back';

  export default {
    components: {
      GoBack
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .slide-in-enter-active, .slide-in-leave-active
    transition: transform .2s ease-in-out

  .slide-in-enter, .slide-in-leave-to
    transform: translate3d(100%, 0, 0)

  .book
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 150
    background: $color-bg
    &.ignore
      max-width: 650px
      margin: 0 auto

  .book__hd
    position: absolute
    top: 0
    right: 0
    left: 0
    z-index: 200
    height: 90px
    background: $color-bg

  .book__title
    padding-left: 90px
    font-size: 36px
    color: $color-text

  .book__bd
    height: 100%
    padding-top: 90px
    overflow-y: auto
    -webkit-overflow-scrolling: touch

  .media-box
    position: relative
    padding: 40px 32px

  .media-box__hd
    width: 200px
    margin-right: 32px

  .media-box__thumb
    width: 100%
    height: auto

  .media-box__bd
    min-width: 0

  .media-box__title
    padding-bottom: 16px
    font-size: 36px
    color: $color-text-dark

  .media-box__desc, .media-box__meta
    line-height: 32px
    font-size: 24px
    color: $color-text-light

  .media-box__meta
    padding-top: 12px

  .btn-area
    padding: 16px 32px

  .btn
    position: relative
    display: inline-block
    border-radius: 8px
    line-height 60px
    text-align: center
    font-size: 32px
    color: $color-text
    &:not(:first-child)
      margin-left: 32px
    wrap-1px($color-text, 16px)

  .subject-intro
    padding: 32px

  .subject-intro__title
    margin-bottom: 32px
    font-size: 32px
    color: $color-text-light

  .subject-intro__desc
    line-height: 1.6
    font-size: 32px
    word-wrap: break-word
    color: $color-text
</style>
