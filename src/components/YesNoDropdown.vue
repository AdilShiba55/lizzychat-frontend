<template>
  <v-select
      v-model="form[fieldName]"
      :label="label"
      :items="options"
      item-title="name"
      item-value="value"
      variant="outlined"
      :disabled="disabled"/>
</template>

<script>
export default {
  props: {
    form: {type: Object, required: true},
    label: {type: String, required: true},
    fieldName: {type: String, required: true},
    disabled: {type: Boolean, default: false},
    withNeverMind: {type: Boolean, default: false},
  },
  computed: {
    options() {
      const array = [
        {
          name: 'Yes',
          value: true
        },
        {
          name: 'No',
          value: false
        }
      ]
      if(this.withNeverMind) {
        array.push({
          name: 'Never mind',
          value: null
        })
      }
      return array;
    }
  }
}
</script>