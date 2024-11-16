<template>
  <div id="choose-location">
    <v-select
        v-model="form[fieldName]"
        label="Image Location"
        :items="items"
        item-title="name"
        item-value="id"
        variant="outlined"
        :disabled="disabled"/>
  </div>
</template>

<script>
import {dictApi} from "@/api/dict.api.js";

export default {
  props: {
    form: {type: Object, required: true},
    fieldName: {type: String, default: 'locationId'},
    disabled: {type: Boolean, default: false}
  },
  data() {
    return {
      items: []
    }
  },
  async mounted() {
    const dicts = await dictApi.findNotArchived(['location'])
    this.items = dicts.location;
    this.items.push({
      id: null,
      name: 'None'
    })
  }
}
</script>

<style lang="scss">
#choose-location {
  display: flex;
  justify-content: center;

  .v-input {
    max-width: 500px;

    .v-field {
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>