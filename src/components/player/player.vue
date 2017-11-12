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
              <div class="cd" :class="{'cd-rotate': playing, 'rotate-pause': !playing}">
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
        <div class="progress-wrapper">
          <span class="time time-l">{{formatTime(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent="percent" @updatePercent="updatePercent"></progress-bar>
          </div>
          <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
        </div>
        <div class="operator">
          <div class="icon">
            <i class="icon-random"></i>
          </div>
          <div class="icon" :class="disableCls">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon" :class="disableCls">
            <i @click="togglePlaying" :class="iconControl"></i>
          </div>
          <div class="icon" :class="disableCls">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon">
            <i class="icon-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="mini-image">
        <img class="image" :src="currentSong.image">
      </div>
      <div class="song-desc">
        <p class="name" v-html="currentSong.name"></p>
        <p class="singer" v-html="currentSong.singer"></p>
      </div>
      <div class="control">
        <progress-circle :radius="radius">
          <i :class="miniIconControl" @click.stop.prevent="togglePlaying"></i>
        </progress-circle>
      </div>
      <div class="control" @click="showPlayList">
        <i class="icon-playlist"></i>
      </div>
    </div>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex';
  import ProgressBar from 'base/progress-bar/progress-bar';
  import ProgressCircle from 'base/progress-circle/progress-circle';
  export default {
    data () {
      return {
        playReady: false,
        currentTime: 0,
        radius: 32
      };
    },
    computed: {
      miniIconControl () {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
      },
      iconControl () {
        return this.playing ? 'icon-pause' : 'icon-play';
      },
      disableCls () {
        return this.playReady ? '' : 'disable';
      },
      percent () {
        return this.currentTime / this.currentSong.duration;
      },
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex'
      ])
    },
    methods: {
      back () {
        this.setFullScreen(false);
      },
      open () {
        this.setFullScreen(true);
      },
      showPlayList () {
        this.setFullScreen(true);
      },
      togglePlaying () {
        this.setPlaying(!this.playing);
      },
      prev () {
        if (!this.playReady) {
          return;
        }
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playList.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.setPlaying(true);
        }
        this.playReady = false;
      },
      next () {
        if (!this.playReady) {
          return;
        }
        let index = this.currentIndex + 1;
        if (index === this.playList.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.setPlaying(true);
        }
        this.playReady = false;
      },
      ready () {
        this.playReady = true;
      },
      error () {
        this.playReady = true;
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime;
      },
      updatePercent (percent) {
        this.$refs.audio.currentTime = percent * this.currentSong.duration;
        if (!this.playing) {
          this.togglePlaying();
        }
      },
      _pad (num, n = 2) {
        let len = num.toString().length;
        while (len < n) {
          num = '0' + num;
          len++;
        }
        return num;
      },
      formatTime (time) {
        time = time | 0;
        const min = this._pad(time / 60 | 0);
        const sec = this._pad(time % 60);
        return `${min}:${sec}`;
      },
      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN_STATE',
        setPlaying: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })
    },
    watch: {
      currentSong () {
        console.log(this.currentSong.url);
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
      },
      playing (newPlaying) {
        const audio = this.$refs.audio;
        this.$nextTick(() => {
          if (newPlaying) {
            audio.play();
          } else {
            audio.pause();
          }
        });
      }
    },
    components: {
      ProgressBar,
      ProgressCircle
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
              .cd
                border-radius: 50%
                animation: cdRotate 30s linear infinite
                &.cd-rotate
                  animation-play-state: play
                &.rotate-pause
                  animation-play-state: paused
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
        .progress-wrapper
          display: flex
          .time
            display: block
            line-height: 30px
            flex: 0 0 40px
            text-align: center
            color: $color-text-l
            font-size: $font-size-small
            &.time-l
              margin-left: 20px
            &.time-r
              margin-right: 20px
          .progress-bar-wrapper
            display: inline-block
            flex: 1
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
            &.disable
              color: $color-theme-d     
            .icon-random
              display: inline-block
            .icon-prev
              display: inline-block
            .icon-play, .icon-pause
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
      .control
        flex: 0 0 48px
        width: 48px
        line-height: 64px
        .icon-playlist, .icon-play-mini, .icon-pause-mini
          color: $color-theme
          font-size: $font-size-large-x
          vertical-align: middle
  @keyframes cdRotate
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>