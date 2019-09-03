<template>
  <div class="container">
    <div class="left_div">
      <!-- 所有betterscroll的DIV元素，下面必须有一个ul子节点，而且class必须是content -->
      <ul class="content">
        <!-- 滚动的元素 -->
        <div
          :class="{left_title: true, selected: curIndex == i}"
          v-for="(item, i) in list"
          @click="clickLeftTitle(i)"
        >
          <label>{{ item.name }}</label>
        </div>
      </ul>
    </div>

    <div class="right_div">
      <ul id="right_ul" class="content">
        <div :id="i" v-for="(item, i) in list">
          <!-- 标题 -->
          <h6>{{ item.name }}</h6>
          <!-- 下方食物 -->
          <div v-for="food in item.foods">
            <img :src="food.icon" />
            <label>{{ food.name }}</label>

            <button v-show="food.num > 0" @click="clickFoodDec(food.id)">-</button>
            <label v-show="food.num > 0">{{ food.num }}</label>
            <button @click="clickFoodAdd(food.id)">+</button>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../api/apis";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      // data: [], //数据源
      curIndex: 0, //当前左侧选中的索引
      heightArr: [] //元素高度数组
    };
  },
  created() {
    //初始化请求数据
    this.$store.dispatch("initlist");
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  },
  mounted() {
    //初始化左侧滚动区域
    this.left_scroll = new BScroll(".left_div", {
      click: true //让betterscroll允许点击
    });

    this.right_scroll = new BScroll(".right_div", {
      probeType: 3 //设置后，允许betterscroll派发滚动事件
    });
    this.right_scroll.on("scroll", obj => {
      //当前滚动的距离
      let _y = Math.abs(obj.y);
      //   console.log(_y);
      //   console.log(this.heightArr);

      // 如果当前滚动距离< 第一个元素的高度，固定设置curIndex为0
      if (_y < this.heightArr[0]) {
        this.curIndex = 0;
      } else {
        // 剩下格子的判断
        let total = 0;
        for (let i = 0; i < this.heightArr.length; i++) {
          let height = this.heightArr[i];
          total += height;

          if (_y >= total) {
            this.curIndex = i + 1;
          }
        }
      }
    });

    // 没有拿到ajax的响应，所以此时data还是[] 小的div还没被创建
  },
  updated() {
    // 只运行1次  提高代码性能
    if (this.heightArr.length == 0) {
      let ul = document.getElementById("right_ul");
      for (let elt of ul.childNodes) {
        this.heightArr.push(elt.offsetHeight);
      }
      console.log(this.heightArr);
    }
  },
  methods: {
    clickLeftTitle(index) {
      //点击时，改变当前索引值
      this.curIndex = index;

      //滚动到目标元素
      this.right_scroll.scrollToElement(document.getElementById(index), 300);
    },
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
      console.log(id)

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
.container {
  height: 400px;
  display: flex;

  .left_div {
    width: 100px;
    overflow: auto;

    .left_title {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: #f4f5f7;
      border-bottom: 1px solid #e4e5e7;
    }

    .selected {
      background-color: #fff;
    }
  }
  .right_div {
    overflow: auto;
    width: 100%;

    img {
      width: 60px;
    }
  }
}
</style>