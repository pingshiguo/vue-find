<template>
  <div class="gallery">
    <div class="gallery__img"
         :style="imageItem">
    </div>
  </div>
</template>

<script>
  const IMG_LIST = [
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=597375154,2905536386&fm=27&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=857208617,3319781484&fm=27&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1646088349,1472429906&fm=27&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=783340072,1312243264&fm=27&gp=0.jpg'
  ];

  export default {
    name: 'gallery',
    props: {
      imageUrl: {
        type: String
      }
    },
    data () {
      return {
        imageList: [],
        imageItem: ''
      };
    },
    created () {
      this.imageList = [...IMG_LIST];
    },
    mounted () {
      setInterval(() => {
        let url = this.randomImage();
        console.log(url);
        this.imageItem = this.getImage(url);
      }, 3000);
    },
    methods: {
      getImage (url) {
        return `background-image: url("${url}");opacity: 1;`;
      },
      randomImage () {
        let random = Math.floor(Math.random(0, 1) * this.imageList.length);
        return this.imageList[random];
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
    z-index: 1000
    overflow: hidden
    background: rgba(0, 0, 0, .8)

  .gallery__img
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: center center no-repeat
    background-size: contain
    opacity: 0
    transition: all .3s ease-in-out
</style>
