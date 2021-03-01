<template>
  <div class="about">
    <h1>Ella</h1>
    <h2>v{{version}}</h2>
  </div>
</template>
<script>
/**
 * @module About
 * @category Views
 * @description A hidden about page. Shows the app's version
 */
export default {
  name:"About",
  computed: {
    version() {
      return process.env.PACKAGE_VERSION;
    }
  }
}
</script>
