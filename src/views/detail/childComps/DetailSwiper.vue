<template>
  <div class="detail-swiper">
    <swiper class="swiper" :n="n" v-on:mouseenter.native="clearGo" @mouseleave.native="go" @indi-over="changeN" @next="next" @back="back">
      <swiper-item v-for="(item, index) in topImgs" :key="index">
        <img :src="item" alt="" v-show="n==index">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: 'DetailSwiper',
    props: {
      topImgs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        n: 0  
      }
    },
    components: {
      Swiper,SwiperItem
    },
    methods: {
      go() {
        this.playTimer=window.setInterval(() => {
          this.n++;
          if(this.n==this.topImgs.length){
            this.n=0;
          }
        }, 3000);
        // console.log("go");
      },
      clearGo() {
        window.clearInterval(this.playTimer)
        // console.log("clearGo");
      },
      changeN(item) {
        // console.log(item);
        this.n = item
      },
      next() {
        this.n++;
        if(this.n==this.topImgs.length){
          this.n=0;
        }
      },
      back() {
        this.n--;
        if(this.n<0){
          this.n=this.topImgs.length-1;
        }
      },
      // imgLoad() {
      //   // console.log("---------");
      //   if(!this.isLoad){
      //     this.$emit('tab-offset')
      //     this.isLoad = true
      //   }
      // }
    },
    mounted () {
      this.go()
    }
}
</script>

<style scoped>
  .detail-swiper {

  }
  .swiper {
    height: 300px;
    overflow: hidden;
  }
</style>