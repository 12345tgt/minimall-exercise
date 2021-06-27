<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data () {
      return {
        bs: null  
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.bs = new BScroll(this.$refs.wrapper,{
        observeDOM: true,
        click: true,
        pullUpLoad: this.pullUpLoad,
        probeType: this.probeType
        // probeType: 2
      })

      if(this.pullUpLoad) {
        this.bs.on('pullingUp',()=> {
          console.log("pullingUp");
          this.$emit('pulling-up')

          this.bs.finishPullUp();
        })
      }

      this.bs.on('scroll',(position)=> {
        // console.log(position);
        this.$emit('scroll',position)
      })
    },
    methods: {
      scrollTo(x,y,time=300){
        this.bs && this.bs.scrollTo(x,y,time)
      },
      getScrollY() {
        return this.bs ? this.bs.y : 0 
      },
      refresh() {
        // 解决加载顺序报错问题
        // console.log('refresh');
        this.bs && this.bs.refresh()
      }
    }
  }
</script>

<style scoped>

</style>