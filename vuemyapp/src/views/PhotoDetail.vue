<template>
    <div class="img-detail">
        <img :src="src" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return{
            index: this.$route.params.index
        }
    },
    created(){
        // console.log(this.index);
    },
    computed:{
        src(){
            return this.$store.state.photoData[this.index].src
        }
    }
}
</script>

<style scoped>
    .img-detail{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background: #000;
    }
    .img-detail img{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%,-50%);
    }
</style>
