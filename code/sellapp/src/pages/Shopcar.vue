<template>
  <div>
    <h3 v-show="shopcarfoods.length == 0">购物车空空如也</h3>
    <!-- 只渲染所有数量>0的数据 -->

    <div v-for="food in shopcarfoods">
      <label>{{ food.name }}</label>

      <button v-show="food.num > 0" @click="clickFoodDec(food.id)">-</button>
      <label v-show="food.num > 0">{{ food.num }}</label>
      <button @click="clickFoodAdd(food.id)">+</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    shopcarfoods() {
      return this.$store.getters.shopcarfoods;
    }
  },

  methods: {
    //点击食品减少
    clickFoodDec(id) {
      this.$store.commit({
        type: "changeFoodNum",
        id,
        num: -1
      });
    },
    //点击食品增加
    clickFoodAdd(id) {
      this.$store.commit({
        type: "changeFoodNum",
        id,
        num: 1
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>