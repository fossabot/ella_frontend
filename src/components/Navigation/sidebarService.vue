<template>
  <div style="padding: 5px 0">
    <div class="cust">
      <div class="w-100 clickable" @click="action">
        <h6>{{ service.title }}</h6>
        <p class="text-muted" v-if="service.description">{{ service.description }}</p>
      </div>
      <b-collapse v-model="cVisible" v-if="service.type === 'group'">
        <b-card>
<!--          TODO: Subservices vollwertig mit einbinden-->
          <side-bar-service v-for="(subService, index) in service.services.map(obj=>{return {title: obj, name: obj}})"
                            :key="subService.title" :service="subService"
                            :no-divider="index === service.services.length-1"></side-bar-service>
        </b-card>
      </b-collapse>
    </div>
    <hr class="mb-1" v-if="!noDivider">
  </div>
</template>

<script>
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

<style scoped>
.cust {
  text-align: right;
  padding: 0 10px;
}
</style>