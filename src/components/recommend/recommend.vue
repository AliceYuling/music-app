<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="reommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" />
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider';
  import {getRecommend} from 'api/recommend';
  import {ERR_OK} from 'api/config';
  export default {
    data () {
      return {
        recommends: []
      };
    },
    created () {
      this._getRecommend();
    },
    methods: {
      _getRecommend: function () {
        getRecommend().then((res) => {
          console.log('res.code:' + res.code);
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
            console.log(this.recommends[0].linkUrl);
            console.log(this.recommends[0].picUrl);
          }
        });
      }
    },
    components: {
      Slider
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recommend
    color: #fff
    .recommend-content
      .slider-wrapper
        div
          width: 100%
          height: auto
          a
            display: inline-block
</style>