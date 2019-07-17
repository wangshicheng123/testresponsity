<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>这是用户的注册页面</h1>name:
    <input type="text" name="name" v-model="name" />
    <br />pass:
    <input type="text" name="pass" v-model="pass" />
    <br>
    <button type="text" @click="reg">注册</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      name: "",
      pass: "",
      result: ""
    };
  },
  methods: {
    reg() {
      this.$axios.post("/api/reg",{"name":this.name,"pass":this.pass}).then(res => {
        this.result = res.data.message;
        console.log(this.result);  // 返回注册结果（可以进行页面的跳转）
      });
    }
  },
  name: "home",
  components: {
    // HelloWorld
  }
};
</script>
