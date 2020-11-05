<template>
  <b-navbar id="navbar" :type="isLightColor?'light':'dark'" class="navbarCustom" variant="primary">
    <b-navbar-brand href="#">{{ (mainData || {title: env.VUE_APP_TITLE}).title }}</b-navbar-brand>
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
