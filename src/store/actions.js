export default {
  addCart(context,payload) {
    return new Promise((resolve,reject)=> {
      // state.cartList.push(payload)
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){
        // oldProduct.count++
        context.commit('increment', oldProduct)
        resolve('加入购物车成功')
      }
      else{
        // state.cartList.push(payload)
        context.commit('addCartList',payload)
        resolve('加入购物车成功')
      }
    })
  }
}