 <template>
  <transition name="slide">
    <div class="rank-detail"></div>
  </transition>
</template>

<script type="ecmascript-6">
  export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/style/variable.styl';
  .rank-detail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-background
    z-index: 200
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s linear
</style>