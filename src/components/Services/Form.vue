<template>
  <json-form :json="service.form" :ui="service.ui" :onSubmit="onSubmit">
    <div style="width: 100%; display: flex; justify-content: center">
      <b-button-group class="w-100">
        <b-button type="submit" v-for="(action, index) in service['formactions']" :key="action.name"
                  :disabled="doing[index]"
                  @click="selected(index)" :variant="action['cssclass']">
          <b-spinner class="m-0" style="width: 1.25rem; height: 1.25rem" v-if="doing[index]"/>
          <span v-else>{{ action.title }}</span></b-button>
        <b-button variant="primary" type="submit" @click="selected('save')">Speichern</b-button>
      </b-button-group>
    </div>
  </json-form>
</template>

<script>
import jsonForm from "@educorvi/vue-json-form"
import serviceMixin from "@/components/Services/serviceMixin";
import axios from "axios";
import {normURLS} from "@/utilities/globals.mjs";
import {API_ROOT_URL, INSTANCE_ID} from "../../../config";
import {saveAs} from "file-saver";
import {fileOptions} from "@/utilities/globals.mjs";

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
      async function save() {
        const handle = await window.showSaveFilePicker(fileOptions);
        const writable = await handle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(JSON.stringify(data));
        // Close the file and write the contents to disk.
        await writable.close();
      }
      if (this.indexOfAction === 'save') {
        if (window.showSaveFilePicker !== undefined) {
          save();
        } else {
          saveAs(new Blob([JSON.stringify(data)], {type: "application/efa"}), this.service.title.replace(/ /g, "_")+".efa");
        }

      } else {
        this.$set(this.doing, this.indexOfAction, true);
        axios({
          method: this.service["formactions"][this.indexOfAction].method.toLowerCase(),
          url: normURLS(API_ROOT_URL) + '/' + INSTANCE_ID + "/" + this.service.name + "/" + this.service["formactions"][this.indexOfAction].name,
          data: {
            form: data
          }
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
    }


  },
}
</script>

<style scoped>

</style>
