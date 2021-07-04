<template>
  <div class="cart-bottom-bar">
    <div class="all-check">
      <check-button class="bottom-button" @click.native="allCheck" :is-checked="isSelectAll"></check-button>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计: ￥{{totalPrice}}
    </div>

    <div class="calculator" @click="calcClick">
      结算({{totalCount}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue';
  import { mapGetters } from "vuex";

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    methods: {
      allCheck() {
        if(this.isSelectAll){
          this.cartList.forEach((product)=> {
            product.isChecked = false
          })

          // for(let product of this.cartList){
          //   product.isChecked = false
          // }
        }
        else{
          this.cartList.forEach(product=> product.isChecked = true)

          // for(let product of this.cartList){
          //   product.isChecked = true
          // }
        }
      },

      calcClick() {
        if(!(this.cartList.find(product=> product.isChecked))){
          this.$toast.show("请选择商品")
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter((product)=> {
          return product.isChecked
        }).reduce((prev,cur)=> {
          return prev + cur.price*cur.count
        },0).toFixed(2)
      },
      totalCount() {
        return this.cartList.filter((product)=> {
          return product.isChecked
        }).reduce((prev,cur)=> {
          return prev+cur.count
        },0)
      },
      isSelectAll() {
        if(this.cartList.length===0){
          return false
        }
        return !this.cartList.find(product => {
          return !product.isChecked
        })

        // for (const product of this.cartList) {
        //   if(!product.isChecked){
        //     return false
        //   }
        // }
        // return true
        
        // return !(this.cartList.filter(product=> {
        //   return !product.isChecked
        // }).length)
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    height: 30px;
    background-color: #eee;
    position: relative;
    display: flex;
  }
  .all-check {
    width: 60px;
    height: 30px;
    display: flex;
    font-size: 13px;
    margin-left: 10px;
    
    align-items: center;
    /* margin-top: 5px; */
  }
  .all-check span {
    line-height: 20px;
  }
  .bottom-button {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
  .total-price {
    flex: auto;
    font-size: 14px;
    line-height: 30px;
    margin-left: 80px;
  }
  .calculator {
    font-size: 14px;
    line-height: 30px;
    background-color: orange;
    width: 70px;
    text-align: center;
  }
  
</style>