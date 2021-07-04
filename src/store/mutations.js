export default{
  increment(state, payload) {
    payload.count++
  },
  addCartList(state, payload) {
    payload.isChecked = false
    state.cartList.push(payload)
  },
  // check(state, payload) {
  //   payload.isChecked = !payload.isChecked
  // }
}