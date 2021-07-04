import { debounce } from "./utils.js";
// 混入防抖函数
export const itemListenerMixin = {
  data () {
    return {
      imgListener: null,
      newRefresh: null
    }
  },
  mounted () {
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.imgListener = ()=> {
      // console.log('mixin-load');
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.imgListener)

  }
}

// 回到顶部
import BackTop from 'components/content/backTop/BackTop.vue'

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isAppear: false
    }
  },
  methods: {
    backTop() {
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0,0)
    },
  }
}