<template>
  <div>
    <b-sidebar
        id="sidebar"
        backdrop
        shadow="true"
        right
        no-header>

      <template #footer="{}">
        <div class="bg-dark text-light align-items-center px-3 py-2">
          <p>Impressum</p>
          <p>Datenschutz</p>
          <p>Kontakt</p>
        </div>
      </template>

      <b-icon-x v-b-toggle:sidebar class="h4 float-left mt-2 ml-2 clickable"/>
      <div>
        <h4 class="mb-1">{{ mainData.title }}</h4>
        <p class="text-muted mb-0">{{ mainData.description }}</p>
      </div>
      <hr>
      <div>
        <side-bar-service v-for="service in mainData.services" :key="service.name" :service="service"/>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import SideBarService from "@/components/sidebarService";

export default {
  name: "Sidebar",
  components: {SideBarService},
  computed: {
    ...mapGetters(["mainData"])
  },
}
</script>

<style scoped lang="scss">
#sidebar {
  div {
    text-align: right;
    padding: 5px 10px;
  }
}
</style>