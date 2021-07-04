<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>

  export default {
    name: 'Toast',
    props: {
      // message: {
      //   type: String,
      //   default: ""
      // },
      // isShow: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data () {
      return {
        message: "",
        isShow: false  
      }
    },
    methods: {
      show(message, duration=1500) {
        // console.log(duration);
        this.message = message
        this.isShow = true

        setTimeout(() => {
          this.message = ""
          this.isShow = false
        }, duration);

      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    transform: translate(-50%,-50%);

    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    z-index: 100;
  }
</style>