<template>
  <div>
    <b-sidebar
        id="sidebar"
        backdrop
        shadow="true"
        right
        no-header>

      <!--      <template #footer="{}">-->
      <!--        <b-row style="background-color: grey; max-width: 100% !important;">-->
      <!--          <b-col>-->
      <!--            Impressum-->
      <!--          </b-col>-->
      <!--          <b-col>-->
      <!--            Impressum-->
      <!--          </b-col>-->
      <!--          <b-col>-->
      <!--            Impressum-->
      <!--          </b-col>-->
      <!--        </b-row>-->
      <!--      </template>-->

      <div class="sidebarHead">
        <b-icon-x v-b-toggle:sidebar class="h4 float-left mt-2 ml-2 clickable"/>
        <div v-if="mainData">
          <h4 class="mb-1">{{ mainData.title }}</h4>
          <p class="text-muted mb-0">{{ mainData.description }}</p>
        </div>
      </div>
      <div style="overflow-y: scroll" v-if="mainData">
        <side-bar-service v-for="service in mainData.services" :key="service.name" :service="service"/>

        <side-bar-service :service="{title: mainData['impressum']}"/>
        <side-bar-service :service="{title: mainData['privacy']}"/>
        <side-bar-service :service="{title: mainData['contact']}"/>

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
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
@import "src/styles";

#sidebar {

  .sidebarHead {
    position: sticky;
    top: 0;
    background-color: #f8f9fa;
    border-bottom-style: solid;
    border-color: $primary;
    text-align: right;
    padding: 5px 10px;

  }
}
</style>