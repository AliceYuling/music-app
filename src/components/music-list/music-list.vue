<template>
  <div class="music-list">
    <h1 class="title">{{title}}</h1>
    <div class="back" @click="backToSinger">
      <i class="icon-back"></i>
    </div> 
    <div class="background-img" :style="bgstyle" ref="bgimage">
    </div>
    <scroll :data="songs" class="list" ref="list">
      <div class="song-list-wrapper" >
        <songlist :songs="songs"></songlist>
      </div>
    </scroll>

  </div>
</template>

<script type="ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import Songlist from 'base/songlist/songlist';
  export default {
    props: {
      songs: {
        type: Array,
        default: function () {
          return [];
        }
      },
      title: {
        type: String,
        default: ''
      },
      bgImage: {
        type: String,
        default: ''
      }
    },
    mounted () {
      this.$refs.list.$el.style.top = `${this.$refs.bgimage.clientHeight}px`;
    },
    components: {
      Songlist,
      Scroll
    },
    computed: {
      bgstyle () {
        return `background-image: url(${this.bgImage})`;
      }
    },
    methods: {
      backToSinger () {
        this.$router.push('/singer');
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/style/mixin.styl'
  @import '~common/style/variable.styl'
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    width: 100%
    background: $color-background
    .title
      position: absolute
      top: 8px
      z-index: 50
      width: 100%
      text-align: center
      color: $color-text
      font-size: $font-size-large
    .back
      position: absolute
      top: 10px
      left: 10px
      z-index: 50
      .icon-back
        color: $color-theme
        font-size: $font-size-large-x
    .background-img
      position: relative
      top: 0
      left: 0
      z-index: 49
      width: 100%
      height: 0
      padding-top: 70%
      background-size: cover
    .list
      position: fixed
      left: 0
      right: 0
      bottom: 0
      background: $color-background
      overflow: hidden
      .song-list-wrapper
        padding: 20px 30px
</style>