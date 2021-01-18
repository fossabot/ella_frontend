<template>
  <div id="root" class="box">
    <nav-bar-comp id="top" class="topbar"/>
    <div id="app" class="main" v-if="mainData">
      <div style="max-width: 800px;">
        <router-view/>
      </div>
    </div>
    <div v-else class="hider">
      <custom-spinner class="mt-2"/>
    </div>

    <sidebar/>
  </div>
</template>

<script>
import NavBarComp from "@/components/Navigation/NavBarComp";
import {mapGetters} from "vuex";
import CustomSpinner from "@/components/CustomSpinner";
import Sidebar from "@/components/Navigation/Sidebar";
import {TITLE, THEME_COLOR} from "../config"
export default {
  name: 'App',
  components: {
    Sidebar,
    CustomSpinner,
    NavBarComp
  },
  created() {
    this.$store.commit("getMainData");

    document.title = TITLE;

    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", THEME_COLOR);
  },
  computed: {
    ...mapGetters(["mainData"])
  },
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
  padding: 8px 12px;
  //text-align: center;
}

.hider {
  width: 100vw;
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
