<template>
  <div id="progress-circular" :style="`height: ${height}`">
    <v-progress-circular
        :size="size"
        color="primary"
        indeterminate/>
  </div>
</template>

<script>
export default {
  props: {
    height: {type: String, default: '300px'},
    size: {type: Number, default: 100}
  }
}
</script>

<style lang="scss">
#progress-circular {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

