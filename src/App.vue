<template>
  <div class="box">
    <nav-bar-comp class="topbar"/>
    <div id="app" class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBarComp from "@/components/NavBarComp";

export default {
  name: 'App',
  components: {
    NavBarComp
  },
  created() {
    console.log(process.env.VUE_APP_API_ROOT_URL);
    this.$store.commit("getMainData");
  }
}
</script>

<style lang="scss">
@import "styles";
.box {

  display: flex;
  flex-flow: column;
  height: 100%;
  align-items: center;

  .topbar {
    flex: 0 1 auto;
    width: 100vw;
  }

  .main {
    flex: 1 1 auto;
    overflow: hidden;
    padding: 5px 8px;
    max-width: 800px;
    width: 100vw;
  }


  //Scrollbars

  $border-radius-scroll: 8px;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: $border-radius-scroll !important;
    background-color: white !important;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $primary !important;
    border-radius: $border-radius-scroll !important;
  }
}



</style>
