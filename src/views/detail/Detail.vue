<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="wrapper" ref="scroll">
      <detail-swiper :topImgs="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"></detail-goods-info>
      <detail-param-info :param-info="goodsParam"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
  import { getDetail, Goods, Shop, GoodsParam } from "network/detail.js";
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo_org.vue'
  import DetailShopInfo from './childComps/DetailShopInfo_org.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo_org.vue'
  import DetailParamInfo from './childComps/DetailParamInfo_org.vue'
  import Scroll from 'components/common/scroll/Scroll.vue';

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,Scroll,DetailGoodsInfo,DetailParamInfo
    },
    data () {
      return {
        iid:  null,
        topImgs: [],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParam: {},
      }
    },
    deactivated () {
      console.log('deactivated');
    },
    created () {
      // console.log(this.$route.params.id);
      getDetail(this.$route.params.id).then(res=> {
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
      })
      
    },
    methods: {
      imagesLoad() {
        this.$refs.scroll.refresh()
      }
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
</style>