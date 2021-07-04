<template>
  <div class="cart-list">
    <scroll class="wrapper" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product=item></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Scroll from 'components/common/scroll/Scroll.vue';
  import CartListItem from './CartListItem.vue';


  export default {
    components: { Scroll, CartListItem },
    name: 'CartList',
    computed: {
      ...mapGetters(['cartList'])
    },
    activated () {
      // 重新计算购物车可滚动高度，解决不能滚动bug
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    /* position: relative; */
    height: calc(100vh - 49px - 44px - 30px);
  }
  .wrapper {
    height: 100%;
    /* position: absolute;
    top: 44px;
    bottom: 49px; */
    overflow: hidden;
  }
</style>