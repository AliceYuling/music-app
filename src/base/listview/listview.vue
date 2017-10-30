<template>
  <scroll class="listview" ref="listview" :data="data">
    <ul class="list-wrapper">
      <li v-for="group in data" class="list-group" ref="listgroup">
        <h2 class="group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" :src="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="listview-shortcut" v-on:touchstart="onShortcutTouchStart($event)" v-on:touchmove.stop.prevent="onShortcutTouchMove($event)">
      <ul class="shortcut-list">
        <li class="shortcut-item" v-for="(item,index) in shortcut" :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import {getData} from 'common/js/dom';
  const HEIGHT = 18;
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcut () {
        return this.data.map((group) => {
          return group.title.substr(0, 1);
        });
      }
    },
    created () {
      this.touch = {};           // 若在data 里设置的话会绑定getter， setter并监听变化
    },
    components: {
      Scroll
    },
    methods: {
      onShortcutTouchStart (e) {
        let touchIndex = getData(e.target, 'index');
        console.log('touchIndex1:' + touchIndex);
        let firstTouch = e.touches[0];
        console.log('firstTouch1:' + firstTouch.pageY);
        this.touch.y1 = firstTouch.pageY;
        this.touch.touchIndex = touchIndex;
        this._scrollTo(touchIndex);
      },
      onShortcutTouchMove (e) {
        let firstTouch = e.touches[0];
        console.log('firstTouch2:' + firstTouch.pageY);
        this.touch.y2 = firstTouch.pageY;
        let delta = (this.touch.y2 - this.touch.y1) / HEIGHT | 0;
        console.log(delta);
        let moveIndex = parseInt(this.touch.touchIndex) + delta;
        this._scrollTo(moveIndex);
      },
      _scrollTo (index) {
        this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0);
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/style/variable.styl'
  .listview
    position: relative
    height: 100%
    width: 100%
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
          width: 30px
          height: 18px
          list-style: none
          text-align: center
          color: $color-text
          font-size: $font-size-small
</style>