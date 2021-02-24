<template>
  <div>
<!--    <h2>{{ service.title }}</h2>-->
<!--    <p class="text-muted">{{service.description}}</p>-->
    <span v-html="service.text"/>
    <ActionButtonGroup v-if="service['formactions']" :service="service" :stacked="true" :save-button="false" :selected="selectFormaction"/>
  </div>
</template>

<script>
import serviceMixin from "@/components/Services/serviceMixin";
import ActionButtonGroup from "@/components/Services/ActionButtonGroup"

export default {
  name: "Page",
  mixins: [serviceMixin],
  components: [ActionButtonGroup],
  methods: {
    selectFormaction(index) {
      this.$router.push("/services/"+this.service["formactions"][index].name)
    }
  },
}
</script>

<style scoped>

</style>
