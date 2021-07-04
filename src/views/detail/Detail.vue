<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
    
    <!-- <toast :message="message" :isShow="isShow"></toast> -->

    <scroll class="wrapper" ref="scroll" @scroll="detailScroll" :probeType="3">
      <detail-swiper :topImgs="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"></detail-goods-info>
      <detail-param-info :param-info="goodsParam" class="param-info" ref="paramInfo" ></detail-param-info>
      <detail-comment :comment-info="comment" ref="comment"></detail-comment>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isAppear" ></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail.js";
  import { itemListenerMixin, backTopMixin } from "common/mixin.js";
  import { debounce } from "common/utils.js";
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo_org.vue'
  import DetailShopInfo from './childComps/DetailShopInfo_org.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo_org.vue'
  import DetailParamInfo from './childComps/DetailParamInfo_org.vue'
  import DetailComment from './childComps/DetailComment_org.vue'
  import DetailBottomBar from './childComps/DetailBottomBar_org.vue'
  // 展示推荐信息，复用
  import GoodsList from 'components/content/goods/GoodsList.vue'
 
  import Scroll from 'components/common/scroll/Scroll.vue';

  // import Toast from 'components/common/toast/Toast.vue';

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,Scroll,DetailGoodsInfo,DetailParamInfo,DetailComment,DetailBottomBar
      ,GoodsList
    },
    mixins: [itemListenerMixin,backTopMixin],
    data () {
      return {
        iid:  null,
        topImgs: [],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParam: {},
        comment: {},
        recommend: [],
        titleTopYs: [],
        getTitleTopYs: null,
        index: 0,

        // isShow: false,
        // message: ""
      }
    },
    // 未keep-alive没有这个钩子
    // deactivated () {
    //   console.log('deactivated');
    // },
    created () {
      // console.log(this.$route);
      this.iid = this.$route.query.iid

      getDetail(this.$route.query.iid).then(res=> {
        console.log(res);
        this.topImgs = res.result.itemInfo.topImages
        // console.log(this.topImgs);
        // 获取商品信息
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)

        // 店铺信息
        this.shop = new Shop(res.result.shopInfo)

        // 商品详情
        this.detailInfo = res.result.detailInfo

        // 获取参数信心
        this.goodsParam = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)

        // 获取评论信息
        if(res.result.rate.cRate!=0){
          this.comment = res.result.rate.list[0]
          // console.log(this.comment);
        }

        // 有问题，图片没有加载完成
        // this.$nextTick(function() {
        //   this.titleTopYs = []
        //   this.titleTopYs.push(0);
        //   this.titleTopYs.push(this.$refs.paramInfo.$el.offsetTop)
        //   this.titleTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.titleTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.titleTopYs);
        // })
      })
      // 请求推荐数据
      getRecommend().then(res=> {
        // console.log(res);
        this.recommend = res.data.list
      })

      //给getTitleTopYs做防抖
      this.getTitleTopYs = debounce(()=> {
            this.$nextTick(function() {
            this.titleTopYs = []
            this.titleTopYs.push(0);
            this.titleTopYs.push(this.$refs.paramInfo.$el.offsetTop)
            this.titleTopYs.push(this.$refs.comment.$el.offsetTop)
            this.titleTopYs.push(this.$refs.recommend.$el.offsetTop)
            // console.log(this.titleTopYs);
          })
        },100)
    },
    methods: {
      ...mapActions(['addCart']),

      imagesLoad() {
        // this.$refs.scroll.refresh()
        this.newRefresh()

        //会多次调用，要做防抖
        // this.titleTopYs = []
        // this.titleTopYs.push(0);
        // this.titleTopYs.push(this.$refs.paramInfo.$el.offsetTop)
        // this.titleTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.titleTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.titleTopYs);
        this.getTitleTopYs()
        
      },
      // 点击detailnavbar滚动到相应位置
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.titleTopYs[index],200)
      },
      addToCart() {
        // console.log("添加到购物车");
        let product = {}
        product.image = this.topImgs[0]
        product.title = this.goods.title
        product.price = this.goods.lowNowPrice
        product.desc = this.detailInfo.desc
        product.iid = this.iid
        product.count = 1
        // console.log(product);

        // 添加到Vuex
        // this.$store.commit('addCart',product)
        // this.$store.dispatch('addCart', product).then(res=> {
        //   console.log(res);
        // })
        this.addCart(product).then(res=> {
          this.$toast.show(res, 1000)

          // this.isShow = true
          // this.message = res
          // console.log(res);

          // setTimeout(() => {
          //   this.isShow = false
          //   this.message = ""
          // }, 1500);
        })

      },
      detailScroll(position){
        this.isAppear = position.y < -2000

        let y = -position.y
        let length = this.titleTopYs.length
        for(let i=0;i<length;i++){
          // console.log(i,this.index);
          // 避免重复
          if(i!=this.index){
            if(( y<this.titleTopYs[i+1] && y>=this.titleTopYs[i]) || (i===length-1 && y>=this.titleTopYs[i])){
              this.index=i
              console.log(this.index);
              this.$refs.detailNav.currentIndex=this.index
            }
          }
        }
        // 用if else方法判断，不够好
        // if(y<=-this.titleTopYs[3]){
        //   // console.log(3);
        //   this.$refs.detailNav.currentIndex = 3
        // }
        // else if(y<=-this.titleTopYs[2]){
        //   // console.log(2);
        //   this.$refs.detailNav.currentIndex = 2
        // }
        // else if(y<=-this.titleTopYs[1]){
        //   // console.log(1);
        //   this.$refs.detailNav.currentIndex = 1
        // }
        // else{
        //   // console.log(0);
        //   this.$refs.detailNav.currentIndex = 0
        // }
      }
    },
    mounted () {
      // this.$nextTick(this.getTitleTopYs())
      
    },
    updated () {
      
    },
    destroyed () {
      this.$bus.$off('itemImgLoad', this.imgListener)
    }
    
}
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 5;

    background-color: #fff;
    height: 100vh;
  }
  .wrapper {
    height: calc(100% - 44px);
    /* overflow: hidden; */

    /* margin-top: 44px; */
  } 
  .detail-nav {
    position: relative;
    z-index: 5;

    background-color: #fff;
  }
  .param-info {
    background-color: #fff;
  }

</style>