<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 用于吸顶时显示的tabControl -->
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tab-click="tabControl" ref="tabControl2" :class="{Sticky: isSticky}" v-show="isSticky"></tab-control>

    <scroll class="wrapper" ref="scroll" :probeType="3" :pullUpLoad="true" @scroll="scrollPosition" @pulling-up="pullingUp">
      <home-swiper :banners="banners"  @tab-offset="calcTabOffset"></home-swiper>
      <recommend-view :recommends="recommends" ></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tab-click="tabControl" ref="tabControl1" ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isAppear" ></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar.vue"
  import TabControl from "components/content/TabControl/TabControl.vue"
  import GoodsList from "components/content/goods/GoodsList.vue"
  import Scroll from 'components/common/scroll/Scroll.vue'


  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView.vue"
  import FeatureView from "./childComps/FeatureView.vue"

  import { getHomeMultidata, getHomeGoods } from "network/home.js";
  import { itemListenerMixin, backTopMixin } from "common/mixin.js";
  
  
  export default {
    name: "Home",
    components: {
      NavBar,HomeSwiper,RecommendView,FeatureView,TabControl,GoodsList,Scroll,

    },
    mixins: [itemListenerMixin, backTopMixin],
    destroyed () {
      console.log('destroy');
    },
    activated () {
      // console.log('activated');
      // 有bug，可能上拉加载更多的时候有问题
      // console.log(this.saveY);
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated () {
      // console.log('deactivated');
      // 保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY);
      
      // 取消Home对全局事件的监听
      this.$bus.$off('itemImgLoad',this.imgListener)
    },
    data () {
      return {
        banners: [],
        recommends: [],
        // flag: false,

        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        
        type: 'pop',
        bs: null,

        // timer: null,
        tabOffsetTop: 0,
        isSticky: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.type].list
      }
    },
    created () {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');  
    },
    methods: {
      /**
       * 事件监听
       */
      // 防抖函数
      // debounce(func, delay) {
      //   let timer = null;

      //   return function(...args) {
      //     if(timer) clearTimeout(timer)
      //     // console.log(timer);
      //     timer = setTimeout(() => {
      //       func.apply(this,args)
      //     }, delay);
      //   }
      // },
      tabControl(index) {
        // console.log(item);
        if(index==0){
          this.type='pop'
        }
        else if(index==1){
          this.type='new'
        }
        else if(index==2){
          this.type='sell'
        }
        // 解决两个tabControl显示不一致的问题
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index

      },

      scrollPosition(position) {
        // console.log(position);
        // 判断backTop是否显示
        this.isAppear = position.y < -1000
        // 决定tabControl是否吸顶
        this.isSticky = position.y < -this.tabOffsetTop
      },
      // 上拉加载
      pullingUp() {
        // console.log(this.type);
        this.getHomeGoods(this.type)
      },
      calcTabOffset() {
        // console.log(this.$refs.tabControl1.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
      },
      /** 
       * 网络请求
       * */ 
      getHomeMultidata() {
        getHomeMultidata().then(res=> {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          // this.flag = true;
        })
      },
      getHomeGoods(type) {
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=> {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page++;
        })
      },

    },
    mounted () {
      // const refresh = this.debounce(this.$refs.scroll.refresh,100)
      // // 图片加载刷新，解决better-scroll不能滚动bug
      // this.imgListener = ()=> {
      //   console.log('load');
      //   refresh()

      //   // 未封装
      //   // if(this.timer) clearTimeout(this.timer)
      //   // this.timer = setTimeout(() => {
      //   //   this.$refs.scroll.refresh()
      //   // }, 100);
      // }
      // this.$bus.$on('itemImgLoad',this.imgListener)
      
    },
    
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    color: white;
    background-color: var(--color-tint);
  }
  /* .tab-control {
    position: sticky;
    top: 44px;

    z-index: 1;
  } */
  /* .wrapper {
    height: calc(100% - 93px);
    overflow: hidden;

    margin-top: 44px;
  } */
  .wrapper {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  .Sticky {
    position: relative;
    /* margin-bottom: 40px; */
    z-index: 6;
  }
</style>