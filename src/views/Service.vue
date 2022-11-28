<template>
  <component :service="service" :is="component"/>
</template>

<script>
import {mapGetters} from "vuex";

/**
 * @module Service
 * @category Views
 * @description The Service view. Needs the service name as parameter in the url (/service/nameOfService).
 * @vue-computed {Object} component Determines the component needed for the given service
 * @vue-computed {Object} service Searches recursively (because of groups) for the service, whose name is given by the parameter
 */
export default {
  name: "ServiceView",
  computed: {
    component() {
      if (!this.service) {
        return () => import("./notFound.vue");
      }
      switch (this.service.type) {
        case 'page':
          return () => import("../components/Services/Page.vue");
        case 'service':
          return () => import("../components/Services/Form.vue");
        case 'group':
          return () => import("../components/Services/Group.vue");
        case 'media':
          return () => import("../components/Services/Media.vue");
        default:
          return () => import("./notFound.vue");
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
