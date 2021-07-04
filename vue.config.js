const path = require('path')  //引入path模块
function resolve(dir) {
  return path.join(__dirname,dir)
}
module.exports= {
  chainWebpack: (config)=> {
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('components',resolve('./src/components'))
    .set('views',resolve('./src/views'))
    .set('assets',resolve('./src/assets'))
    .set('common',resolve('./src/common'))
    .set('network',resolve('./src/network'))
  },
}


// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         '@': './src',
//         'assets': '@/assets',
//         'common': '@/common',
//         'components': '@/components',
//         'network': '@/network',
//         'views': '@/views',
//       }
//     }
//   }
// }