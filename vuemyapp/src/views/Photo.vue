<template>
    <div>
        <div class="img-container">
            <img :src="item.src" v-for="(item,index) in $store.state.photoData" :key="index"  @click="showDetail(index)" alt="">
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return {
            photoData: []
        }
    },
    created(){ 
        axios.get("/data/photodata.json").then((res)=>{
            // 把数据存在state状态变量里面进行存贮，以便所有页面都可以进行使用
            this.$store.commit("addPhoto",res.data.photoData)
        });
    },
    methods:{
        showDetail(index){
            this.$router.push("/photoDetail/"+index);
        }
    }

}
</script>

<style scoped>
    .img-container img{
        width: 50%;
    }
</style>
