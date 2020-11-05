<template>
  <div class="">
    <span v-html="mainData.bodytext"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  computed: {
    ...mapGetters(["mainData"])
  },
}
</script>
