<template>
  <json-form :json="service.form"></json-form>
</template>

<script>
import jsonForm from "@educorvi/vue-json-form"
import serviceMixin from "@/components/Services/serviceMixin";

export default {
  name: "Form",
  mixins: [serviceMixin],
  components: {jsonForm}
}
</script>

<style scoped>

</style>