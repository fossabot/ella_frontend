<template>
<span v-html="customHTML"/>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "HTMLResponseView",
  computed: {...mapGetters(["customHTML"])}
}
</script>

<style scoped>

</style>
