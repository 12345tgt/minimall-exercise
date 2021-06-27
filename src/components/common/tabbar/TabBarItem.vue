<template>
  <div class="tabBarItem" @click="itemClick()">
    <slot v-if="!isActive" name="photo">图片</slot>
    <slot v-else name="active-photo"></slot>
    <div :style="activeStyle">
      <slot name="word">文字</slot>
    </div>  
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red',
    }
  },
  data () {
    return {
      // isActive: false
    }
  },
  computed: {
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    },
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    
  },
  methods: {
    itemClick(){
      // console.log("click");
      this.$router.push(this.path);
    }
  }
}
</script>

<style>
/* .active {
    color: red;
  } */
 .tabBarItem {
    flex: auto;
    text-align: center;
    height: 49px;
    /* line-height: 49px; */
    font-size: 14px;
  }
  .tabBarItem img {
    width: 24px;
    height: 24px;
    /* margin-bottom: 3px; */
  }
  
</style>