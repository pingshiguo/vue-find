<template>
  <div class="video-player">
    <div class="video-player__bd">
      <div class="video-wrapper">
        <video
          src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
          controls>
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'video-player'
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .video-player
    position: absolute
    top: 60px
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
    margin: 40px auto auto

  .video-wrapper
    width: 100%
    margin: auto
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5)
    font-size: 0
    video
      width: 100%
      margin: auto
</style>
