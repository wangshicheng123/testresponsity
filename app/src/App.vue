<template>
  <div id="app">
    <div id="nav">
      <!-- 重定向的router-view -->
      <router-link to="/">home</router-link>
      <router-link to="/redi/lishc/6878434">reditoabout</router-link> |
      <router-link to="/about/zhan/4654">About</router-link>
      <router-link to="/test/110">test页面</router-link>
    </div>
    <!-- 编程式导航到下一页 -->
    <button @click="go">go</button>
    <!-- 编程式导航到上一页 -->
    <button @click="back">back</button>
    <!-- 编程式导航到首页 -->
    <button @click="home">home</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    go(){
      this.$router.go(1);
    },
    back(){
      this.$router.go(-1);
    },
    home(){
      this.$router.push("/");
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
