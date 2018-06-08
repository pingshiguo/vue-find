<template>
  <div class="video-player">
    <div class="video-player__bd">
      <div class="video-wrapper">
        <video
          :src="url"
          controls>
          Sorry, your browser doesn't support embedded videos.
        </video>
        <div class="video-list-container">
          <h2 class="video-list__title">视频列表</h2>
          <ul class="video-list">
            <li v-for="(item, index) in this.videos"
                :key="item.id"
                class="video-list__item"
                :class="item.resource === url ? 'active' : ''"
                @click="selectItem(item.resource)">
              {{(index + 1) + '. ' + item.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getVideo } from '../../api/page';
  import { ERR_OK } from '../../api/config';

  export default {
    name: 'video-player',
    props: {
      videoId: {
        type: String
      }
    },
    data () {
      return {
        videos: [],
        url: ''
      };
    },
    created () {
      this._getVideo(this.videoId);
    },
    methods: {
      selectItem (url) {
        this.url = url;
      },
      _getVideo (videoId) {
        getVideo(videoId).then(res => {
          if (res.code === ERR_OK) {
            this.videos = [...res.data];
            this.url = this.videos[0].resource;
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .video-player
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 100
    padding: 20px
    overflow: auto
    -webkit-overflow-scrolling: touch
    background: #f6f6f6

  .video-player__bd
    display: flex
    max-width: 960px
    height: 100%
    margin: auto

  .video-wrapper
    position: relative
    width: 100%
    margin: auto
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5)
    font-size: 0
    video
      width: 100%

  .video-list-container
    position: absolute
    top: 0
    right: -16px
    background: #fff
    transform: translate3d(100%, 0, 0)

  .video-list__title
    padding: 0 16px
    line-height: 36px
    font-size: 18px
    color: #666

  .video-list
    padding: 0 16px 16px

  .video-list__item
    min-width: 200px
    border-bottom: 1px solid #f1f1f1
    line-height: 28px
    font-size: 16px
    color: #999
    transition: all .2s ease-in-out
    cursor: pointer
    &.active
      color: #333
</style>
