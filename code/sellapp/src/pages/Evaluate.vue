<template>
    <div>
        <h1>评价</h1>
        <h3>{{ name }}</h3>

        <!-- 根据整数来进行循环？ -->
        <img v-for="i in getInt" src="../assets/imgs/star36_on@3x.png" />
        <!-- 根据小数来决定是否显示 -->
        <img v-show="getFloat" src="../assets/imgs/star36_half@3x.png" />
    </div>
</template>

<script>
    import { getRatings } from '../api/apis'
    export default {
        data(){
            return {
                point: 2.9
            }
        },
        computed: {
            name(){
                return this.$store.state.name
            },
            //获取整数
            getInt(){
                return Math.floor(this.point)
            },
            //获取小数
            getFloat(){
                // this.point % 1
                // 1. 字符串
                // 2. 数字
                let num = this.point - Math.floor(this.point)

                return num >= 0.5
            }
        },
        async created(){
            let res = await getRatings()
            console.log(res)
        }
    }
</script>

<style lang="scss" scoped>

</style>