<template>
  <b-navbar id="navbar" :type="isLightColor?'light':'dark'" class="navbarCustom" variant="primary">
    <b-navbar-brand>
      <router-link to="/">
        <img v-if="img" id="logo" alt="Logo" src="@/assets/logo.png"/>
      </router-link>
      <span v-if="mainData && txt" class="title-text">{{ mainData.title }}</span>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-button id="sidebarbutton" class="float-right" variant="light" @click="$store.commit('sidebar', true)">
        <b-icon-justify/>
      </b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {isLightColor} from "@/utilities/globals.mjs";
import {NAVBAR_STYLE, NAVBAR_VARIANTS, THEME_COLOR} from "../../../config";
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
