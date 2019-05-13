<template>
    <div>
        <img :src="item.bg" alt="" v-for="(item, index) in musicClass" :key="index" @click="goList">
        
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return {
            musicClass: []
        }
    },
    created(){
        axios.get("/data/musiclist.json").then((res)=>{
            this.musicClass=res.data.albums;
        });
    },
    methods:{
        goList(){
            this.$router.push("/musicList");
        }
    }
}
</script>

<style scoped>
    img{
        width: 50%;
    }
</style>
