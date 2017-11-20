<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" v-model="query" :placeholder="placeholder">
    <i v-show="query" @click="clear" class="icon-dismiss"></i>
  </div>
</template>

<script type="ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: 'search for song'
      }
    },
    data () {
      return {
        query: ''
      };
    },
    methods: {
      clear () {
        this.query = '';
      }
    },
    created () {
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery);
      });
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/style/variable.styl'
    .search-box
    display: flex
    align-items: center 
    box-sizing: border-box
    width: 100%
    height: 40px
    padding: 0 6px
    border-radius: 6px
    background: $color-highlight-background
    .icon-search:
      font-size: $font-size-large-x
      color: $color-background
    .box
      display: block
      flex: 1
      line-height: 24px
      background: $color-highlight-background
    .icon-dismiss
      font-size: $font-size-medium
      color: $color-background
</style>