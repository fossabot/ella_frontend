<template>
  <div>
    <b-sidebar
        id="sidebar"
        v-model="sidebar"
        backdrop
        shadow="true"
        right
        no-header>

      <div v-if="mainData && !mainData.error">
        <div class="sidebarHead">
          <div style="display: flex; align-items: start; justify-content: space-between; width: 100%">
            <div>
              <h6 v-if="SIDEBAR_TITLE" style="font-weight: bold" class="mb-0">{{SIDEBAR_TITLE}}</h6>
              <div v-else-if="mainData">
                <h4 class="mb-1">{{ mainData.title }}</h4>
                <p class="text-muted mb-0">{{ mainData.description }}</p>
              </div>
            </div>
            <b-icon-x @click="sidebar=false" class="h4 clickable"/>
          </div>
        </div>

        <div class="pt-2">
          <side-bar-service v-for="(service, index) in mainData.services" :key="service.name" :service="service"
                            :no-divider="index === mainData.services.length-1"/>
        </div>

      </div>
      <div class="w-100 mt-4 text-center" v-else>
        <b-spinner/>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import SideBarService from "./sidebarService.vue";
import {SIDEBAR_TITLE} from "../../../config"

/**
 * @module Sidebar
 * @category Components
 * @subcategory Navigation
 * @description The Sidebar of the ella-app
 */
export default {
  name: "SidebarComponent",
  components: {SideBarService},
  computed: {
    ...mapGetters(["mainData"]),
    //map store sidebar state
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
    return {
      SIDEBAR_TITLE
    }
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
    text-align: left;
    padding: 5px 10px;
    background-color: white;
    z-index: 10000;
    hyphens: auto;
    width: 100%;
  }
}
</style>
