import axios from 'axios'

const IP = 'http://127.0.0.1:3333'
// const IP = 'http://127.0.0.3:3333'   //zhangsan
// const IP = 'http://127.0.0.8:3333'   //lisi
// const IP = 'http://127.0.0.2:3333'
// const IP = 'http://127.0.0.1:3333'


//获取商家信息
export function getSeller(){
    return axios.get( IP + '/api/seller')
}

//获取商品信息
export function getGoods(){
    return axios.get( IP + '/api/goods')
}

//获取评论信息
export function getRatings(){
    return axios.get( IP + '/api/ratings')
}
