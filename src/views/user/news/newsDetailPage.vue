<template>
  <div>
    <h1>111</h1>
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
    };
  },
  created() {
    console.log(this.$route.query.type);
  },
};
</script>

<style scoped>
</style>
