<template>
  <v-text-field class="my-text-field" density="comfortable"
                v-model="form[fieldName]"
                :label="label"
                variant="outlined"
                color="white"
                base-color="white"
                :prepend-inner-icon="innerPrependIcon"
                :readonly="readOnly"
                :disabled="disabled"
                :type="type"
                :hide-details="hideDetails"
                :rules="rule"
                @update:focused="$emit('focus', $event)"/>
</template>

<script>
import {UtError} from "@/util/UtError.js";
import {UtRouter} from "@/util/UtRouter.js";

export default {
  props: {
    label: {type: String, required: true},
    fieldName: {type: String, required: true},
    form: {type: Object, required: true},
    type: {type: String, default: 'text'},
    innerPrependIcon: {type: String},
    readOnly: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    errors: {type: Array, default: () => []},
    hideDetails: {type: Boolean, default: false}
  },
  computed: {
    rule() {
      return UtError.getRule(this.fieldName, this.errors)
    }
  }
}
</script>

<style lang="scss">
.my-text-field {
  .v-field__input {
    color: white;
  }
}
</style>