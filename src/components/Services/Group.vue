<template>
  <div>
    <h2>{{ service.title }}</h2>
    <p class="text-muted">{{ service.description }}</p>
    <side-bar-service v-for="service in service.services" :key="service.name" :service="service"/>
  </div>
</template>

<script>
import serviceMixin from "@/components/Services/serviceMixin";
import SideBarService from "@/components/Navigation/sidebarService";

export default {
  name: "Group",
  components: {SideBarService},
  mixins: [serviceMixin]
}
</script>

<style scoped>

</style>