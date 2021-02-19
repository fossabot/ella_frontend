<template>
  <component :service="service" :is="component"/>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Service",
  computed: {
    component() {
      if (!this.service) {
        return () => import("./notFound");
      }
      switch (this.service.type) {
        case 'page':
          return () => import(/* webpackChunkName: "Page" */ "../components/Services/Page");
        case 'service':
          return () => import(/* webpackChunkName: "Form" */ "../components/Services/Form");
        case 'group':
          return () => import(/* webpackChunkName: "Group" */ "../components/Services/Group");
        default:
          return () => import(/* webpackChunkName: "notFound" */ "./notFound");
      }
    },
    service() {
      function searchRecursively(searchIn, searchFor) {
        for (const s of searchIn.services) {
          if (s.name === searchFor) return s;
          if (s.type === 'group') {
            const r = searchRecursively(s, searchFor);
            if (r !== null) {
              return r;
            }
          }
        }
        return null;
      }

      return searchRecursively(this.mainData, this.$route.params.service);
    },
    ...mapGetters(["mainData"])
  },
}
</script>

<style scoped>

</style>
