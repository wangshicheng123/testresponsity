<template>
  <div id="app">
    <common-header :selectMenu="selectMenu"></common-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <common-footer :menu="menu" :selectMenu="selectMenu" @change="change"></common-footer>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader.vue";
import CommonFooter from "@/components/CommonFooter.vue";
export default {
  components:{
    CommonHeader,
    CommonFooter
  },
  data(){
    return {
      menu: [
        {
          name: "电影",
          path: "/movie",
          bg: "#f00"
        },
        {
          name: "音乐",
          path: "/music",
          bg: "#0f0"
        },{
          name: "书籍",
          path: "/book",
          bg: "#00f"
        },
        {
          name: "图片",
          path: "/photo",
          bg: "yellow"
        }
      ],
      selectMenu: {
          name: "电影",
          path: "/movie",
          bg: "#f00"
        }

    }
  },
  methods:{
    change(index){
      this.selectMenu=this.menu[index]
    }
  },
  created(){
    this.menu.forEach((item,index)=>{
      if(item.path==this.$route.path){
        this.selectMenu=this.menu[index];
      }
    });
  }
}
</script>


<style>
 .content{
   padding: 1rem 0px;
 }
</style>
