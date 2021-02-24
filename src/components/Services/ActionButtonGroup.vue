<template>
  <div>
    <b-button-group :vertical="stacked" class="w-100">
      <b-button v-for="(action, index) in service['formactions']" :key="action.name" :disabled="doing[index]"
                :variant="action['cssclass']"
                type="submit" @click="selected(index)">
        <b-spinner v-if="doing[index]" class="m-0" style="width: 1.25rem; height: 1.25rem"/>
        <span v-else>{{ action.title }}</span></b-button>
      <b-button v-if="saveButton" type="submit" variant="primary" @click="selected('save')">Speichern</b-button>
    </b-button-group>

    <b-modal v-for="(action) in service['formactions']" :id="'modal_'+action.name" :key="'modal_'+action.name"
             hide-footer title="Bitte zusätzliche Informationen angeben">
      <json-form :json="action.additional" :onSubmit="submitModal">
        <hr>
        <b-button-group class="w-100">
          <b-button @click="$bvModal.hide('modal_'+action.name)">Abbrechen</b-button>
          <b-button type="submit" variant="primary">Bestätigen</b-button>
        </b-button-group>
      </json-form>
    </b-modal>
  </div>
</template>
<script>
import jsonForm from "@educorvi/vue-json-form"

export default {
  name: 'ActionButtonGroup',
  components: {jsonForm},
  props: {
    service: {
      type: Object
    },
    saveButton: {
      type: Boolean
    },
    save: {
      type: Function
    },
    doing: {
      type: Array
    },
    selected: {
      type: Function
    },
    stacked: {
      type: Boolean
    }
  },
  methods: {
    submitModal(data) {
      this.$emit("submitModal", data);
      for (const action of this.service['formactions']) {
        this.$bvModal.hide('modal_' + action.name)
      }
    }
  },
}
</script>
