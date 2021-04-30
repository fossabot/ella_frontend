<template>
<span v-html="customHTML"/>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "HTMLResponse",
  computed: {...mapGetters(["customHTML"])}
}
</script>

<style scoped>

</style>
