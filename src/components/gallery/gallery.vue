<template>
  <div class="gallery">
    <div class="gallery__img"
         :style="getImage(imageIndex)">
      <div class="arrow-left" @click="goPre"><</div>
      <div class="arrow-right" @click="goNext">></div>
    </div>
  </div>
</template>

<script>
  import { getGallery } from '../../api/page';
  import { ERR_OK } from '../../api/config';

  export default {
    name: 'gallery',
    props: {
      galleryId: {
        type: String
      }
    },
    data () {
      return {
        gallery: [],
        imageIndex: -1
      };
    },
    created () {
      this._getGallery(this.galleryId);
    },
    mounted () {

    },
    methods: {
      goPre () {
        if (this.imageIndex === 0) {
          this.imageIndex = this.gallery.length - 1;
        } else {
          this.imageIndex--;
        }
      },
      goNext () {
        if (this.imageIndex === this.gallery.length - 1) {
          this.imageIndex = 0;
        } else {
          this.imageIndex++;
        }
      },
      getImage (imageIndex) {
        if (this.gallery.length > 0 && this.imageIndex > -1) {
          let url = this.gallery[imageIndex].resource;

          return `background-image: url("${url}");opacity: 1;`;
        }
      },
      _getGallery (galleryId) {
        getGallery(galleryId).then(res => {
          if (res.code === ERR_OK) {
            this.gallery = [...res.data];
            this.imageIndex = 0;

            console.log(this.gallery);
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .gallery
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 9999
    overflow: hidden
    background: rgba(0, 0, 0, 1)

  .gallery__img
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    margin: 32px 0
    background: center center no-repeat
    background-size: contain
    opacity: 0
    transition: all .3s ease-in-out

  .arrow-left, .arrow-right
    position: absolute
    top: 50%
    z-index: 9999
    color: #fff
    width: 60px
    font-size: 36px
    font-weight: 100
    cursor: pointer
    transform: translateY(-50%)

  .arrow-left
    left: 16px

  .arrow-right
    right: 16px
</style>
