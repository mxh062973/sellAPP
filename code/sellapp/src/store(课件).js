import Vue from 'vue'
import Vuex from 'vuex'
import { getGoods } from './api/apis'

Vue.use(Vuex)


//1. 创建一个数据仓库(记住，不管vue应用有多大，都只能有一个仓库)
var store = new Vuex.Store({
    //仓库存储交互数据的地方
    state: {
        name: '张三',
        age: 18,
        list: [],
        peoples: [{id: '1', age: 18, name: 'zs'},
        {id: '2', age: 22, name: 'zs2'},
        {id: '3', age: 10, name: 'zs3'},
        {id: '4', age: 6, name: 'zs4'},
        {id: '5', age: 44, name: 'zs5'},
        {id: '6', age: 32, name: 'zs6'}]
    },

    //改变状态state的唯一方式
    //写一个mutation，然后使用commit去触发它
    //mutation是同步的，在函数内，不能发送任意请求
    mutations: {
        //改变name的通知mutation
        changeName(state, obj){
            state.name = obj.name
        },

        initlist(state, obj){
            state.list = obj.data
        }
    },

    //异步通知
    //1. 它不能直接改变state，应该提交Mutation让它去改
    //2. 它可以包含任意异步操作！！
    actions: {
        //初始化list
        async initlist(context){
            // 1. 发送请求拿到数据
            let res = await getGoods()
            // console.log(res.data.data , 'actionnnnnnnnnnnnnn')

             // 2. 提交一个mutation，让mutation去改变state
             context.commit({
                 type: 'initlist',
                 data: res.data.data
             })
        }
    },


    //计算属性（就是vuex的computed）
    //也会进行数据缓存，只要母体数据不发生变化，都不会重新计算
    //性能高！！！需要经常使用
    getters: {
        getpeople(state){
            return state.peoples.filter( obj => obj.age <= 18 )
        }
    }
})

//获取方式同computed   直接store.getters.属性名
console.log(store.getters.getpeople)


//触发mutation
// 提交方式一：字符串
// 参数1： mutation的名字  参数2： 要传入的参数
// store.commit('changeName', '王五')  

// 提交方式二：对象
// store.commit({
//     type: 'changeName',    //触发的函数名
//     name: '赵六'
// })


//触发action
// store.dispatch('initlist')
// store.dispatch({
//     type: 'initlist'
// })


//commit触发 mutation     dispatch触发  action


//取值
console.log(store.state)
export default store