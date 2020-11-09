<template>
  <div>
    <div class="cust" v-bind:class="{active: isActive}" style="padding: 5px 12px">
      <div class="w-100 clickable" v-bind:class="{blend: isActive&&!isLightColor}" @click="action">
        <h6>{{ service.title }}</h6>
        <p class="text-muted" v-if="service.description">{{ service.description }}</p>
      </div>
      <b-collapse v-model="cVisible" v-if="service.type === 'group'">
        <b-card no-body class="mr-2 ml-2">
<!--          TODO: Subservices vollwertig mit einbinden-->
          <side-bar-service v-for="(subService, index) in service.services.map(obj=>{return {title: obj, name: obj}})"
                            :key="subService.title" :service="subService"
                            :no-divider="index === service.services.length-1"></side-bar-service>
        </b-card>
      </b-collapse>
    </div>
    <hr class="m-0" v-if="!noDivider">
  </div>
</template>

<script>
import {isLightColor} from "@/utilities/globals";

export default {
  name: "sideBarService",
  props: {
    service: {
      type: Object,
      required: true
    },
    //If set true, Divider won't be shown
    noDivider: {
      type: Boolean
    }
  },
  data() {
    return {
      cVisible: false
    }
  },
  computed: {
    isActive() {
      return this.$route.name === 'Service' && this.$route.params.service === this.service.name
    },
    isLightColor() {
      return isLightColor(process.env.VUE_APP_THEME_COLOR);
    }
  },
  methods: {
    action() {
      if (this.service.type === 'group') {
        this.cVisible = !this.cVisible;
      } else {
        this.$router.push('/services/' +this.service.name);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "src/styles";
.cust {
  text-align: right;
  padding: 0 10px;
}

.active {
  background-color: $primary;
}
.blend {
  color: white;
  .text-muted {
    color: white !important;
  }
}
</style>