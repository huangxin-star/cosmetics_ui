<template>
  <div>
    <h1>哈哈哈</h1>
    <tail style="margin-top: 25px"></tail>
  </div>
</template>

<script>
import Tail from "@/views/user/tail";

export default {
  name: "newsDetailPage",
  components: {
    Tail,
  },
  data() {
    return {
      isShow: false,
      type:''
    };
  },
  created() {

  },
};
</script>

<style scoped>
</style>
