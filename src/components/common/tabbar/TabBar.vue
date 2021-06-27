<template>
  <!-- <div> -->
    <!-- 占位容器 -->
    <!-- <div class="placegolder-container"></div> -->
    <div class="tabbar">
      <slot></slot>
    </div>
  <!-- </div> -->
</template>

<script>
  export default {
    name: "tabbar",
  }
</script>

<style>
  .tabbar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px -1px 1px rgba(100, 100 , 100, 0.1);
  }
  /* 解决fixed定位脱标的问题 */
  .placegolder-container {
    height: 49px;
  }
</style>