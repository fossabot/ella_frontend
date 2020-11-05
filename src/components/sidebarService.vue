<template>
  <p>{{service.title}}</p>
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

</style>