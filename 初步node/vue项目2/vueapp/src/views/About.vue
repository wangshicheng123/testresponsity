<template>
  <div class="about">
    <h1>这是用户的登陆页面</h1>
    name: <input type="text" name="name" v-model="name" />
    <br />
    pass: <input type="text" name="pass" v-model="pass" />
    <br />
    <button type="text" @click="login">登陆</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: "",
      pass: ""
    }
  },
  methods:{
    login(){
      this.$axios.post("/api/login",{"name":this.name,"pass":this.pass}).then((res)=>{
        console.log(res.data.message);
        console.log(res);        
      });
    }
  }
}
</script>

