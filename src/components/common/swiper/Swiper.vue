<template>
    <div id="hy-swiper">
      <div class="swiper">
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="back">
        <img src="~assets/img/common/next.svg" alt="" class="next" @click="next">
        <slot>
          <!-- 轮播图 -->
        </slot>
      </div>

      <div class="indicator">
        <slot name="indicator">
          <div class="indi-item" v-for="(item, index) in slideCount" :key="index" :class="{active: n==index}" @mouseover="change(index)"></div>
        </slot>
      </div>
    </div>
</template>

<script>
	export default {
		name: "Swiper",
    data () {
      return {
        slideCount: 0, // 元素个数
        totalWidth: 0, // swiper的宽度
        swiperStyle: {}, // swiper样式
        currentIndex: 1, // 当前的index
        scrolling: false, // 是否正在滚动
      }
    },
    props: {
      // 时间间隔
      interval: {
		    type: Number,
        default: 3000
      },
      // animDuration: {
		  //   type: Number,
      //   default: 300
      // },
      // 变换比例
      moveRatio: {
        type: Number,
        default: 0.25
      },
      // 是否显示指示器
      showIndicator: {
        type: Boolean,
        default: true
      },
      n: {
        type: Number,
      }
    },
    methods: {
      handleDOM() {
        // const swiperEl = document.getElementsByClassName('swiper');
        const slidesEls = document.getElementsByClassName('slide');

        this.slideCount = slidesEls.length;
        // console.log(this.slidesEls);
      },
      change(item) {
        this.$emit("indi-over",item);
      },
      back(item) {
        this.$emit("back",item);
      },
      next(item) {
        this.$emit("next",item);
      }
    },
    created () {
      
    },
    mounted () {
      setTimeout(() => {
        this.handleDOM();
        // console.log(this.slideCount);
      }, 500);
    }
	}
</script>

<style scoped>
  #hy-swiper {
    position: relative;
    /* overflow: hidden; */
  }
  .swiper {
    /* display: flex; */
  }
  .indicator {
    position: absolute;
    width: 100%;
    bottom: 8px;
    display: flex;
    justify-content: center;
  }
  .indi-item {
    border: 5px solid white;
    border-radius: 50%;
    margin: 5px;
  }
  .indi-item.active {
    border: 5px solid red;
  }
  .back {
    width: 40px;
    position: absolute;
    margin-top: -20px;
    top: 50%;
  }
  .back:hover {
    content: url(~assets/img/common/back_active.svg);
  }
  .next {
    width: 40px;
    position: absolute;
    top: 50%;
    margin-top: -20px;
    right: 0;
  }
  .next:hover {
    content: url(~assets/img/common/next_active.svg);
  }
</style>
