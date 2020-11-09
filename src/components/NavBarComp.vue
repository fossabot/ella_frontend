<template>
  <b-navbar id="navbar" :type="isLightColor?'light':'dark'" class="navbarCustom" variant="primary">
    <b-navbar-brand to="/">
      <span v-if="mainData">{{ mainData.title }}</span>
      <b-skeleton v-else width="120px" height="28px"></b-skeleton>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-button id="sidebarbutton" variant="light" v-b-toggle:sidebar class="float-right"><b-icon-justify/></b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {isLightColor} from "@/utilities/globals";
import {mapGetters} from "vuex";

export default {
  name: "NavBarComp",
  computed: {
    isLightColor() {
      return isLightColor(process.env.VUE_APP_THEME_COLOR);
    },
    env() {
      return process.env;
    },
    ...mapGetters(["mainData"])
  },
}
</script>

<style lang="scss" scoped>
.navbarCustom {
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
}
</style>
