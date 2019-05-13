<template>
  <div>
    <Aplayer
      showLrc
      float
      autoplay
      :list="musicList"
      :music="{
    title: '我要你',
    artist: '老狼',
    src: 'http://up.mcyt.net/down/43422.mp3',
    pic: 'http://omratag7g.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.jpg'
  }"
    />
  </div>
</template>

<script>
// 引入音乐播放组件
import Aplayer from "vue-aplayer";

import axios from "axios"
export default {
    data(){
        return{
            musicList:[]
        }
    },
  // 注册组件
  components: {
    Aplayer
  },
  created(){
    // 在页面初始化的时候进行请求数据
    axios.get("/data/musicdata.json").then((res)=>{
      // 由于我们需要的数据和接口请求来的数据属性不一致，所以我们
      // 通过循环数组来生成一个新的数组
      res.data.musicData.forEach((item,index)=>{
        let obj={
          src: item.src,
          title: item.title,
          artist: item.author,
          pic: item.musicImgSrc,
          lrc: `http://localhost:8080/${item.lrc}`
        }
        this.musicList.push(obj);
      });
      console.log(this.musicList);
    });
  }

};
</script>

<style scoped>
</style>
