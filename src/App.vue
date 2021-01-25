<template>
  <div id="root" class="box" v-touch:swipe="swipeHandler">
    <nav-bar-comp id="top" class="topbar"/>
    <div id="app" class="main" v-if="mainData && !mainData.error">
      <div style="max-width: 800px;">
        <router-view/>
      </div>
    </div>
    <div v-else-if="!(mainData && mainData.error)" class="hider">
      <custom-spinner class="mt-2"/>
    </div>
    <div class="mt-5 w-75" v-else>
      <b-jumbotron bg-variant="danger" :text-variant="textVariant">
        <template #header>Fehler!</template>
        <template #lead>Bitte versuchen Sie es später erneut!</template>
        ({{mainData.error}})
      </b-jumbotron>
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
import {isLightColor, getCSSVariable} from "@/utilities/globals.mjs";

export default {
  name: 'App',
  components: {
    Sidebar,
    CustomSpinner,
    NavBarComp
  },
  mounted() {
    if ('launchQueue' in window) {
      window.launchQueue.setConsumer((launchParams) => {
        // Nothing to do when the queue is empty.
        if (!launchParams.files.length) {
          return;
        }
        const fileHandle = launchParams.files[0];
        fileHandle.getFile().then(res => {
          res.text().then(text => {
            this.$store.commit("load", JSON.parse(text));
            this.$router.push("/services/" + JSON.parse(text).name);
          })
        });
      });
    }
  },
  created() {
    this.$store.commit("getMainData");

    document.title = TITLE;

    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", THEME_COLOR);
  },
  computed: {
    textVariant() {
      return isLightColor(getCSSVariable("danger")) ? 'dark' : 'light';
    },
    ...mapGetters(["mainData"])
  },
  methods: {
    swipeHandler(evt) {
      if (evt === "left") {
        this.$store.commit('sidebar', true);
      }
      if (evt === "right") {
        this.$store.commit('sidebar', false);
      }

    }
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
