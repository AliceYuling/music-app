<template>
  <div class="player" v-show="playList.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="song-name" v-html="currentSong.name"></h1>
        <h2 class="singer" v-html="currentSong.singer"></h2>
      </div>
      <div class="middle">
        <div class="middle-wrapper">
          <div class="middle-left">
            <div class="cd-wrapper">
              <div class="cd">
                <img class="cd-image" :src="currentSong.image">
              </div>
            </div>
          </div>
          <div class="middle-right">
            <div class="lyric">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="operator">
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
    </div>
    <div class="mini-player" v-show="!fullScreen">
      <div class="mini-image">
        <img class="image" :src="currentSong.image">
      </div>
      <div class="song-desc">
        <p class="name" v-html="currentSong.name"></p>
        <p class="singer" v-html="currentSong.singer"></p>
      </div>
      <div class="icon" @click="showPlayList">
        <i class="icon-playlist"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong'
      ])
    },
    methods: {
      back () {
        this.setFullScreen(false);
      },
      showPlayList () {
        this.setFullScreen(true);
      },
      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN_STATE'
      })
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/style/variable.styl'
  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 199
      background: $color-background
      .background
        position: absolute
        top: 0
        left: 0
        width:100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        width: 100%
        margin-bottom: 26px
        text-align: center
        .back
          position: absolute
          left: 10px
          top: 16px
          .icon-back
            display: inline-block
            font-size: $font-size-large
            color: $color-theme
            transform: rotate(-90deg)
        .song-name
          width: 75%
          margin: 16px auto
          font-size: $font-size-large
          color: $color-text
        .singer
          margin-top: 12px
          font-size: $font-size-medium-x
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 100px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-wrapper
          .middle-left
            display: inline-block
            position: relative
            left: 0
            top: 0
            width: 100%
            height: 0
            padding-top: 80%
            .cd-wrapper
              position: absolute
              left: 10%
              top: 0
              width: 80%
              border: 2px solid #ccc
              .cd-image
                width: 100%
                border-radius: 50%
          .middle-right
            width: 100%
            display: inline-block
      .bottom
        position: fixed
        bottom: 0
        height: 170px
        width: 100%
        .operator
          width: 80%
          margin: 10px auto
          font-size: 0
          .icon
            display: inline-block
            width: 20%
            text-align: center
            color: $color-theme
            font-size: $font-size-large-x       
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
      display: flex
      position: fixed
      bottom: 0
      z-index: 101
      width: 100%
      height: 64px
      background: $color-highlight-background
      .mini-image
        flex: 0 0 48px
        line-height: 64px
        padding-left: 10px
        margin-right: 8px
        vertical-align: middle
        width: 40px
        border-radius: 50%
        .image
          width: 40px
          height: 40px
          border-radius: 50%
          vertical-align: middle
      .song-desc
        flex: 1
        .name
          line-height: 32px
          font-size: $font-size-small-x
          color: $color-text
        .singer
          line-height: 32px
          font-size: $font-size-small
          color: $color-text-l
      .icon
        flex: 0 0 48px
        width: 48px
        line-height: 64px
        .icon-playlist
          color: $color-theme
</style>