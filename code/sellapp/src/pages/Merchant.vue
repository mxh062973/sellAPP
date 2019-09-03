<template>
    <div>
        <h1 @click="clickTitle">商家</h1>
        <h2>{{ name }}</h2>
    </div>
</template>

<script>
    export default {
        methods: {
            clickTitle(){
                this.$store.commit({
                    type: 'changeName',
                    name: '李四'
                })
            }
        },
        computed: {
            name(){
                return this.$store.state.name
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>