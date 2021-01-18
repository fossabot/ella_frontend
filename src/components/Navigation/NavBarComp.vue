<template>
  <b-navbar id="navbar" :type="isLightColor?'light':'dark'" class="navbarCustom" variant="primary">
    <b-navbar-brand to="/">
      <img src="@/assets/logo.png" alt="Logo" id="logo" v-if="img"/>
      <span class="title-text" v-if="mainData && txt">{{ mainData.title }}</span>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-button id="sidebarbutton" variant="light" v-b-toggle:sidebar class="float-right"><b-icon-justify/></b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {isLightColor} from "@/utilities/globals.mjs";
import {THEME_COLOR, NAVBAR_VARIANTS, NAVBAR_STYLE} from "../../../config";
import {mapGetters} from "vuex";

export default {
  name: "NavBarComp",
  computed: {
    isLightColor() {
      return isLightColor(THEME_COLOR);
    },
    img() {
      return NAVBAR_STYLE !== NAVBAR_VARIANTS.NAME;
    },
    txt() {
      return NAVBAR_STYLE !== NAVBAR_VARIANTS.LOGO;
    },
    ...mapGetters(["mainData"]),

  }
}
</script>

<style lang="scss" scoped>
.navbarCustom {
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
}
#logo {
  height: 40px;
  margin-right: 25px;
}
</style>
