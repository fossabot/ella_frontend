<template>
<b-jumbotron bg-variant="secondary" :text-variant="isLightColor?'dark':'light'" header="404" lead="Diese Seite wurde leider nicht gefunden...">
<router-link style="color: inherit" to="/">Zurück zur Startseite</router-link>
</b-jumbotron>
</template>

<script>
import {isLightColor, getCSSVariable} from "@/utilities/globals.mjs";

export default {
name: "404",
  computed: {
    isLightColor() {
      return isLightColor(getCSSVariable('secondary'));
    }
  },
}
</script>

<style scoped>

</style>
