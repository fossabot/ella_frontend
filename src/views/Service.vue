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
        return () => import("../views/404");
      }
      switch (this.service.type) {
        case 'page':
          return () => import("../components/Services/Page");
        case 'service':
          return () => import("../components/Services/Form");
        case 'group':
          return () => import("../components/Services/Group");
        default:
          return () => import("../views/404");
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
