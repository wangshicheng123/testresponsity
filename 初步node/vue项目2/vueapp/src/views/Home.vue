<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>这是用户的注册页面</h1>
    <form action="">
      name: <input type="text" name="name" v-model="name"><br>
      pass: <input type="text" name="pass" v-model="pass"><br>
      <button type="text" @click="reg">注册</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data(){
    return{
      name: "",
      pass: ""
    }
  },
  methods:{
    reg(){
      console.log(this.name);
      console.log(this.pass);
      this.$axios.get("http://localhost:3000/test").then((res)=>{
        console.log(res);
      });
    }
  },
  name: 'home',
  components: {
    // HelloWorld
  }
}
</script>
