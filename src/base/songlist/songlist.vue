<template>
  <div class="song-list">
    <ul class="list">
      <li @click="select(song,index)" v-for="(song,index) in songs" class="song-item">
        <div class="content">
          <h2 class="title">{{song.name}}</h2>
          <p class="desc">{{songDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    methods: {
      songDesc (song) {
        return `${song.singer} · ${song.album}`;
      },
      select (song, index) {
        console.log('select in songlist');
        this.$emit('select', song, index);
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/style/variable.styl'
  .song-list
    .song-item
      width: 100%
      height: 58px
      padding-top: 10px
      list-style: none
      .content
        .title
          margin-top: 8px
          color: $color-text
          font-size: $font-size-medium
        .desc
          margin-top: 10px
          color: $color-text-d
          font-size: $font-size-medium
</style>