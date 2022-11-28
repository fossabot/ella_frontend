<template>
  <div class="">
    <span v-html="mainData.bodytext"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

/**
 * @module Home
 * @category Views
 * @description The start view of the app. Renders the default service
 */
export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(["mainData"])
  },
}
</script>
