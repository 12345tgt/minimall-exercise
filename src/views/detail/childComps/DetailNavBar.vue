<template>
  <div>
    <nav-bar class="detail-bar" >
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="backClick">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in list" :key="index" class="title-item" @click="changeIndex(index)" :class="{active: index==currentIndex}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  export default {
    name: '',
    components: {
      NavBar
    },
    data () {
      return {
        list: ["商品","参数","评论","推荐"],
        currentIndex: 0
      }
    },
    methods: {
      changeIndex(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
}
</script>
<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: auto;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    margin-top: 10px;
    width: 23px;
  }
</style>