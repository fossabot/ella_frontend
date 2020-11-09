<template>
  <div>
    <h2>{{ service.title }}</h2>
    <span v-html="service.text"/>
  </div>
</template>

<script>
import serviceMixin from "@/components/Services/serviceMixin";

export default {
  name: "Page",
  mixins: [serviceMixin]
}
</script>

<style scoped>

</style>