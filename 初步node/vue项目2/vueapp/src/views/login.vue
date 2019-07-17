<template>
  <div class="about">
    <h1>这是用户的登陆页面</h1>name:
    <input type="text" name="name" v-model="name" />
    <br />pass:
    <input type="text" name="pass" v-model="pass" />
    <br />
    <button type="text" @click="login">登陆</button>
    <hr />
    <div style="text-align: center;">
      <p>
        <a id="githubLogin" :href="url">Github登陆</a>
        {{url}}
      </p>
      <hr />
      <!-- <p id="qqLogin" @click="qqLogin">QQ登陆</p> -->
      <hr />
      <!-- <p id="weichatLogin" @click="weichatLogin">微信登陆</p> -->
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      pass: "",
      authorize_uri:"https://github.com/login/oauth/authorize",
      redirect_uri: "http://localhost:3000/oauth/redirect",
      client_id: "7b42a88712cd9fd024b9",
      client_secret: "cbebd4aedca1873d7cac0ae12327573ccf900e96"
    };
  },
  computed: {
    url(){
      return this.authorize_uri+"?client_id="+this.client_id+"&redirect_uri="+this.redirect_uri;
    }
  },
  methods: {
    login() {
      this.$axios
        .post("/api/login", {
          name: this.name,
          pass: this.pass,
          token: this.$store.state.token
        })
        .then(res => {
          console.log(res.data.message);
          console.log(res);
          this.$store.state.token = res.data.token;
          localStorage.setItem("token", JSON.stringify(res.data.token));
          console.log(this.$store.state.token);
        });
    }
  }
};
</script>

