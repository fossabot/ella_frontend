<template>
  <div>
    <h2>{{ service.title }}</h2>
    <p class="text-muted">{{service.description}}</p>
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