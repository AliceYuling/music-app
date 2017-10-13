<template>
  <div class="slider">
    <div class="slder-group">
      <slot></slot>
    </div>
    <div class="dots">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slider
    position: relative
    .slider-group
      position: relative
      width: 100%
      height: auto
      overflow: hidden
    .dots
      position: absolute
</style>