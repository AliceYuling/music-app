<template>
  <scroll class="listview">
    <ul class="list-wrapper">
      <li v-for="group in data" class="list-group">
        <h2 class="group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" :src="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    components: {
      Scroll
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/style/variable.styl'
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-wrapper
      .list-group
        padding-bottom: 30px
        .group-title
          width: 100%
          height: 28px
          line-height: 28px
          padding-left: 16px
          background-color: $color-highlight-background
          color: $color-text
          font-size: $font-size-medium
        ul
          .list-group-item
            width: 100%
            height: 80px
            line-height: 80px
            .avatar
              display: inline-block
              margin-left: 32px
              width: 50px
              height: 50px
              border-radius: 50%
              vertical-align: middle
            .name
              display: inline-block
              margin-left: 16px
              vertical-align: top
              color: $color-text
              font-size: $font-size-medium
</style>