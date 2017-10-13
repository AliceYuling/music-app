<template>
  <div id="app">
    <m-header></m-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/recommend">
          <span class="tab-link">推荐</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/singer">
          <span class="tab-link">歌手</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rank">
          <span class="tab-link">排行</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/search">
          <span class="tab-link">搜索</span>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/header/header';
  export default {
    components: {
      MHeader
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/style/variable'
  .tab
    display: flex
    width: 100%
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      &>a
        display: inline-block
        width: 100%
        text-decoration: none
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
