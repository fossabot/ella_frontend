<template>
  <div>
    <div>
      <h2 class="mt-3">{{ service.title }}</h2>
      <p class="text-muted">{{ service.description }}</p>
      <div v-if="!DISABLE_FORM_SAVING">
        <b-button @click="loadForm">Gespeichertes Formular laden</b-button>
        <b-collapse v-model="upload">
          <b-file v-model="uploadFile" accept=".efa" browse-text="Durchsuchen" class="m-2"
                  drop-placeholder="Datei ablegen"
                  placeholder="Keine Datei ausgewählt" style="max-width: 100%"
                  @input="loadForm"></b-file>
        </b-collapse>
        <p v-if="wrong" class="text-danger">Diese Datei ist für einen anderen Fragebogen</p>
      </div>
      <hr>
    </div>
    <json-form v-if="form" :json="form" :onSubmit="onSubmit" :ui="service.ui">
      <div style="width: 100%; display: flex; justify-content: center">
        <ActionButtonGroup :doing="doing" :save-button="!DISABLE_FORM_SAVING"
                           :selected="selected" :service="service"
                           @submitModal="submitModal"/>
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
      uploadFile: null,
      filledFormData: null
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
        this.$router.push("/services/" + this.service["formactions"][this.indexOfAction].name);
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

    //funktion zum senden der daten
    sendData(data, additional) {


      function downloadBase64File(contentType, base64Data, fileName) {
        const linkSource = `data:${contentType};base64,${base64Data}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }


      this.$set(this.doing, this.indexOfAction, true)
      axios({
        method: this.service["formactions"][this.indexOfAction].method.toLowerCase(),
        url: normURLS(API_ROOT_URL) + '/' + INSTANCE_ID + "/" + this.service.name + "/" + this.service["formactions"][this.indexOfAction].name,
        data: {
          form: data,
          additional
        }
      }).then(res => {
        // Antwort bearbeiten
        switch (res.data.type) {
          case 'email':
            window.location.href = `mailto:?subject=Fragebogen%20teilen&body=${res.data.content}`;
            break;
          case 'link':
            window.location.href = res.data.content;
            break;

          case 'file':
            downloadBase64File(res.data.mimeType, res.data.content, res.data.fileName);
            break;
        }
      }).catch(err => {
        this.$bvToast.toast("Es gab einen Fehler beim Ausführen dieser Aktion! Bitte versuchen Sie es später erneut.", {
          title: "Fehler",
          variant: "danger"
        });
        console.error(err);
      }).finally(() => this.$set(this.doing, this.indexOfAction, false));
    },
    submitModal(modalData) {
      this.sendData(this.filledFormData, modalData);
    },
    onSubmit(data) {
      const toSave = {data, name: this.service.name}
      this.filledFormData = data;

      //Funktion zum Speichern mit Filepicker
      async function save() {
        const handle = await window.showSaveFilePicker(fileOptions);
        const writable = await handle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(JSON.stringify(toSave));
        // Close the file and write the contents to disk.
        await writable.close();
      }

      // Speichern
      if (this.indexOfAction === 'save') {
        if (window.showSaveFilePicker !== undefined) {
          save();
        } else {
          saveAs(new Blob([JSON.stringify(toSave)], {type: "application/efa"}), this.service.title.replace(/ /g, "_") + ".efa");
        }

      } else {
        //Button action
        if (this.service["formactions"][this.indexOfAction].additional) {
          this.$root.$bvModal.show('modal_' + this.service["formactions"][this.indexOfAction].name);
        } else {
          this.sendData(data);
        }
      }
    }


  }
  ,
}
</script>

