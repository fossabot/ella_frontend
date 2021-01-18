<template>
  <div class="about">
    <h1>Ella</h1>
    <h2>v{{version}}</h2>
  </div>
</template>
<script>
export default {
  name:"About",
  computed: {
    version() {
      return process.env.PACKAGE_VERSION;
    }
  }
}
</script>
