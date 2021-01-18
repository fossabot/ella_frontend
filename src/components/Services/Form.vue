<template>
  <json-form :json="service.form" :ui="service.ui" :onSubmit="onSubmit">
    <div style="width: 100%; display: flex; justify-content: center">
      <b-button-group class="w-100">
        <b-button type="submit" v-for="(action, index) in service['formactions']" :key="action.name"
                  :disabled="doing[index]"
                  @click="selected(index)" :variant="action['cssclass']">
          <b-spinner class="m-0" style="width: 1.25rem; height: 1.25rem" v-if="doing[index]"/>
          <span v-else>{{ action.title }}</span></b-button>
      </b-button-group>
    </div>
  </json-form>
</template>

<script>
import jsonForm from "@educorvi/vue-json-form"
import serviceMixin from "@/components/Services/serviceMixin";
import axios from "axios";
import {normURLS} from "@/utilities/globals.mjs";

export default {
  name: "Form",
  data() {
    return {
      indexOfAction: 0,
      doing: []
    }
  },
  mixins: [serviceMixin],
  components: {jsonForm},
  methods: {
    selected(index) {
      this.indexOfAction = index;
    },
    onSubmit(data) {
      this.$set(this.doing, this.indexOfAction, true);
      console.log(data);
      axios({
        method: this.service["formactions"][this.indexOfAction].method.toLowerCase(),
        url: normURLS(process.env.VUE_APP_API_ROOT_URL) + '/' + process.env.VUE_APP_INSTANCE_ID + "/" + this.service.name + "/" + this.service["formactions"][this.indexOfAction].name,
        data: data
      }).then(res => {
        console.log(res);
      }).catch(err => {
        this.$bvToast.toast("Es gab einen Fehler beim Ausführen dieser Aktion! Bitte versuchen Sie es später erneut.", {
          title: "Fehler",
          variant: "danger"
        });
        console.error(err);
      }).finally(() => this.$set(this.doing, this.indexOfAction, false));
    }


  },
}
</script>

<style scoped>

</style>
