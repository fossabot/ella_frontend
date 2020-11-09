<template>
<b-jumbotron bg-variant="primary" :text-variant="isLightColor?'dark':'light'" header="404" lead="Diese Seite wurde leider nicht gefunden...">
<router-link style="color: inherit" to="/">Zurück zur Startseite</router-link>
</b-jumbotron>
</template>

<script>
import {isLightColor} from "@/utilities/globals";

export default {
name: "404",
  computed: {
    isLightColor() {
      return isLightColor(process.env.VUE_APP_THEME_COLOR);
    }
  },
}
</script>

<style scoped>

</style>