<template>
  <div class="message-limit" :style="!authStore.isPremium ? 'cursor: pointer' : ''"
       @click="messageLimitClicked">
          <span>
            <span :class="{'message-limit-danger':isMessageLimitDanger}" style="font-weight: bold">{{currentMessageCount}}</span>
            <span style="font-weight: bold"> / {{currentLimit}}</span>
          </span>
    <v-icon :icon="responseTypeIcon"/>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";
import {MESSAGE_TYPE} from "@/util/constants.js";
import {UtMessage} from "@/util/UtMessage.js";

export default {
  props: {
    messageTypeId: {type: Number, required: true}
  },
  data() {
    return {
      authStore: useAuthStore(),
      getPremiumDialog: useDialogStore().getPremiumDialog,
    }
  },
  computed: {
    currentMessageCount() {
      return this.authStore.getUserInfo[UtMessage.getMessageCountFieldName(this.messageTypeId)]
    },
    currentLimit() {
      return this.authStore.getUserInfo[UtMessage.getLimitFieldName(this.messageTypeId)]
    },
    isMessageLimitDanger() {
      const difference = this.currentLimit - this.currentMessageCount;
      return this.currentMessageCount >= this.currentLimit || difference < 3;
    },
    isMessageLimitReached() {
      return this.currentMessageCount >= this.currentLimit
    },
    responseTypeIcon() {
      if(this.messageTypeId === MESSAGE_TYPE.aiImage) return 'mdi-camera'
      else return 'mdi-email-newsletter'
    }
  },
  methods: {
    messageLimitClicked() {
      if(!this.authStore.isPremium) {
        this.getPremiumDialog.show()
      }
    }
  }
}
</script>

<style lang="scss">
.message-limit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  background-color: #74527a;
  padding: 3px 5px 3px 10px;
  border-radius: 4px;

  &-danger {
    color: #e30000;
  }

  .mdi {
    margin-top: 3px;
  }
}
</style>