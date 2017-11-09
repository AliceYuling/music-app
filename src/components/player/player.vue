<template>
  <div class="player" v-show="playList.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="song-name" v-html="currentSong.name"></h1>
        <h2 class="singer" v-html="currentSong.singer"></h2>
      </div>
      <div class="middle">
        <div class="middle-wrapper">
          <div class="cd">
            <img class="cd-image" :src="currentSong.image">
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="icon">
          <i class="icon-random"></i>
        </div>
        <div class="icon">
          <i class="icon-prev"></i>
        </div>
        <div class="icon">
          <i class="icon-play"></i>
        </div>
        <div class="icon">
          <i class="icon-next"></i>
        </div>
        <div class="icon">
          <i class="icon-favorite"></i>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong'
      ])
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/style/variable.styl'
  .player
    position: fixed
    width: 100%
    z-index: 199
    backdrop-filter: blur(1)
    .normal-player
      position: relative
      z-index: 200
      .background
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
      .top
        .back
          font-size: $font-size-large
        .song-name
          font-size: $font-size-large
          color: $color-theme
        .singer
          font-size: $font-size-medium-x
          color: $color-theme
      .middle
        .middle-wrapper
          .cd-image
            width: 90px
            height: 90px
            border: 2px solid #ccc
            border-radius: 50%
      .bottom
        .icon
          .icon-random
            display: inline-block
          .icon-prev
            display: inline-block
          .icon-play
            display: inline-block
          .icon-next
            display: inline-block
          .icon-favorite
            display: inline-block
    .mini-player
      position: fixed
      z-index: 101
</style>