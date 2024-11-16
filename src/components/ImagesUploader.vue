<template>
  <div id="images-uploader">
    <div class="images">
      <v-file-input
          v-for="(object, index) in form[fieldName]" :key="index"
          v-model="object.file"
          variant="outlined"
          accept="image/png, image/jpeg, image/webp"
          prepend-icon="mdi-camera"
          @change="upload(object)"
          :disabled="isLoading || isAnyGenerating"
          @click:clear="clear(index)">
        <template v-slot:selection="{ fileNames }">
          <img :src="object.url" alt=""/>
        </template>
      </v-file-input>
    </div>

    <div class="add-image-button">
      <v-icon icon="mdi-plus-circle"/>
      <v-file-input
          v-model="dummyObject.file"
          variant="outlined"
          accept="image/png, image/jpeg, image/webp"
          prepend-icon="mdi-camera"
          :disabled="isLoading || isAnyGenerating || isAvatarCountLimitReached"
          @change="uploadDummy"/>
    </div>

    <div class="generate">

      <v-btn color="primary"
             @click="generate(CHARACTER_IMAGE_TYPE.routine)"
             :disabled="isLoading || isAnyGenerating || isAvatarCountLimitReached"
             :loading="isGenerating[CHARACTER_IMAGE_TYPE.routine]"
             block>GENERATE ROUTINE</v-btn>

      <v-btn color="primary"
             @click="generate(CHARACTER_IMAGE_TYPE.underwear)"
             :disabled="isLoading || isAnyGenerating || isAvatarCountLimitReached"
             :loading="isGenerating[CHARACTER_IMAGE_TYPE.underwear]"
             block>GENERATE 16+</v-btn>

      <v-btn color="primary"
             @click="checkPremiumAndGenerate(CHARACTER_IMAGE_TYPE.naked)"
             :disabled="isLoading || isAnyGenerating || isAvatarCountLimitReached"
             :loading="isGenerating[CHARACTER_IMAGE_TYPE.naked]"
             block>GENERATE 18+</v-btn>

      <message-limit-target :message-type-id="MESSAGE_TYPE.aiImage"/>

    </div>
  </div>
</template>

<script>
import {UtFile} from "@/util/UtFile.js";
import {characterAdminApi} from "@/api/characterAdmin.api.js";
import {CHARACTER_IMAGE_TYPE, MESSAGE_TYPE} from "@/util/constants.js";
import {characterApi} from "@/api/character.api.js";
import MessageLimitTarget from "@/components/MessageLimitTarget.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {MessageLimitTarget},
  props: {
    form: {type: Object, required: true},
    fieldName: {type: String, required: true},
    isLoading: {type: Boolean, default: false},
    isAdmin: {type: Boolean, required: true}
  },
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      getPremiumDialog: useDialogStore().getPremiumDialog,
      dummyObject: {file: [], url: null},
      isGenerating: []
    }
  },
  computed: {
    MESSAGE_TYPE() {
      return MESSAGE_TYPE
    },
    isAvatarCountLimitReached() {
      return !this.isAdmin && this.form[this.fieldName].length >= 4
    },
    CHARACTER_IMAGE_TYPE() {
      return CHARACTER_IMAGE_TYPE
    },
    isAnyGenerating() {
      return this.isGenerating.filter(value => value).length > 0
    }
  },
  methods: {
    clear(index) {
      this.form[this.fieldName].splice(index, 1)
    },
    upload(object) {
      const reader = new FileReader();
      reader.readAsDataURL(object.file[0])
      reader.onload = () => {
        object.url = reader.result;
      }
    },
    uploadDummy() {
      const file = this.dummyObject.file[0];
      console.log('file', file)
      const reader = new FileReader();
      reader.readAsDataURL(this.dummyObject.file[0])
      reader.onload = () => {
        this.form[this.fieldName].push({file: [file], url: reader.result})
        this.dummyObject = {file: [], url: null}
      }
    },
    checkPremiumAndGenerate(characterImageTypeId) {
      if(!this.isAdmin && !this.authStore.isPremium) {
        this.getPremiumDialog.show();
      } else {
        this.generate(characterImageTypeId)
      }
    },
    async generate(characterImageTypeId) {
      this.isGenerating[characterImageTypeId] = true;
      try {
        const method = this.isAdmin ? characterAdminApi.generateImageByPrompt : characterApi.generateImageByPrompt
        const response = await method({...this.form, avatarObjects: null, avatarFiles: null, characterImageTypeId});
        this.authStore.increaseUserLastMonthImageMessageCount()
        const file = UtFile.getFileFromBase64(response.content, response.name)
        console.log('file', file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.form[this.fieldName].push({file: [file], url: reader.result})
        }
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isGenerating[characterImageTypeId] = false;
      }
    }
  }
}
</script>

<style lang="scss">
#images-uploader {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 10px;
  }

  .add-image-button {
    position: relative;

    .mdi-plus-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 40px;
      color: rgb(86 255 0);
      transform: translate(-50%, -50%);
    }
  }

  .v-input {
    height: fit-content;
    &__details {
      display: none;
    }
    &__prepend {
      display: none;
    }
    &__control {

      .v-field {
        padding: unset;

        &__clearable {
          position: absolute;
          top: 4px;
          right: 0;
          z-index: 10;

          .mdi-close-circle {
            font-size: 40px;
          }
        }

        &__input {
          padding: 4px;
          img {
            width: 100%;
          }
        }
      }
    }
  }

  .generate {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 3px;
  }
}
</style>