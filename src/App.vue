<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  beforeDestroy(){
     this.$http.post("asasasasasas")
      // window.onbeforeunload = function (e) {
      //   var storage = window.localStorage;
      //   storage.clear()
      // }

    }
}

</script>

<style>

</style>
