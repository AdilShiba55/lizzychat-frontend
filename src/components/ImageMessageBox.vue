<template>
  <div class="image-message-box"
       :class="{'blured':isBlured}">
    <v-skeleton-loader v-if="!isImageLoaded" width="305" height="380"/>
    <div v-show="isImageLoaded" class="image-container" @click="clicked">
      <v-icon v-if="isBlured" icon="mdi-lock"/>
      <img :src="imageUrl"
           alt="character image"
           @load="isImageLoaded = true"/>
    </div>
    <div class="date">{{dtCreate}}</div>
  </div>
</template>

<script>
import {CHARACTER_IMAGE_TYPE, MESSAGE_TYPE} from "@/util/constants.js";
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";

export default {
  props: {
    message: {type: Object, required: true}
  },
  data() {
    return {
      authStore: useAuthStore(),
      getPremiumDialog: useDialogStore().getPremiumDialog,
      isImageLoaded: false
    }
  },
  computed: {
    isBlured() {
      return !this.message.imageUrl && this.message.imageBluredUrl;
    },
    imageUrl() {
      return this.isBlured ? this.message.imageBluredUrl : this.message.imageUrl;
    },
    MESSAGE_TYPE() {
      return MESSAGE_TYPE
    },
    dtCreate() {
      const date = new Date(this.message.dtCreate);
      const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      return this.isToday ? time : date.toLocaleDateString()
    },
    isToday() {
      const now = new Date()
      const date = new Date(this.message.dtCreate)
      return date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear();
    }
  },
  methods: {
    clicked() {
      if(this.isBlured) {
        this.getPremiumDialog.show()
      }
    }
  }
}
</script>

<style lang="scss">
.image-message-box.blured {
  .image-container {
    cursor: pointer;
  }
}
.image-message-box {
  display: flex;
  flex-direction: column;
  justify-content: left;
  position: relative;

  .image-container {
    position: relative;
    width: fit-content;
    .mdi-lock {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 200px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  img {
    width: fit-content;
    min-width: 305px;
    height: 380px;
    border-radius: 4px;
    border: 3px #561772 solid;
  }
  .date {
    color: gray;
    font-size: 12px;
  }
}
</style>