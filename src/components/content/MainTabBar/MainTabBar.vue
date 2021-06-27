<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor='green'>
        <img slot="photo" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="active-photo" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="word"><span>首页</span></div>
      </tab-bar-item>

      <tab-bar-item path="/category" activeColor='green'>
        <img slot="photo" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="active-photo" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="word"><span>分类</span></div>
      </tab-bar-item>

      <tab-bar-item path="/cart" activeColor='blue'>
        <img slot="photo" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="active-photo" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="word">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/profile" activeColor='deeppink'>
        <img slot="photo" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="active-photo" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="word">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

export default {
  name: "MainTabBar",
  components: {
    TabBar,TabBarItem
  }
}
</script>

<style>

</style>