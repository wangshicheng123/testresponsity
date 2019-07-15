<template>
  <div id="home">
    <p>普通用户权限：/viewFree</p>
    <p>VIP用户权限：/viewVip</p>
    <p>管理员用户权限：/delete , /add</p>
    <hr />
    用户状态： {{userStatus}}
    <br />
    用户名： {{userName}}
    <hr />
    <ol class="list">
      <li>
        <p @click="viewFree">访问"/video/viewFree"</p>
        <hr>
      </li>
      <li>
        <p @click="viewVip">访问"/video/viewVip"</p>
        <hr>
      </li>
      <li>
        <p @click="deleteVideo">访问"/video/delete"</p>
        <hr>
      </li>
      <li>
        <p @click="addVideo">访问"/video/add"</p>
        <hr>
      </li>
      <li>
        <p @click="addVipRole">添加用户Vip角色</p>
        <hr>
      </li>
      <li>
        <p @click="addAdminRole">添加用户admin角色</p>
        <hr>
      </li>
      <li>
        <p @click="deleteVipRole">删除用户Vip角色</p>
        <hr>
      </li>
      <li>
        <p @click="deleteAdminRole">删除用户admin角色</p>
        <hr>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userStatus: "用户未登录",
      userName: "默认用户名"
    };
  },
  created(){

  },
  methods: {
    viewFree() {
      this.$axios
        .post("http://localhost:3000/video/viewFree", {
          token: this.$store.state.token,
          func: "viewFree"
        })
        .then(res => {
          console.log(res.data);
        });
    },
    viewVip() {
      this.$axios
        .post("http://localhost:3000/video/viewVip", {
          token: this.$store.state.token,
          func: "viewVip"
        })
        .then(res => {
          console.log(res.data);
        });
    },
    deleteVideo() {
      this.$axios
        .post("http://localhost:3000/video/delete", {
          token: this.$store.state.token,
          func: "deleteVideo"
        })
        .then(res => {
          console.log(res.data);
        });
    },
    addVideo() {
      this.$axios
        .post("http://localhost:3000/video/add", {
          token: this.$store.state.token,
          func: "addVideo"
        })
        .then(res => {
          console.log(res.data);
        });
    },
    addVipRole() {
      this.$axios
        .post("http://localhost:3000/video/addVipRole", {
          token: this.$store.state.token,
          func: "addVipRole"
        })
        .then(res => {
          console.log(res.data);
        });
    },
    addAdminRole() {
      this.$axios
        .post("http://localhost:3000/video/addAdminRole", {
          token: this.$store.state.token,
          func: "addAdminRole"
        })
        .then(res => {
          console.log(res.data);
        });
    },
    deleteVipRole() {
      this.$axios
        .post("http://localhost:3000/video/deleteVipRole", {
          token: this.$store.state.token,
          func: "deleteVipRole"
        })
        .then(res => {
          console.log(res.data);
        });
    },
    deleteAdminRole() {
      this.$axios
        .post("http://localhost:3000/video/deleteAdminRole", {
          token: this.$store.state.token,
          func: "deleteAdminRole"
        })
        .then(res => {
          console.log(res.data);
        });
    }
  }
};
</script>

<style scoped>
</style>
