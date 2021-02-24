<template>
  <b-button-group :vertical="stacked" class="w-100">
    <b-button v-for="(action, index) in service['formactions']" :key="action.name" :disabled="doing[index]"
              :variant="action['cssclass']"
              type="submit" @click="selected(index)">
      <b-spinner v-if="doing[index]" class="m-0" style="width: 1.25rem; height: 1.25rem"/>
      <span v-else>{{ action.title }}</span></b-button>
    <b-button v-if="saveButton" type="submit" variant="primary" @click="selected('save')">Speichern</b-button>
  </b-button-group>
</template>
<script>
export default {
  name: 'ActionButtonGroup',
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
  }
}
</script>
