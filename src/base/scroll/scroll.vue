<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="ecmascript-6">
  import BScroll from 'better-scroll';
  export default {
    props: {
      probeType: {
        Type: Number,
        default: 1
      },
      click: {
        Type: Boolean,
        default: true
      },
      data: {                                         // 组件的数据有可能是动态变化的，需要refresh
        type: Array,
        default: null
      }
    },
    mounted () {
      setTimeout (() => {
        this._initScroll();                           // 浏览器时间约17ms,确保DOM渲染了之后初始化scrill
      }, 20);
    },
    methods: {
      _initScroll () {
        if(!this.$refs.wrapper) {
          return;
        }
        console.log('init scroll');
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        });
      },
      enable () {
        this.scroll && this.scroll.enable();
      },
      disable () {
        this.scroll && this.scroll.disable();
      },
      refresh () {
        this.scroll && this.scroll.refresh();
      }   
    },
    watch: {
      data () {                                   // 监测数据变化并刷新
        setTimeout(() => {
          this.refresh();
          console.log('refresh data');
        }, 20);
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>