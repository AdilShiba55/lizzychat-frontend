<template>
  <div id="google-button">
    <v-btn class="text-none"
           variant="outlined"
           :disabled="disabled"
           :loading="isLoading"
           rounded
           block>
      <img class="google-img" src="/google_64x64.png" alt="google-icon"/>
      <span class="text">Sign in with Google</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {type: Boolean, default: false},
    isLoading: {type: Boolean, default: false}
  }
}
</script>

<style lang="scss">
#google-button {
  .v-btn {
    width: 220px;
    min-width: unset;
    .google-img {
      margin-right: 10px;
      width: 20px;
    }
    .text {
      font-weight: bold;
    }
  }
}
</style>