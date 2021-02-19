<template>
  <b-button-group class="w-100">
    <b-button type="submit" v-for="(action, index) in service['formactions']" :key="action.name"
              :disabled="doing[index]"
              @click="selected(index)" :variant="action['cssclass']">
      <b-spinner class="m-0" style="width: 1.25rem; height: 1.25rem" v-if="doing[index]"/>
      <span v-else>{{ action.title }}</span></b-button>
    <b-button v-if="saveButton" variant="primary" type="submit" @click="selected">Speichern</b-button>
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
    doing: {
      type: Array
    },
    selected: {
      type: Function
    }
  }
}
</script>
