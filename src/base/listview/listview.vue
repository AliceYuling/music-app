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
    <div class="listview-shortcut">
      <ul class="shortcut-list">
        <li class="shortcut-item" v-for="(item,index) in shortcut" v-onclick="onShortcutTouchStart(event)" :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import {getData} from 'common/js/dom.js';
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      touch: {}
    },
    computed: {
      shortcut () {
        return this.data.map((group) => {
          return group.title.substr(0, 1);
        });
      }
    },
    components: {
      Scroll
    },
    methods: {
      onShortcutTouchStart (e) {
        this.touch.startY = e.target.touchY;
        let touchIndex = getData(e.target, 'index');
        scrollToElement(touchIndex);
      },
      onShortcutMove (e) {
        this.touch.endY = e.target.touchY;
        let moveIndex = this.touchendY / 18 | 0;
        scrollToElement(moveIndex);
      }
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
    .listview-shortcut
      position: absolute
      right: 0
      top: 100px
      .shortcut-list
        .shortcut-item
          width: 18px
          height: 18px
          color: $color-text
          font-size: $font-size-small
</style>