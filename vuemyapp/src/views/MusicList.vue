<template>
  <div>
    <Aplayer
      autoplay
      :music="{
    title: 'secret base~君がくれたもの~',
    artist: 'Silent Siren',
    src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
  }"
    />
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
export default {
    data(){
        return{
            musicList:[]
        }
    },
  components: {
    Aplayer
  },
  created(){
    // 在页面初始化的时候进行请求数据
  }

};
</script>

<style scoped>
</style>
