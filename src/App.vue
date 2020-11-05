<template>
  <div class="box">
    <nav-bar-comp id="top" class="topbar"/>
    <div id="app" class="main">
      <div style="max-width: 800px;">
        <router-view/>
      </div>
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

.main, .topbar {
  width: 100%;
}

#top {
  position: sticky;
  left: 0;
  top: 0;
}
.box {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.main {
  max-width: 900px;
  text-align: center;
}

/**
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
    padding: 5px 8px;
    width: 100vw;
    overflow: scroll;
  }


  //Scrollbars

  $border-radius-scroll: 0px;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }


  ::-webkit-scrollbar-track {
    border-radius: $border-radius-scroll !important;
    background-color: transparent !important;
  }


  ::-webkit-scrollbar-thumb {
    background: $primary !important;
    border-radius: $border-radius-scroll !important;
  }
}
**/


</style>
