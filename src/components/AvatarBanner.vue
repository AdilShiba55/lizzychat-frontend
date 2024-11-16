<template>
  <div id="avatar-banner">
    <v-avatar size="140">
      <v-skeleton-loader v-if="!showAvatar" height="100%" width="100%" loading/>
      <img
          v-show="showAvatar && form[urlFieldName]"
          :src="form[urlFieldName]"
          alt="user avatar"
          @load="isImageLoaded = true"/>
      <div v-if="showAvatar && !form[urlFieldName]" class="default">{{firstUsernameLetter}}</div>
      <v-file-input
          v-model="form[filesFieldName]"
          @change="$emit('uploaded')"
          accept="image/png, image/jpeg, image/webp"
          prepend-icon="mdi-camera"/>
    </v-avatar>
  </div>
</template>

<script>
export default {
  props: {
    form: {type: Object, required: true},
    urlFieldName: {type: String, default: 'avatarUrl'},
    filesFieldName: {type: String, default: 'files'},
    isLoading: {type: Boolean, default: false}
  },
  data() {
    return {
      isImageLoaded: false
    }
  },
  computed: {
    showAvatar() {
      return !this.isLoading && (this.isImageLoaded || !this.form[this.urlFieldName])
    },
    firstUsernameLetter() {
      return this.form.username?.charAt(0).toUpperCase()
    }
  }
}
</script>

<style lang="scss">
#avatar-banner {
  display: flex;
  justify-content: center;
  position: relative;
  height: 100px;
  //background: linear-gradient(90deg, #812c78, #1f1f1f 45%);
  background: linear-gradient(90deg, #644ce3, #ec61a1 72%);

  .v-skeleton-loader {
    background-color: #242424;
  }

  .v-avatar:hover {
    .v-input {
      display: block;
    }
  }

  .v-avatar {
    border: 8px #ec61a1 solid;
    position: absolute;
    background-color: $main-black;
    bottom: -65%;

    img {
      width: 140px;
    }

    .default {
      color: #ec61a1;
      font-size: 140px;
    }

    .v-input {
      display: none;
      position: absolute;

      .v-input__control, .v-input__details {
        display: none;
      }

      .v-input__prepend {
        color: white;
        font-size: 70px;
        margin-inline-end: unset;

        .mdi-camera {
          opacity: unset;
          //background-color: #131313;
        }
      }
    }
  }
}
</style>