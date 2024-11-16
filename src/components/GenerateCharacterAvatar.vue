<template>
  <div id="generate-character-images">
    <div class="items">
      <div v-for="(file, index) in avatarFiles" :key="index"
           class="item">
        <v-btn v-if="!isAnyGenerating"
               class="close-button"
               @click="remove(index)">
          <v-icon icon="mdi-close"/>
        </v-btn>
        <img :src="file.url" alt="character-avatar"/>
      </div>
      <div v-for="num in (imagesLimit - avatarFiles.length)" :key="num"
           class="item">
        <v-icon icon="mdi-image-off-outline"/>
      </div>
    </div>

    <div class="generate">

      <v-btn color="primary"
             @click="generate(CHARACTER_IMAGE_TYPE.routine)"
             :disabled="disabled || isAnyGenerating || isAvatarCountLimitReached"
             :loading="isGenerating[CHARACTER_IMAGE_TYPE.routine]"
             block>GENERATE ROUTINE</v-btn>

      <v-btn color="primary"
             @click="generate(CHARACTER_IMAGE_TYPE.underwear)"
             :disabled="disabled || isAnyGenerating || isAvatarCountLimitReached"
             :loading="isGenerating[CHARACTER_IMAGE_TYPE.underwear]"
             block>GENERATE 16+</v-btn>

      <v-btn color="primary"
             @click="generate(CHARACTER_IMAGE_TYPE.naked)"
             :disabled="disabled || isAnyGenerating || isAvatarCountLimitReached"
             :loading="isGenerating[CHARACTER_IMAGE_TYPE.naked]"
             block>GENERATE 18+</v-btn>

      <message-limit-target :message-type-id="MESSAGE_TYPE.aiImage"/>

    </div>
  </div>
</template>

<script>
import MessageLimitTarget from "@/components/MessageLimitTarget.vue";
import {CHARACTER_IMAGE_TYPE, MESSAGE_TYPE} from "@/util/constants.js";
import {characterAdminApi} from "@/api/characterAdmin.api.js";
import {characterApi} from "@/api/character.api.js";
import {UtFile} from "@/util/UtFile.js";
import {imageApi} from "@/api/image.api.js";
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";
import {useErrorStore} from "@/stores/error.js";
import {UtBreastSize} from "@/util/UtBreastSize.js";
import {UtAgeLook} from "@/util/UtAgeLook.js";
import router from "@/router/index.js";

export default {
  components: {MessageLimitTarget},
  props: {
    form: {type: Object, required: true},
    fieldName: {type: String, required: true},
    disabled: {type: Boolean, default: false}
  },
  data() {
    return {
      getPremiumDialog: useDialogStore().getPremiumDialog,
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      imagesLimit: 4,
      isGenerating: []
    }
  },
  computed: {
    isAdminka() {
      const currentPath = router.currentRoute.value.fullPath;
      return currentPath.startsWith('/adminka')
    },
    MESSAGE_TYPE() {
      return MESSAGE_TYPE
    },
    CHARACTER_IMAGE_TYPE() {
      return CHARACTER_IMAGE_TYPE
    },
    isAnyGenerating() {
      return this.isGenerating.filter(value => value).length > 0
    },
    isAvatarCountLimitReached() {
      return this.avatarFiles.length >= 4
    },
    avatarFiles() {
      return this.form[this.fieldName]
    }
  },
  methods: {
    remove(index) {
      this.avatarFiles.splice(index, 1);
    },
    async generate(characterImageTypeId) {
      if(characterImageTypeId === CHARACTER_IMAGE_TYPE.naked && !this.authStore.isPremium) {
        this.getPremiumDialog.show();
        return;
      }
      this.isGenerating[characterImageTypeId] = true;
      try {
        const params = {
          ...this.form,
          avatarFiles: [],
          characterImageTypeId,
          breastSizeId: UtBreastSize.getBreastSizeByBodyTypeId(this.form.bodyTypeId).id,
          ageLookId: UtAgeLook.getAgeLookIdByAge(this.form.age).id
        };
        const method = this.isAdminka ? imageApi.generateByCharacterFormAdmin : imageApi.generateByCharacterForm
        const response = await method(params);
        this.authStore.increaseUserLastMonthImageMessageCount()
        const file = UtFile.getFileFromBase64(response.content, response.name)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.avatarFiles.push({...response, url: reader.result})
        }
      } catch (error) {
        console.log('error', error)
        await this.errorStore.handleError(error)
      } finally {
        this.isGenerating[characterImageTypeId] = false;
      }
    }
  }
}
</script>

<style lang="scss">
#generate-character-images {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 10px;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #494949;
      height: 350px;
      border-radius: 4px;
      padding: 4px;

      .close-button {
        position: absolute;
        right: -5px;
        top: -5px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        min-width: unset;
        padding: unset;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: inherit;
      }

      .mdi-image-off-outline {
        color: white;
        font-size: 150px;
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