<template>
  <component :service="service" :is="component"/>
</template>

<script>
import {mapGetters} from "vuex";
import Page from "../components/Services/Page"
import Form from "@/components/Services/Form";
import Group from "@/components/Services/Group";

export default {
  name: "Service",
  computed: {
    component() {
      switch (this.service.type) {
        case 'page':
          return Page;
        case 'service':
          return Form;
        case 'group':
          return Group;
        default:
          return null;
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