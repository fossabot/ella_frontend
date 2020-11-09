<template>
  <div style="padding: 5px 0">
    <div class="cust">
      <h6>{{ service.title }}</h6>
      <p class="text-muted">{{ service.description }}</p>
    </div>
    <hr class="mb-1">
  </div>
</template>

<script>
export default {
  name: "sideBarService",
  props: {
    service: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.cust {
  text-align: right;
  padding: 0 10px;
}
</style>