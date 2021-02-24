<template>
  <div>
    <div>
      <h2 class="mt-3">{{service.title}}</h2>
      <p class="text-muted">{{service.description}}</p>
      <div v-if="!DISABLE_FORM_SAVING">
        <b-button @click="loadForm">Gespeichertes Formular laden</b-button>
        <b-collapse v-model="upload">
          <b-file @input="loadForm" class="m-2" style="max-width: 100%" v-model="uploadFile" accept=".efa" placeholder="Keine Datei ausgewählt" browse-text="Durchsuchen" drop-placeholder="Datei ablegen"></b-file>
        </b-collapse>
        <p class="text-danger" v-if="wrong">Diese Datei ist für einen anderen Fragebogen</p>
      </div>
      <hr>
    </div>
    <json-form v-if="form" :json="form" :ui="service.ui" :onSubmit="onSubmit">
      <div style="width: 100%; display: flex; justify-content: center">
        <ActionButtonGroup :save-button="!DISABLE_FORM_SAVING" :doing="doing"
                      :selected="selected" :service="service"/>
      </div>
    </json-form>
  </div>
</template>

<script>
import jsonForm from "@educorvi/vue-json-form"
import serviceMixin from "@/components/Services/serviceMixin";
import axios from "axios";
import {fileOptions, normURLS} from "@/utilities/globals.mjs";
import {API_ROOT_URL, DISABLE_FORM_SAVING, INSTANCE_ID} from "../../../config";
import {saveAs} from "file-saver";
import {mapGetters} from "vuex";
import ActionButtonGroup from "@/components/Services/ActionButtonGroup";

export default {
  name: "Form",
  data() {
    return {
      indexOfAction: 0,
      doing: [],
      form: null,
      wrong: false,
      upload: false,
      uploadFile: null
    }
  },
  mixins: [serviceMixin],
  components: {ActionButtonGroup, jsonForm},
  created() {
    if (!this.load) {
      this.form = this.service.form;
    } else {
      this.fill(this.load);
    }
  },
  computed: {
    ...mapGetters(["load"]),
    DISABLE_FORM_SAVING() {
      return DISABLE_FORM_SAVING;
    }
  },
  methods: {
    selected(index) {
      this.indexOfAction = index;
      if (this.service["formactions"][this.indexOfAction].method === "REDIRECT") {
        this.$router.push("/services/"+this.service["formactions"][this.indexOfAction].name);
      }
    },
    fill(data) {
      if (data.name !== this.service.name) {
        this.wrong = true;
        return;
      } else {
        this.wrong = false;
      }
      this.form = null;
      this.$nextTick().then(() => {
        let form = JSON.parse(JSON.stringify(this.service.form));
        const d = data.data;
        for (const key of Object.keys(d)) {
          const split = key.split("/");
          const k = split[split.length - 1];

          form.properties[k].default = d[key];
        }

        this.$store.commit("load", null);
        this.form = form;
      });
    },
    loadForm(file) {
      if (file instanceof File) {
        this.upload = false;
        file.text().then(contents => this.fill(JSON.parse(contents)));
        return;
      }
      async function load() {
        const fileHandle = await window.showOpenFilePicker(fileOptions);
        const file = await fileHandle[0].getFile();
        const contents = await file.text();
        this.fill(JSON.parse(contents));
      }

      if (window.showOpenFilePicker !== undefined) {
        load.call(this);
      } else {
        this.upload = true;
      }

    },
    onSubmit(data) {
      const toSave = {data, name: this.service.name}

      async function save() {
        const handle = await window.showSaveFilePicker(fileOptions);
        const writable = await handle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(JSON.stringify(toSave));
        // Close the file and write the contents to disk.
        await writable.close();
      }

      if (this.indexOfAction === 'save') {
        if (window.showSaveFilePicker !== undefined) {
          save();
        } else {
          saveAs(new Blob([JSON.stringify(toSave)], {type: "application/efa"}), this.service.title.replace(/ /g, "_") + ".efa");
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


  }
  ,
}
</script>

