import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/Goods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',  //监听的hash值
      name: 'goods', //路由的名字
      component: Goods //对应加载的组件
    },
    {
      //评价
      path: '/evaluate',
      name: 'evaluate',
      component: () => import('./pages/Evaluate.vue')
    },
    {
      //商家
      path: '/merchant',
      name: 'merchant',
      component: () => import('./pages/Merchant.vue')
    }
  ]
})
