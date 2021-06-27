<template>
  <div class="TabControl">
    <div v-for="(item, index) in titles" :key="index" class="tabc-item" :class="{active: index==currentIndex}" @click="changeIndex(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return ["新款"]
        }
      }
    },
    data () {
      return {
        currentIndex: 0,
        isActive: false
      }
    },
    methods: {
      changeIndex(index) {
        this.currentIndex = index;
        this.$emit('tab-click',index);
      },
      
    },
    computed: {
      
    }
  }
</script>

<style>
  .TabControl {
    display: flex;
    font-size: 15px;
    background-color: #fff;
  }
  .tabc-item {
    flex: auto;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .tabc-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
    
  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>