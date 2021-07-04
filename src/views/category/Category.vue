<template>
  <div class="wrapper">
    
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data () {
      return {
        bs: null  
      }
    },
    mounted () {
      this.bs = new BScroll('.wrapper',{
        probeType: 3,
        pullUpLoad: true
      })

      this.bs.on('scroll',(position)=> {
        // console.log(position);
      })

      this.bs.on('pullingUp',()=> {
        console.log('pullingUp');
        this.bs.finishPullUp();
      })
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 300px;
    background: red;

    /* overflow-y: scroll; */
  }
</style>
