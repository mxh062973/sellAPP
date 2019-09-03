<template>
  <div>
    <div class="top_div">
      <img :src="avatar" />
      <p>{{ name }}</p>
      <p>{{ description }}/{{ deliveryTime }}分钟送达</p>
    </div>
    <div class="title_div">
      <router-link to="/">商品</router-link>
      <router-link to="/evaluate">评价</router-link>
      <router-link to="/merchant">商家</router-link>
    </div>
    <!-- 出口 -->
    <router-view></router-view>

    <!-- 购物车条 -->
    <div class="bottom_div">
      <Poptip placement="top-start" width="300">
          <!-- 要点击的组件 -->
        <img :src="getfoodsSrc" />   
        <div class="api" slot="content">
            <!-- 装你要弹出来的内容 -->
            <Shopcar/>
        </div>
      </Poptip>

      <!-- <img v-else src="../assets/imgs/icon_shopcar_off.png" /> -->
      <label class="totalprice">总价格：{{ gettotalprice }}</label>
      <!-- <button>结算</button> -->
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
import Shopcar from './Shopcar'

export default {
  data() {
    return {
      avatar: "", //商家头像
      name: "", //店铺名称
      description: "", //配送方式
      deliveryTime: 0, //配送时间
    };
  },
  computed:{
    getfoodsSrc(){
      //根据购物车数量来决定显示哪张图片
      if(this.$store.getters.shopcarfoods.length > 0){
        return require("../assets/imgs/icon_shopcar_on.png")
      }

      return require("../assets/imgs/icon_shopcar_off.png")
    },
    //获取总价格
    gettotalprice(){

      let total = 0
      for(let food of this.$store.getters.shopcarfoods){
        total += food.num * food.price
      }

      return total

    }
  },
  async created() {
    // async  await 终极异步解决方案
    // async: 异步函数，如果想要使用await指令，只能在async函数中使用

    //发送请求获取响应 获取商家信息
    // getSeller().then((res) => {
    //     console.log(res.data.data)
    // })

    // await： 可以等待异步执行完毕
    let res = await getSeller();
    let data = res.data.data;

    //保存数据到data内
    this.avatar = data.avatar;
    this.name = data.name;
    this.description = data.description;
    this.deliveryTime = data.deliveryTime;

    // // //发送5次请求，每次请求需要等待上一次请求发送完毕在发
    // new Promise().then(() => {

    //         xxx
    //         xxx
    //         xxx
    //         xxx
    //         xxx
    //         xxx
    //         xxx
    //     new Promise().then(() => {

    //         new Po

    //     })
    // })
  },
  components: {
      Shopcar
  }
};
</script>

<style lang="less" scoped>
.top_div {
  display: flex;
  img {
    width: 30%;
  }
}

.title_div {
  display: flex;
  justify-content: space-around;
}

.bottom_div {
  height: 50px;
  width: 100%;
  background-color: #3b3b3c;
  position: fixed;
  bottom: 0;

  img {
    width: 50px;
  }

  .totalprice{
    font-size: 24px;
    color: #FFF;
  }

}
</style>