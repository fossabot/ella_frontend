<template>
  <div>
    <b-sidebar
        id="sidebar"
        v-model="sidebar"
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

      <div v-if="mainData && !mainData.error">
        <div class="sidebarHead">
          <b-icon-x @click="sidebar=false" class="h4 float-left mt-2 ml-2 clickable"/>
          <div v-if="mainData">
            <h4 class="mb-1">{{ mainData.title }}</h4>
            <p class="text-muted mb-0">{{ mainData.description }}</p>
          </div>
        </div>


        <side-bar-service v-for="service in mainData.services" :key="service.name" :service="service"/>

      </div>
      <p class="text-muted p-5" v-else>Verbindung fehlgeschlagen</p>
    </b-sidebar>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import SideBarService from "@/components/Navigation/sidebarService";

export default {
  name: "Sidebar",
  components: {SideBarService},
  computed: {
    ...mapGetters(["mainData"]),
    sidebar: {
      get() {
        return this.$store.state.sidebar;
      },
      set(value) {
        this.$store.commit("sidebar", value);
      }
    }
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
@import "../../styles";

#sidebar {

  .sidebarHead {
    position: sticky;
    top: 0;
    //background-color: #f8f9fa;
    border-bottom-style: solid;
    border-color: $primary;
    text-align: right;
    padding: 5px 10px;

  }
}
</style>
