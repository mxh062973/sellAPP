import Vue from 'vue'
import Vuex from 'vuex'
import { getGoods } from './api/apis'

//全局注册
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        name: '张三',
        list: []    //商品数据
    },
    mutations: {
        //修改名字
        changeName(state, obj) {
            state.name = obj.name
        },
        initlist(state, obj) {
            state.list = obj.data
        },

        //改变商品数量
        changeFoodNum(state, param) {
            //obj.id 当前要改变数量的食品ID
            //obj.num 要改变的数量 -1 1

            for (let obj of state.list) {
                for (let food of obj.foods) {
                    if(food.id == param.id){
                        food.num += param.num
                        return  //提升代码性能
                    }
                }
            }

        }
    },
    actions: {
        async initlist(context) {
            //1 .发请求  拿数据
            let res = await getGoods()

            let id = 0
            //前端制作自己的前端数据
            let arr = res.data.data
            for (let obj of arr) {
                for (let food of obj.foods) {
                    food.num = 0
                    food.id = id++
                }
            }

            //2. 提交mutation    
            context.commit({
                type: 'initlist',
                data: arr
            })

        }
    },
    getters: {
        //过滤所有数量>0的数据，返回数量不为0的食品数组
        shopcarfoods(state){
            let arr = []

            for (let obj of state.list) {
                for (let food of obj.foods) {
                    if(food.num > 0){
                        arr.push(food)
                    }
                }
            }

            return arr
        }
    }
})