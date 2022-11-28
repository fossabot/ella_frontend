<template>
<b-jumbotron bg-variant="secondary" :text-variant="isLightColor?'dark':'light'" header="404" lead="Diese Seite wurde leider nicht gefunden...">
<router-link style="color: inherit" to="/">Zurück zur Startseite</router-link>
</b-jumbotron>
</template>

<script>
import {isLightColor, getCSSVariable} from "/src/utilities/globals.mjs";

/**
 * @module notFound
 * @category Views
 * @description A view that indicates, that no matching service was found
 */
export default {
name: "notFoundView",
  computed: {
    isLightColor() {
      return isLightColor(getCSSVariable('secondary'));
    }
  },
}
</script>

<style scoped>

</style>
