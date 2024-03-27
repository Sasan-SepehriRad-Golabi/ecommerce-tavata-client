<template>
  <v-app>
    <MainView />
  </v-app>
</template>

<script>
import MainView from "@/views/MainView.vue"
export default {
  components: {
    MainView
  },
}
</script>
<style>
@font-face {
  font-family: myfont;
  src: url('./client/cassets/fonts/Yekan.woff');
}

* {
  font-family: myfont;
}
</style>
