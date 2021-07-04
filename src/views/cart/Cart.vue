<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center"> 
        购物车({{cartLength}})
      </div>
    </nav-bar>
    <cart-list></cart-list>
    
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>

  import CartList from './childComps/CartList.vue';
  import CartBottomBar from './childComps/CartBottomBar.vue';
  import NavBar from 'components/common/navbar/NavBar.vue';
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,CartList,CartBottomBar
    },
    data () {
      return {
        // number: this.$store.getters.cartLength
      }
    },
    created () {
      // console.log($store.state.cartList);
    },
    methods: {
      
    },
    computed: {
      ...mapGetters(['cartLength'])
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
    }
  }
</script>

<style scoped>
  .cart {
    /* height: 100vh; */
  }
  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>