module.exports = {
  Plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,   //视窗的宽度，对应设计稿的宽度
      viewportHeight: 667,  //视窗的高度，对应设计稿的高度
      unitPrecision: 5, //指定px转换为视窗单位值的小数位数
      viewportUnit: 'vw', //指定需要转换成的视窗单位
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'], //指定不需要转换的类
      minPixelValue: 1, //小于等于1px不转换为视窗单位
      mediaQuery: false //是否允许在媒体查询中转换px
    }
  }
}