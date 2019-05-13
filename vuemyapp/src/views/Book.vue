<template>
  <div>
    <swipe class="my-swipe">
      <swipe-item class="slide1" v-for="(item,index) in imgs" :key="index">
          <img :src="item" alt="">
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
import "vue-swipe/dist/vue-swipe.css";
import { Swipe, SwipeItem } from "vue-swipe";
export default {
  data() {
    return {
      imgs: [
        "https://img3.doubanio.com/lpic/s24468373.jpg",
        "https://img3.doubanio.com/lpic/s27102925.jpg",
        "https://img3.doubanio.com/lpic/s6989253.jpg"
      ]
    };
  },
  components: {
    Swipe,
    SwipeItem
  }
};
</script>

<style scoped>
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.my-swipe img{
    width: 100%;
}
</style>
