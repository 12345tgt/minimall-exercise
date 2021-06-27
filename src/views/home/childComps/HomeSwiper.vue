<template> 
  <swiper :n="n" v-on:mouseenter.native="clearGo" @mouseleave.native="go" @indi-over="changeN" @next="next" @back="back">
    <!-- <swiper-item v-for="item in banners" :key="item.img"> -->
    <swiper-item v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" v-show="n==id" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>


<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        },
      },
    },
    components: {
      Swiper,
      SwiperItem
    },
    data () {
      return {
        n: 0,
        isLoad: false
      }
    },
    methods: {
      go() {
        this.playTimer=window.setInterval(() => {
          this.n++;
          if(this.n==this.banners.length){
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
        if(this.n==this.banners.length){
          this.n=0;
        }
      },
      back() {
        this.n--;
        if(this.n<0){
          this.n=this.banners.length-1;
        }
      },
      imgLoad() {
        // console.log("---------");
        if(!this.isLoad){
          this.$emit('tab-offset')
          this.isLoad = true
        }
      }
    },
    mounted () {
      this.go()
    }
  }
</script>

<style scoped>

</style>
